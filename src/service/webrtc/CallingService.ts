import { SocketEmitterQueue } from "@/service/socketQueue/SocketEmitterQueue";
import { SocketManager } from "@/socket/socketManager/SocketManager";
import { WebRTCService } from "./WebRTCService";
import { IUser } from "@/schema/userSchema";
import { v4 as uuid } from "uuid";
import {
  CallStatus,
  CallType,
  IWebRTCAnswer,
  IWebRTCEndCall,
  IWebRTCGetActiveParticipants,
  IWebRTCIceCandidate,
  IWebRTCJoinCall,
  IWebRTCMediaStateChange,
  IWebRTCOffer,
  ParticipantsDesc,
} from "@/schema/WebRTCSchema";
import { AppDispatch } from "@/lib/store/store";
import {
  changeCallStatus,
  updateCallUI,
} from "@/lib/store/features/chat/chatRoomDataSlice";
import { handleError } from "./CallDecorators";

interface CallingServiceParams {
  socket: SocketManager;
  localUser: IUser;
  callId?: string;
  chatRoomId: string;
  callType: CallType;
  dispatch: AppDispatch;
  socketQueue: SocketEmitterQueue;
}
export class CallingService {
  private readonly webRTCService: WebRTCService;
  private readonly socket: SocketManager;
  private readonly socketQueue: SocketEmitterQueue;
  private localStream: MediaStream | null = null;
  private readonly remoteStreams: Map<string, MediaStream> = new Map();
  private readonly participants: Map<string, ParticipantsDesc> = new Map();
  private readonly MAX_PARTICIPANTS = 4;
  private readonly localUser: IUser;
  private readonly callId: string;
  private readonly chatRoomId: string;
  private readonly callType: CallType;
  private readonly dispatch: AppDispatch;
  private readonly unsubListeners: {
    event: string;
    eventHandler: (payload: any) => void;
  }[] = [];

  constructor(params: CallingServiceParams) {
    this.webRTCService = new WebRTCService(params.socketQueue);
    this.socketQueue = params.socketQueue;
    this.socket = params.socket;
    this.chatRoomId = params.chatRoomId;
    this.localUser = params.localUser;
    this.callType = params.callType;
    this.callId = params.callId ?? uuid();
    this.dispatch = params.dispatch;
    this.setupSocketListeners();
    this.setInCallStatus();
  }

  private setupSocketListeners(): void {
    this.addToUnsub(
      this.socket.on("webrtc-joinCall", this.handleJoinCall.bind(this)),
    );
    this.addToUnsub(
      this.socket.on("webrtc-endCall", this.handleEndCall.bind(this)),
    );
    this.addToUnsub(
      this.socket.on(
        "webrtc-getActiveParticipants",
        this.handleGetActiveParticipants.bind(this),
      ),
    );
    this.addToUnsub(
      this.socket.on("webrtc-declineCall", this.handleDeclineCall.bind(this)),
    );
    this.addToUnsub(
      this.socket.on("webrtc-offer", this.handleOffer.bind(this)),
    );
    this.addToUnsub(
      this.socket.on("webrtc-answer", this.handleAnswer.bind(this)),
    );
    this.addToUnsub(
      this.socket.on("webrtc-iceCandidate", this.handleIceCandidate.bind(this)),
    );
    //this.socket.on("webrtc-trackAdded", this.handleTrackAdded.bind(this));
    this.addToUnsub(
      this.socket.on(
        "webrtc-mediaStateChange",
        this.handleMediaStateChange.bind(this),
      ),
    );
    this.addToUnsub(
      this.socket.on("webrtc-roomFull", this.handleRoomFull.bind(this)),
    );
  }

  addToUnsub({
    event,
    eventHandler,
  }: {
    event: string;
    eventHandler: (payload: any) => void;
  }) {
    this.unsubListeners.push({ event, eventHandler });
  }
  getCallType() {
    return this.callType;
  }
  getCallId() {
    return this.callId;
  }
  getDispatch() {
    return this.dispatch;
  }

  remoteTrackAddedCb(userId: string, streams: readonly MediaStream[]) {
    this.remoteStreams.set(userId, streams[0]);
    this.updateCallUI();
  }

