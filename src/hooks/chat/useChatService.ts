import { capitalizeStr } from "@/utils/custom/capitalizeStr";
import { selectedChatState } from "@/lib/store/features/chat/selectedChatSlice";
import { useAppSelector } from "@/lib/store/hooks";
import { IUser } from "@/schema/userSchema";
import { SocketEmitterQueue } from "@/service/socketQueue/SocketEmitterQueue";
import { useSocket } from "../useSocket";
import { useMemo } from "react";
import { chatRoomState } from "@/lib/store/features/chat/chatRoomSlice";
import { InfoMessage, TextMessage, TimestampMessage } from "@/chat/Message";
import { GroupChatRoom, PrivateChatRoom } from "@/chat/ChatRoom";
import {
  MessageDispatcher,
  useMessageDispatch,
} from "../AppDispatcher/useMessageDispatch";
import {
  ChatRoomDispatcher,
  useChatRoomDispatch,
} from "../AppDispatcher/useChatRoomDispatch";
import {
  SelectedChatDispatcher,
  useSelectedChatDispatch,
} from "../AppDispatcher/useSelectedChatDispatch";
import { isToday } from "date-fns";
import { messageState } from "@/lib/store/features/chat/messageSlice";
import { IFileMessage, IMessage } from "@/schema/MessageSchema";
import { IChatRoom } from "@/schema/ChatRoomSchema";
import { joinArrayWithAnd } from "@/utils/custom/joinArrayWithAnd";
import { toast } from "@/utils/toast/Toast";
import { ChatRoomAndMember } from "@/schema/ChatRoomAndMemberSchema";
import _ from "lodash";

interface NewGroupChatParams {
  chatName: string;
  chatRoomPicture: string;
  members: string[];
}

interface Message {
  text: string;
  file: IFileMessage[];
  call: "audio" | "video";
}

class ChatService {
  private socketQueue;
  private user;
  private selectedChat;
  private chatRoom;
  private message;
  private messageDispatch;
  private chatRoomDispatch;
  private selectedChatDispatch;

  constructor(
    socketQueue: SocketEmitterQueue,
    user: IUser | null,
    selectedChat: selectedChatState,
    chatRoom: chatRoomState,
    message: messageState,
    messageDispatch: MessageDispatcher,
    chatRoomDispatch: ChatRoomDispatcher,
    selectedChatDispatch: SelectedChatDispatcher,
  ) {
    this.socketQueue = socketQueue;
    this.user = user;
    this.selectedChat = selectedChat;
    this.chatRoom = chatRoom;
    this.message = message;
    this.messageDispatch = messageDispatch;
    this.chatRoomDispatch = chatRoomDispatch;
    this.selectedChatDispatch = selectedChatDispatch;
  }
  private addToStoreAndEmitMsg(message: IMessage) {
    this.messageDispatch.createMessage(message);
    this.socketQueue.emitChatRoomMessage(
      message.chatRoomId,
      "message-create",
      message,
    );
  }
  private addToStoreAndEmitChatRoom(chatRoom: IChatRoom) {
    this.chatRoomDispatch.createChatRoom(chatRoom);
    this.socketQueue.emitChatRoom("chatroom-create", chatRoom);
  }

