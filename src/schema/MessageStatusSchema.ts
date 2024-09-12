import { z } from "zod";

export const MessageStatusSchema = z.object({
  messageIds: z.array(z.string(), {
    required_error: "MessageId is required",
  }),
  userId: z.string({
    required_error: "userId is required",
  }),
});

export type MessageStatus = z.infer<typeof MessageStatusSchema>;