  @handleError("Failed to initiate call")
  async startCall() {
    if (this.participants.size >= this.MAX_PARTICIPANTS) {
      console.warn("Maximum number of participants reached");
      return false;
    }

    const participantInfo: ParticipantsDesc = {
      userId: this.localUser._id,
      videoEnabled: this.callType === "video",
      audioEnabled: true,
    };
    this.participants.set(this.localUser._id, participantInfo);
    this.updateCallUI();

    await this.initializeLocalStream();

    this.socketQueue.emit("webrtc-startCall", {
      callId: this.callId,
      chatRoomId: this.chatRoomId,
      userId: this.localUser._id,
      callType: this.callType,
    });

    return true;
  }

  @handleError("Failed to join call")
  async joinCall(userId: string) {
    if (this.participants.size >= this.MAX_PARTICIPANTS) {
      console.warn("Maximum number of participants reached");
      return false;
    }

    const participant = {
      userId: this.localUser._id,
      videoEnabled: this.callType === "video",
      audioEnabled: true,
    };
    this.participants.set(this.localUser._id, participant);

    this.updateCallUI();
    await this.initializeLocalStream();

    this.socketQueue.emit("webrtc-getActiveParticipants", {
      callId: this.callId,
      chatRoomId: this.chatRoomId,
      activeParticipants: [],
      userId: this.localUser._id,
    });

    // just create the peerConnectionInstance  and attach our local track
    await this.webRTCService.createPeerConnection(
      userId,
      this.callId,
      this.remoteTrackAddedCb.bind(this),
    );

    if (this.localStream) {
      for (const track of this.localStream.getTracks()) {
        await this.webRTCService.addTrack(userId, track, this.localStream);
      }
    }

    return true;
  }
  @handleError("Failed to handle active call members")
  async handleGetActiveParticipants({
    callId,
    userId,
    activeParticipants,
  }: IWebRTCGetActiveParticipants) {
    const promises = activeParticipants.map(async (memberId) => {
      // this creates peer connections
      await this.handleJoinCall({
        userId: memberId,
        chatRoomId: this.chatRoomId,
        callId: this.callId,
      });
      // this creates offer for each peer connections
      const offer = await this.webRTCService.createOffer(memberId);
      this.socketQueue.emit("webrtc-offer", {
        userId: this.localUser._id,
        callId,
        offer,
      });
    });

    await Promise.all(promises);
  }
  @handleError("Failed to handle join call")
  async handleJoinCall({ userId, chatRoomId }: IWebRTCJoinCall) {
    if (this.participants.size >= this.MAX_PARTICIPANTS) {
      console.warn("Maximum number of participants reached");
      return;
    }

    const participantInfo = {
      userId,
      videoEnabled: this.callType === "video",
      audioEnabled: true,
    };
    this.participants.set(userId, participantInfo);
    this.updateCallUI();

    // just create the peerConnectionInstance  and attach our local track
    await this.webRTCService.createPeerConnection(
      userId,
      this.callId,
      this.remoteTrackAddedCb.bind(this),
    );

    if (this.localStream) {
      for (const track of this.localStream.getTracks()) {
        await this.webRTCService.addTrack(userId, track, this.localStream);
      }
    }
  }

  async handleDeclineCall() {}

  declineCall() {
    this.dispatch(changeCallStatus({ status: "IDLE" }));
  }