  sendNewMessage<T extends keyof Message>(
    type: T,
    message: Message[T],
    repliedTo?: string | null,
  ) {
    if (!this.user || !this.selectedChat.id) return;
    let chatRoomId = this.selectedChat.id;

    //first get last date of chatRoom and check whether whether msg was sent today or earlier
    const lastMsgId = this.chatRoom[chatRoomId]?.lastMessageId || null;
    const lastMessage = lastMsgId ? this.message[lastMsgId] : null;
    let timeStampMsg: TimestampMessage | null = null;
    if (!lastMessage || (lastMessage && !isToday(lastMessage.createdAt)))
      timeStampMsg = new TimestampMessage(this.user._id, chatRoomId);

    //chatRoomId can be user id so don't forget to update it
    let msg: IMessage[] = [];
    if (type === "text") {
      const tempMessage = message as Message["text"];
      msg.push(
        new TextMessage(
          tempMessage,
          this.user._id,
          chatRoomId,
          repliedTo,
        ).toObject(),
      );
    } else if (type === "file") {
      const tempMessage = message as Message["file"];
      tempMessage.forEach((message) => {
        const updatedMessage = { ...message };
        updatedMessage.createdAt = new Date().toISOString();
        updatedMessage.updatedAt = new Date().toISOString();
        msg.push(updatedMessage);
      });
    }
    if (type === "call") {
      const tempMessage = `${capitalizeStr(this.user.name)} has started a ${message} call`;
      msg.push(
        new InfoMessage(
          tempMessage,
          this.user._id,
          chatRoomId,
          null,
        ).toObject(),
      );
    }
    const lastNewMsg = _.last(msg);
    if (!lastNewMsg) return;

    if (!this.chatRoom[chatRoomId]) {
      // which means chatRoomId is userId.
      const chatRoom = new PrivateChatRoom(
        [this.user._id, chatRoomId],
        this.user._id,
        lastNewMsg.messageId,
        lastNewMsg.updatedAt,
      );
      chatRoomId = chatRoom.chatRoomId;
      //this replaces userId with realChatRoomID for newly created one
      msg.forEach((elem) => {
        elem.chatRoomId = chatRoom.chatRoomId;
      });
      if (timeStampMsg) timeStampMsg.chatRoomId = chatRoom.chatRoomId;
      // now select this chatRoom
      this.selectedChatDispatch.setSelectedChat(chatRoom.chatRoomId, true);
      // and add this chatRoom to ChatRoom Store
      this.addToStoreAndEmitChatRoom(chatRoom.toObject());
    }

    if (timeStampMsg) this.addToStoreAndEmitMsg(timeStampMsg.toObject());
    msg.forEach((elem) => {
      this.addToStoreAndEmitMsg(elem);
    });
    return msg;
  }

  createNewGroupChat({
    chatName,
    chatRoomPicture,
    members,
  }: NewGroupChatParams) {
    if (!this.user) return;

    // if user itself is not included then add him
    if (!members.includes(this.user._id)) members.push(this.user._id);

    const chatRoom = new GroupChatRoom(
      chatName,
      chatRoomPicture,
      [this.user._id],
      members,
      this.user._id,
      "",
    );

    const timeStampMsg = new TimestampMessage(
      this.user._id,
      chatRoom.chatRoomId,
    );
    const infoMsg = new InfoMessage(
      `${capitalizeStr(this.user.name)} created the Group`,
      this.user._id,
      chatRoom.chatRoomId,
    );

    //update lastMessageId of chatRoom
    chatRoom.lastMessageId = infoMsg.messageId;

    // now select this chatRoom
    this.selectedChatDispatch.setSelectedChat(chatRoom.chatRoomId);
    // and add this chatRoom to ChatRoom Store
    this.addToStoreAndEmitChatRoom(chatRoom.toObject());

    this.addToStoreAndEmitMsg(timeStampMsg.toObject());
    this.addToStoreAndEmitMsg(infoMsg.toObject());
  }

  addMoreMembersToChatRoom(chatRoomId: string, members: IUser[]) {
    if (this.selectedChat.id !== chatRoomId || !this.user) return;
    const chatRoom = this.chatRoom[chatRoomId];
    if (!chatRoom) return;

    const memberId: string[] = [];
    const membersName: string[] = [];
    members.forEach((user) => {
      if (!chatRoom.members.includes(user._id)) {
        memberId.push(user._id);
        membersName.push(user.name);
      }
    });

    const infoMsg = new InfoMessage(
      `${capitalizeStr(this.user.name)} added ${joinArrayWithAnd(membersName, true)}`,
      this.user._id,
      chatRoom.chatRoomId,
    );

    if (!memberId.length) return;

    const payload = { chatRoomId, newMember: memberId };
    this.chatRoomDispatch.addNewMembers(payload);
    this.socketQueue.emitChatRoom("chatroom-addNewMembers", payload);
    this.addToStoreAndEmitMsg(infoMsg.toObject());
  }
  async exitChatRoom(chatRoomId: string) {
    const chatRoom = this.chatRoom[chatRoomId];
    if (!chatRoom) return;
    if (this.selectedChat.id !== chatRoomId || !this.user) return;
    if (!this.chatRoom[this.selectedChat.id]?.members?.includes(this.user._id))
      return;

    const payload: ChatRoomAndMember = {
      chatRoomId,
      memberId: this.user._id,
    };

    const infoMsg = new InfoMessage(
      `${capitalizeStr(this.user.name)} has left the group`,
      this.user._id,
      chatRoomId,
    );
    const msg = infoMsg.toObject();

    this.messageDispatch.createMessage(msg);
    this.chatRoomDispatch.exitChatRoom(payload);

    // emitting both to common queue which ensures after info message is processed then only remove user
    this.socketQueue.emit("message-create", msg);
    this.socketQueue.emit("chatroom-leave", payload);
  }

