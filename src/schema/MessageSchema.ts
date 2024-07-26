import { z } from "zod";
import { FileSchema } from "./FileSchema";

const MessageBaseSchema = z.object({
  messageId: z.string({
    required_error: "MessageId is required",
  }),
  message: z.string({
    required_error: "Message is required",
  }),
  senderId: z.string({
    required_error: "SenderId is required",
  }),
  status: z.enum(["pending", "sent", "delivered", "read", "failed"], {
    required_error: "Status is required",
  }),
  repliedTo: z.union([z.string(), z.null()]),
  createdAt: z.number({
    required_error: "createdAt is required",
  }),
  updatedAt: z.number({
    required_error: "updatedAt is required",
  }),
});

const TextMessageSchema = MessageBaseSchema.extend({
  type: z.literal("text"),
});

const FileMessageSchema = MessageBaseSchema.extend({
  type: z.literal("file"),
  file: FileSchema,
});

export const MessageSchema = z.discriminatedUnion("type", [
  TextMessageSchema,
  FileMessageSchema,
]);

export type IMessageBase = z.infer<typeof MessageBaseSchema>;
export type ITextMessage = z.infer<typeof TextMessageSchema>;
export type IFileMessage = z.infer<typeof FileMessageSchema>;
export type IMessage = z.infer<typeof MessageSchema>;
