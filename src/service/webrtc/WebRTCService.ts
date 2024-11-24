import { IUser } from "@/schema/userSchema";
import { SocketEmitterQueue } from "../socketQueue/SocketEmitterQueue";
import { fetchData } from "@/utils/custom/customFetch";
import { serverResWapperSchema } from "@/schema/ServerResWrapperSchema";
import { StunTurnConfigSchema } from "@/schema/stunTurnConfigSchema";

export class WebRTCService {
  private readonly peerConnections: Map<string, RTCPeerConnection> = new Map();
  private readonly socketQueue: SocketEmitterQueue;
  private readonly localUser: IUser;

  constructor(socketQueue: SocketEmitterQueue, user: IUser) {
    this.socketQueue = socketQueue;
    this.localUser = user;
  }

  async createPeerConnection(
    userId: string,
    callId: string,
    onTrackAddedCb: (userId: string, stream: readonly MediaStream[]) => void,
  ): Promise<RTCPeerConnection> {
    const response = await fetchData(
      "/stunturncredentials",
      serverResWapperSchema(StunTurnConfigSchema),
    );
    console.log(response);
    if (!response.success) throw Error("Failed to create peer connection");
    const credentials = response.payload.data;
    const configuration = {
      iceServers: [
        {
          urls: credentials.stunUrl,
        },
        {
          urls: credentials.turnUrl,
          username: credentials.username,
          credential: credentials.credential,
        },
      ],
    };
    const peerConnection = new RTCPeerConnection(configuration);

    peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        this.socketQueue.emit("webrtc-iceCandidate", {
          from: this.localUser._id,
          to: userId,
          callId,
          candidate: event.candidate,
        });
      }
    };

    peerConnection.ontrack = (event) => onTrackAddedCb(userId, event.streams);

    this.peerConnections.set(userId, peerConnection);
    return peerConnection;
  }

  async createOffer(userId: string): Promise<RTCSessionDescriptionInit> {
    const peerConnection = this.peerConnections.get(userId);
    if (!peerConnection) {
      throw new Error("Peer connection not found");
    }
    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);
    return offer;
  }

  async createAnswer(userId: string): Promise<RTCSessionDescriptionInit> {
    const peerConnection = this.peerConnections.get(userId);
    if (!peerConnection) {
      throw new Error("Peer connection not found");
    }
    const answer = await peerConnection.createAnswer();
    await peerConnection.setLocalDescription(answer);
    return answer;
  }

  async setRemoteDescription(
    userId: string,
    description: RTCSessionDescriptionInit,
  ): Promise<void> {
    const peerConnection = this.peerConnections.get(userId);
    if (!peerConnection) {
      throw new Error("Peer connection not found");
    }
    await peerConnection.setRemoteDescription(description);
  }

  async addIceCandidate(
    userId: string,
    candidate: RTCIceCandidateInit,
  ): Promise<void> {
    const peerConnection = this.peerConnections.get(userId);
    if (!peerConnection) {
      throw new Error("Peer connection not found");
    }
    await peerConnection.addIceCandidate(candidate);
  }

  async addTrack(
    userId: string,
    track: MediaStreamTrack,
    stream: MediaStream,
  ): Promise<RTCRtpSender> {
    const peerConnection = this.peerConnections.get(userId);
    if (!peerConnection) {
      throw new Error("Peer connection not found");
    }
    return peerConnection.addTrack(track, stream);
  }

  closeConnection(userId: string): void {
    const peerConnection = this.peerConnections.get(userId);
    if (peerConnection) {
      peerConnection.close();
      this.peerConnections.delete(userId);
    }
  }

  closeAllConnections(): void {
    for (const [userId, peerConnection] of this.peerConnections) {
      peerConnection.close();
    }
    this.peerConnections.clear();
  }
}
