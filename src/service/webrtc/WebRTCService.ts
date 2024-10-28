import { SocketEmitterQueue } from "../socketQueue/SocketEmitterQueue";

type ICEServer = {
  urls: string;
  username?: string;
  credential?: string;
};

export class WebRTCService {
  private readonly peerConnections: Map<string, RTCPeerConnection> = new Map();
  private readonly socketQueue: SocketEmitterQueue;
  private readonly ICE_SERVERS: ICEServer[];

  constructor(socketQueue: SocketEmitterQueue) {
    this.socketQueue = socketQueue;
    this.ICE_SERVERS = [
      { urls: process.env.NEXT_PUBLIC_STUN_URLS ?? "" },
      {
        urls: process.env.NEXT_PUBLIC_TURN_URLS ?? "",
        username: process.env.NEXT_PUBLIC_TURN_USERNAME,
        credential: process.env.NEXT_PUBLIC_TURN_PASSWORD,
      },
    ];
  }

  async createPeerConnection(
    userId: string,
    callId: string,
    onTrackAddedCb: (userId: string, stream: readonly MediaStream[]) => void,
    configuration: RTCConfiguration = { iceServers: this.ICE_SERVERS },
  ): Promise<RTCPeerConnection> {
    const peerConnection = new RTCPeerConnection(configuration);

    peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        this.socketQueue.emit("webrtc-iceCandidate", {
          userId,
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
