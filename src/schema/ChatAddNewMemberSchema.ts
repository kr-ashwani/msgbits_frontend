import { z } from "zod";

export const ChatAddNewMemberSchema = z.object({
  chatRoomId: z.string({
    required_error: "chatRoomId is missing",
  }),
  newMember: z.array(z.string(), {
    required_error: "newMember is missing",
  }),
});

export type ChatAddNewMember = z.infer<typeof ChatAddNewMemberSchema>;
