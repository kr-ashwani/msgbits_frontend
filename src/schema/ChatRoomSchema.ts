import { z } from "zod";

const ChatRoomBaseSchema = z.object({
  chatRoomId: z.string({
    required_error: "MessageId is required",
  }),
  members: z.array(
    z.string({
      required_error: "Members is required",
    }),
    {
      required_error: "Members is required",
    },
  ),
  lastMessageId: z.string({
    required_error: "Last Message Id is required",
  }),
  createdAt: z.number({
    required_error: "createdAt is required",
  }),
  updatedAt: z.number({
    required_error: "updatedAt is required",
  }),
});

const PrivateChatRoomSchema = ChatRoomBaseSchema.extend({
  type: z.literal("private"),
});

const GroupChatRoomSchema = ChatRoomBaseSchema.extend({
  type: z.literal("group"),
  chatName: z.string({
    required_error: "Chat Name is required",
  }),
  chatRoomPicture: z.string({
    required_error: "Chat Room Picture is required",
  }),
  admins: z.array(
    z.string({
      required_error: "Admins is required",
    }),
    {
      required_error: "Admins is required",
    },
  ),
});

const ChatRoomSchema = z.discriminatedUnion("type", [
  PrivateChatRoomSchema,
  GroupChatRoomSchema,
]);
export type IChatRoomBase = z.infer<typeof ChatRoomBaseSchema>;
export type IGroupChatRoom = z.infer<typeof GroupChatRoomSchema>;
export type IPrivateChatRoom = z.infer<typeof PrivateChatRoomSchema>;
export type IChatRoom = z.infer<typeof ChatRoomSchema>;
