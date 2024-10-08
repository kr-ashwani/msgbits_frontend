import { z } from "zod";
import { FileSchema } from "./FileSchema";

const MessageBaseSchema = z.object({
  chatRoomId: z.string({
    required_error: "chatRoomId is required",
  }),
  messageId: z.string({
    required_error: "MessageId is required",
  }),
  message: z.string({
    required_error: "Message is required",
  }),
  senderId: z.string({
    required_error: "SenderId is required",
  }),
  status: z.enum(["pending", "sent"], {
    required_error: "Status is required",
  }),
  repliedTo: z.union([z.string(), z.null()]),
  createdAt: z.string({
    required_error: "createdAt is required",
  }),
  updatedAt: z.string({
    required_error: "updatedAt is required",
  }),

  deliveredTo: z.array(
    z.string({
      required_error: "deliveredTo is required",
    }),
    { required_error: "deliveredTo is missing" },
  ),
  seenBy: z.array(
    z.string({
      required_error: "seenBy is required",
    }),
    { required_error: "seenBy is missing" },
  ),
});

const TextMessageSchema = MessageBaseSchema.extend({
  type: z.literal("text"),
});

const InfoMessageSchema = MessageBaseSchema.extend({
  type: z.literal("info"),
});

const FileMessageSchema = MessageBaseSchema.extend({
  type: z.literal("file"),
  file: FileSchema,
});

export const MessageSchema = z.discriminatedUnion("type", [
  TextMessageSchema,
  InfoMessageSchema,
  FileMessageSchema,
]);

export type IMessageBase = z.infer<typeof MessageBaseSchema>;
export type ITextMessage = z.infer<typeof TextMessageSchema>;
export type IInfoMessage = z.infer<typeof InfoMessageSchema>;
export type IFileMessage = z.infer<typeof FileMessageSchema>;
export type IMessage = z.infer<typeof MessageSchema>;