  @handleError("Failed to initialize local stream")
  private async initializeLocalStream(): Promise<void> {
    if (this.localStream) return;
    this.localStream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: this.callType === "video",
    });
    this.updateCallUI();
  }

  @handleError("Failed to end call")
  private handleEndCall({ userId }: IWebRTCEndCall): void {
    this.participants.delete(userId);
    this.webRTCService.closeConnection(userId);
    this.remoteStreams.delete(userId);

    this.updateCallUI();
  }

  @handleError("Failed to handle offer")
  private async handleOffer({ userId, offer }: IWebRTCOffer): Promise<void> {
    const rtcOffer = offer as RTCSessionDescription;
    await this.webRTCService.setRemoteDescription(userId, rtcOffer);
    const answer = await this.webRTCService.createAnswer(userId);
    this.socketQueue.emit("webrtc-answer", {
      callId: this.callId,
      userId,
      answer,
    });
  }

  @handleError("Failed to handle answer")
  private async handleAnswer({ userId, answer }: IWebRTCAnswer): Promise<void> {
    const rtcAnswer = answer as RTCSessionDescription;
    await this.webRTCService.setRemoteDescription(userId, rtcAnswer);
  }

  @handleError("Failed to handle ice candidates")
  private async handleIceCandidate({
    userId,
    candidate,
  }: IWebRTCIceCandidate): Promise<void> {
    const rtcCandidate = candidate as RTCIceCandidate;
    await this.webRTCService.addIceCandidate(userId, rtcCandidate);
  }

  @handleError("Failed to handle media state")
  private handleMediaStateChange({
    userId,
    videoEnabled,
    audioEnabled,
  }: IWebRTCMediaStateChange): void {
    const participant = this.participants.get(userId);
    if (participant) {
      participant.videoEnabled = videoEnabled;
      participant.audioEnabled = audioEnabled;
    }

    this.updateCallUI();
  }

  @handleError("Failed to handle room full")
  private handleRoomFull(): void {
    console.warn("The room is full. Cannot join the call.");
    // Implement UI feedback for the user
  }

  @handleError("Failed to toggle video")
  toggleVideo(): void {
    if (this.localStream) {
      const videoTrack = this.localStream.getVideoTracks()[0];
      videoTrack.enabled = !videoTrack.enabled;
      this.participants.get(this.localUser._id)!.videoEnabled =
        videoTrack.enabled;

      const participant = {
        callId: this.callId,
        userId: this.localUser._id,
        videoEnabled: videoTrack.enabled,
        audioEnabled: this.participants.get(this.localUser._id)!.audioEnabled,
      };
      this.socketQueue.emit("webrtc-mediaStateChange", participant);

      this.updateCallUI();
    }
  }

  @handleError("Failed to toggle audio")
  toggleAudio(): void {
    if (this.localStream) {
      const audioTrack = this.localStream.getAudioTracks()[0];
      audioTrack.enabled = !audioTrack.enabled;
      this.participants.get(this.localUser._id)!.audioEnabled =
        audioTrack.enabled;

      const participant = {
        userId: this.localUser._id,
        callId: this.callId,
        videoEnabled: this.participants.get(this.localUser._id)!.videoEnabled,
        audioEnabled: audioTrack.enabled,
      };
      this.socketQueue.emit("webrtc-mediaStateChange", participant);

      this.updateCallUI();
    }
  }

  getLocalStream(): MediaStream | null {
    return this.localStream;
  }

  getRemoteStreams(): Map<string, MediaStream> {
    return this.remoteStreams;
  }

  getParticipants(): Map<string, ParticipantsDesc> {
    return this.participants;
  }

  endCall(): void {
    this.cleanup();
    if (this.chatRoomId)
      this.socketQueue.emit("webrtc-endCall", {
        callId: this.callId,
        chatRoomId: this.chatRoomId,
        userId: this.localUser._id,
      });

    this.dispatch(changeCallStatus({ status: "IDLE" }));
    this.updateCallUI();
  }
  cleanup() {
    this.removeSocketListeners();
    this.webRTCService.closeAllConnections();
    if (this.localStream) {
      this.localStream.getTracks().forEach((track) => track.stop());
      this.localStream = null;
    }
    this.remoteStreams.clear();
    this.participants.clear();
  }

  async setInCallStatus() {
    const callStatus: CallStatus = {
      status: "INCALL",
      info: {
        callId: this.callId,
        userId: this.localUser._id,
        chatRoomId: this.chatRoomId,
        callType: this.callType,
      },
    };
    this.dispatch(changeCallStatus(callStatus));
  }

  updateCallUI() {
    //setting string to unique id will trigger redux state change
    this.dispatch(updateCallUI(`call-${uuid()}`));
  }

  private removeSocketListeners(): void {
    this.unsubListeners.forEach(({ event, eventHandler }) =>
      this.socket.off(event as any, eventHandler as any),
    );
  }
}