  async removeUserFromChatRoom(
    chatRoomId: string,
    memberId: string,
    memberName: string,
  ) {
    const chatRoom = this.chatRoom[chatRoomId];
    if (!chatRoom || chatRoom.type === "private" || !this.user) return;
    // user itself must be admin to perform this action
    if (!chatRoom.admins.includes(this.user._id || ""))
      return toast.error("User doesnot have privilege to remove another user");

    if (chatRoom.createdBy === memberId)
      return toast.error("You cannot remove group owner");

    const infoMsg = new InfoMessage(
      `${capitalizeStr(this.user.name)} removed ${capitalizeStr(memberName)}`,
      this.user._id,
      chatRoom.chatRoomId,
    );

    const payload = { chatRoomId, memberId };
    this.messageDispatch.createMessage(infoMsg.toObject());
    this.chatRoomDispatch.exitChatRoom(payload);

    // emitting both to common queue which ensures after info message is processed then only remove user
    this.socketQueue.emit("message-create", infoMsg.toObject());
    this.socketQueue.emit("chatroom-removeUser", payload);
  }
  async demoteAdminInChatRoom(
    chatRoomId: string,
    memberId: string,
    memberName: string,
  ) {
    const chatRoom = this.chatRoom[chatRoomId];
    if (!chatRoom || chatRoom.type === "private" || !this.user) return;
    // user itself must be admin to perform this action
    if (!chatRoom.admins.includes(this.user?._id || ""))
      return toast.error(
        "User doesnot have privilege to demote another user to admin",
      );

    if (chatRoom.createdBy === memberId)
      return toast.error("You cannot remove admin role from group owner");

    const infoMsg = new InfoMessage(
      `${capitalizeStr(this.user.name)} demoted ${capitalizeStr(memberName)} from admin`,
      this.user._id,
      chatRoom.chatRoomId,
    );

    const payload = { chatRoomId, memberId };
    this.chatRoomDispatch.removeAdmin(payload);
    this.socketQueue.emitChatRoom("chatroom-removeAdmin", payload);
    this.addToStoreAndEmitMsg(infoMsg.toObject());
  }
  async promoteToAdminInChatRoom(
    chatRoomId: string,
    memberId: string,
    memberName: string,
  ) {
    const chatRoom = this.chatRoom[chatRoomId];
    if (!chatRoom || chatRoom.type === "private" || !this.user) return;
    // user itself must be admin to perform this action
    if (!chatRoom.admins.includes(this.user._id || ""))
      return toast.error(
        "User doesnot have privilege to promote another user to admin",
      );
    if (chatRoom.createdBy === memberId)
      return toast.error("You cannot promote group owner to admin");

    const infoMsg = new InfoMessage(
      `${capitalizeStr(this.user.name)} made ${capitalizeStr(memberName)} admin`,
      this.user._id,
      chatRoom.chatRoomId,
    );

    const payload = { chatRoomId, memberId };
    this.chatRoomDispatch.makeAdmin(payload);
    this.socketQueue.emitChatRoom("chatroom-makeAdmin", payload);
    this.addToStoreAndEmitMsg(infoMsg.toObject());
  }

  sendTypingIndicator() {
    const chatRoomId = this.selectedChat.id;
    const memberId = this.user?._id;
    if (!chatRoomId || !memberId) return;

    this.socketQueue.emitDirectly("chatroom-memberTyping", {
      chatRoomId,
      memberId,
    });
  }
}

export const useChatService = () => {
  const { socketQueue } = useSocket();
  const user = useAppSelector((state) => state.auth.user);
  const selectedChat = useAppSelector((state) => state.chat.selectedChat);
  const chatRoom = useAppSelector((state) => state.chat.chatRoom);
  const message = useAppSelector((state) => state.chat.message);
  const messageDispatch = useMessageDispatch();
  const chatRoomDispatch = useChatRoomDispatch();
  const selectedChatDispatch = useSelectedChatDispatch();

  const chatService = useMemo(
    () =>
      new ChatService(
        socketQueue,
        user,
        selectedChat,
        chatRoom,
        message,
        messageDispatch,
        chatRoomDispatch,
        selectedChatDispatch,
      ),
    [
      socketQueue,
      user,
      selectedChat,
      chatRoom,
      messageDispatch,
      chatRoomDispatch,
      selectedChatDispatch,
      message,
    ],
  );

  return chatService;
};
