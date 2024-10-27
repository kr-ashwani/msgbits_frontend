import {
  CallType,
  IWebRTCIncomingCall,
  ParticipantsDesc,
} from "./../../schema/WebRTCSchema";
import { SocketManager } from "@/socket/socketManager/SocketManager";
import { IUser } from "@/schema/userSchema";
import { CallingService } from "@/service/webrtc/CallingService";
import { requiresNoCallSession, requiresCallSession } from "./CallDecorators";
import { AppDispatch } from "@/lib/store/store";
import { deviceChecker, DeviceStatus } from "./DeviceChecker";
import { toast } from "sonner";
import { SocketEmitterQueue } from "../socketQueue/SocketEmitterQueue";

export class CallManager {
  private socket: SocketManager;
  private socketQueue: SocketEmitterQueue;
  private callingService: CallingService | null = null;
  private localUser: IUser;
  private dispatch: AppDispatch;

  constructor(
    socket: SocketManager,
    socketQueue: SocketEmitterQueue,
    userId: IUser,
    dispatch: AppDispatch,
  ) {
    this.socketQueue = socketQueue;
    this.socket = socket;
    this.localUser = userId;
    this.dispatch = dispatch;
  }
  getLocalUser() {
    return this.localUser;
  }
  getLocalUserId() {
    return this.localUser._id;
  }
  getCallType() {
    return this.callingService?.getCallType();
  }
  // Protected method for validators to access session
  protected getSession(): CallingService | null {
    return this.callingService;
  }

  @requiresNoCallSession()
  async startCall({
    chatRoomId,
    callType,
  }: {
    callType: CallType;
    chatRoomId: string;
  }) {
    const status = await this.checkDeviceCompatibility(callType);
    if (!status) return;

    this.callingService = new CallingService({
      socketQueue: this.socketQueue,
      socket: this.socket,
      localUser: this.localUser,
      dispatch: this.dispatch,
      callType,
      chatRoomId,
    });

    this.callingService.startCall();
  }

  @requiresNoCallSession()
  async answerCall({
    callId,
    callType,
    chatRoomId,
    userId,
  }: IWebRTCIncomingCall) {
    const status = await this.checkDeviceCompatibility(callType);
    if (!status) return;

    this.callingService = new CallingService({
      socketQueue: this.socketQueue,
      socket: this.socket,
      localUser: this.localUser,
      dispatch: this.dispatch,
      callType,
      chatRoomId,
      callId,
    });

    this.joinCall(userId);
  }

  @requiresCallSession()
  private joinCall(userId: string): void {
    this.callingService?.joinCall(userId);
  }

  @requiresCallSession()
  endCall(): void {
    this.callingService?.endCall();
    this.callingService = null;
  }

  @requiresNoCallSession()
  declineCall(): void {
    this.callingService?.declineCall();
    this.callingService = null;
  }

  @requiresCallSession()
  addUser(): void {}

  @requiresCallSession()
  removeUser(userId: string): void {}

  isInCall(): boolean {
    return this.callingService !== null;
  }

  @requiresCallSession()
  toggleAudio() {
    this.callingService?.toggleAudio();
  }
  @requiresCallSession()
  toggleVideo() {
    this.callingService?.toggleVideo();
  }

  @requiresCallSession()
  getParticipants(): ParticipantsDesc[] {
    const callParticipants = this.callingService?.getParticipants()!;
    return [...callParticipants.values()];
  }

  @requiresCallSession()
  getLocalParticipant(): ParticipantsDesc | undefined {
    const callParticipants = this.callingService?.getParticipants()!;
    return callParticipants.get(this.localUser._id);
  }

  @requiresCallSession()
  getStreamByID(userId: string): MediaStream | null {
    if (userId === this.localUser._id)
      return this.callingService?.getLocalStream()!;
    const rStreams = this.callingService?.getRemoteStreams()!;
    return rStreams.get(userId) ?? null;
  }

  private async checkDeviceCompatibility(callType: CallType) {
    let deviceStatus: DeviceStatus;
    if (callType === "audio")
      deviceStatus = await deviceChecker.checkDeviceAccess("mic");
    else if (callType === "video")
      deviceStatus = await deviceChecker.checkDeviceAccess("micAndCamera");
    else
      deviceStatus = {
        hasCamera: false,
        hasMicrophone: false,
        error: "Device check is uncompatible with call type ",
      };

    if (deviceStatus.error) {
      toast.error(deviceStatus.error);
      return false;
    }
    return true;
  }
}
