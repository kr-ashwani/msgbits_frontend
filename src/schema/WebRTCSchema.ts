import { z } from "zod";

// Base schemas for WebRTC types
const RTCSessionDescriptionInitSchema = z.object({
  type: z.enum(["offer", "answer", "pranswer", "rollback"]),
  sdp: z.string().nullish(),
});

const RTCIceCandidateSchema = z.object({
  candidate: z.string().nullish(),
  sdpMid: z.string().nullish(),
  sdpMLineIndex: z.number().nullish(),
  usernameFragment: z.string().nullish(),
});

const MediaStreamTrackSchema = z.object({
  id: z.string(),
  kind: z.string(),
  label: z.string(),
  enabled: z.boolean(),
  muted: z.boolean(),
  readyState: z.enum(["live", "ended"]),
});

// Call type enum
const CallTypeEnum = z.enum(["audio", "video"]);

// Base schema with common fields
const BaseSchema = z.object({
  userId: z.string({
    required_error: "User ID is required",
    invalid_type_error: "User ID must be a string",
  }),
  callId: z.string({
    required_error: "Call ID is required",
    invalid_type_error: "Call ID must be a string",
  }),
});

// Base schema with chatRoomId
const BaseRoomSchema = BaseSchema.extend({
  chatRoomId: z.string({
    required_error: "Room ID is required",
    invalid_type_error: "Room ID must be a string",
  }),
});

// Individual message schemas extending from base schemas
export const WebRTCIceCandidateSchema = BaseSchema.extend({
  candidate: RTCIceCandidateSchema,
});

export const WebRTCMediaTrackSchema = BaseSchema.extend({
  track: MediaStreamTrackSchema,
});

export const WebRTCStartCallSchema = BaseRoomSchema.extend({
  callType: CallTypeEnum,
});
export const WebRTCJoinCallSchema = BaseRoomSchema;
export const WebRTCEndCallSchema = BaseRoomSchema;

export const WebRTCIncomingCallSchema = BaseRoomSchema.extend({
  callType: CallTypeEnum,
});

export const WebRTCOfferSchema = BaseSchema.extend({
  offer: RTCSessionDescriptionInitSchema,
});

export const WebRTCAnswerSchema = BaseSchema.extend({
  answer: RTCSessionDescriptionInitSchema,
});

export const WebRTCMediaStateChangeSchema = BaseSchema.extend({
  videoEnabled: z.boolean({
    required_error: "Video enabled status is required",
    invalid_type_error: "Video enabled must be a boolean",
  }),
  audioEnabled: z.boolean({
    required_error: "Audio enabled status is required",
    invalid_type_error: "Audio enabled must be a boolean",
  }),
});

export const WebRTCRoomFullSchema = BaseSchema.extend({
  currentParticipants: z.number({
    required_error: "current participants is required",
    invalid_type_error: "current participants must be a number",
  }),
});

export const WebRTCGetActiveParticipantsSchema = BaseRoomSchema.extend({
  activeParticipants: z.array(z.string()),
});

export interface ParticipantsDesc {
  userId: string;
  videoEnabled: boolean;
  audioEnabled: boolean;
}

interface CallStatusIDLE {
  status: "IDLE";
}
interface CallStatusInCallOrRinging {
  status: "RINGING" | "INCALL";
  info: IWebRTCIncomingCall;
}
export type CallStatus = CallStatusIDLE | CallStatusInCallOrRinging;
// Export types for all schemas
export type IRTCIceCandidate = z.infer<typeof RTCIceCandidateSchema>;
export type IRTCSessionDescriptionInit = z.infer<
  typeof RTCSessionDescriptionInitSchema
>;
export type IMediaStreamTrack = z.infer<typeof MediaStreamTrackSchema>;
export type IWebRTCIceCandidate = z.infer<typeof WebRTCIceCandidateSchema>;
export type IWebRTCMediaTrack = z.infer<typeof WebRTCMediaTrackSchema>;
export type IWebRTCStartCall = z.infer<typeof WebRTCStartCallSchema>;
export type IWebRTCIncomingCall = z.infer<typeof WebRTCIncomingCallSchema>;
export type IWebRTCDeclineCall = z.infer<typeof WebRTCEndCallSchema>;
export type IWebRTCJoinCall = z.infer<typeof WebRTCJoinCallSchema>;
export type IWebRTCEndCall = z.infer<typeof WebRTCEndCallSchema>;
export type IWebRTCOffer = z.infer<typeof WebRTCOfferSchema>;
export type IWebRTCAnswer = z.infer<typeof WebRTCAnswerSchema>;
export type IWebRTCMediaStateChange = z.infer<
  typeof WebRTCMediaStateChangeSchema
>;
export type IWebRTCRoomFull = z.infer<typeof WebRTCRoomFullSchema>;
export type IWebRTCGetActiveParticipants = z.infer<
  typeof WebRTCGetActiveParticipantsSchema
>;
export type CallType = z.infer<typeof CallTypeEnum>;
