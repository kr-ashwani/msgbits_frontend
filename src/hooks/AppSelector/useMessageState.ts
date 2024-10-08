import { chatRoomToMessageMapState } from "@/lib/store/features/chat/chatRoomToMessageMapSlice";
import { messageState } from "@/lib/store/features/chat/messageSlice";
import { useAppSelector } from "@/lib/store/hooks";
import { use, useMemo } from "react";
import { formatTimeDifference } from "@/utils/custom/formatTimeDifference";
import { ChatUserState, useChatUserState } from "./useChatUserState";
import { IUser } from "@/schema/userSchema";
import { format } from "date-fns";
import { SelectedChatState } from "./useSelectedChatState";

export class MessageState {
  public messageId: string;
  private messageContainerState: MessageContainerState;

  constructor(messageId: string, messageContainerState: MessageContainerState) {
    this.messageId = messageId;
    this.messageContainerState = messageContainerState;
  }
  getContainer() {
    return this.messageContainerState;
  }
  getMessageText() {
    return this.messageContainerState.getMessageTextById(this.messageId);
  }
  isMessageFromSelf() {
    return this.messageContainerState.isMessageFromSelf(this.messageId);
  }
  getSenderUser() {
    return this.messageContainerState.getSenderUser(this.messageId);
  }
  getRawMessage() {
    return this.messageContainerState.getRawMessage(this.messageId);
  }
  getTime() {
    return this.messageContainerState.getTime(this.messageId);
  }
  getCreatedAtTime() {
    return this.messageContainerState.getCreatedAtTime(this.messageId);
  }
  getLastMessageTimeFromNow() {
    return this.messageContainerState.getLastMessageTimeFromNowById(
      this.messageId,
    );
  }
  getMessageStatus(selectedChat: SelectedChatState) {
    return this.messageContainerState.getMessageStatus(
      this.messageId,
      selectedChat,
    );
  }
  getSelfMessageStatus(selectedChat: SelectedChatState) {
    return this.messageContainerState.getSelfMessageStatus(
      this.messageId,
      selectedChat,
    );
  }
  isMessageAlreadySeen() {
    return this.messageContainerState.isMessageAlreadySeen(this.messageId);
  }
  getChatRoomId() {
    return this.messageContainerState.getChatRoomId(this.messageId);
  }
}
export class MessageContainerState {
  private message: messageState;
  private chatRoomToMessageMap: chatRoomToMessageMapState;
  private chatUser: ChatUserState;
  private user: IUser | null;

  constructor(
    message: messageState,
    chatRoomToMessageMap: chatRoomToMessageMapState,
    chatUser: ChatUserState,
    user: IUser | null,
  ) {
    this.message = message;
    this.chatRoomToMessageMap = chatRoomToMessageMap;
    this.chatUser = chatUser;
    this.user = user;
  }
  getCreatedAtTime(messageId: string) {
    const msg = this.message[messageId];
    if (!msg) return 0;
    return new Date(msg.createdAt).getTime();
  }
  getMessagesOfChatRoom(chatRoomId: string) {
    const messageArr: MessageState[] = [];
    if (!this.chatRoomToMessageMap[chatRoomId]) return messageArr;
    this.chatRoomToMessageMap[chatRoomId].map((messageId) => {
      const msgState = this.getMessageById(messageId);
      if (msgState) messageArr.push(msgState);
    });
    messageArr.sort(
      (msg1, msg2) => msg1.getCreatedAtTime() - msg2.getCreatedAtTime(),
    );
    return messageArr;
  }
  getMessageById(messageId: string) {
    if (this.message[messageId]) return new MessageState(messageId, this);
    return null;
  }
  getAllMessages() {
    const message: { [p: string]: MessageState[] } = {};

    Object.entries(this.chatRoomToMessageMap).forEach((entry) => {
      const messageArr: MessageState[] = [];
      message[entry[0]] = messageArr;

      entry[1].forEach((messageId) => {
        const msgState = this.getMessageById(messageId);
        if (msgState) messageArr.push(msgState);
      });
    });

    return message;
  }
  getMessageTextById(messageId: string) {
    const fallbackMsg = "";
    if (this.message[messageId]) return this.message[messageId].message;
    return fallbackMsg;
  }
  getLastMessageTimeFromNowById(messageId: string) {
    const fallbackMsg = "NA";
    if (this.message[messageId])
      return formatTimeDifference(this.message[messageId].updatedAt);
    return fallbackMsg;
  }
  getLastMessage(messageId: string) {
    return this.message[messageId] ? new MessageState(messageId, this) : null;
  }
  isMessageFromSelf(messageId: string) {
    if (!this.user || !this.message[messageId]) return false;

    return this.message[messageId].senderId === this.user._id;
  }
  getSenderUser(messageId: string) {
    if (!this.message[messageId]) return null;
    return this.chatUser.getUserById(this.message[messageId].senderId);
  }
  getRawMessage(messageId: string) {
    if (!this.message[messageId]) return null;
    return this.message[messageId];
  }
  getTime(messageId: string) {
    if (!this.message[messageId]) return null;
    return format(this.message[messageId].updatedAt, "hh:mm a");
  }
  getMessageStatus(messageId: string, selectedChat: SelectedChatState) {
    const msg = this.message[messageId];
    const chatRoom = selectedChat.getChatState()?.getRawChatRoom();
    if (!msg || !chatRoom) return "pending";

    const msgSeenArr = msg.seenBy.filter((userId) =>
      chatRoom.members.includes(userId),
    );
    const msgDeliveredArr = msg.deliveredTo.filter((userId) =>
      chatRoom.members.includes(userId),
    );

    if (msg.status === "pending") return "pending";
    else if (msgSeenArr.length === chatRoom.members.length - 1) return "seen";
    else if (msgDeliveredArr.length === chatRoom.members.length - 1)
      return "delivered";
    else return "sent";
  }
  getSelfMessageStatus(messageId: string, selectedChat: SelectedChatState) {
    const msg = this.message[messageId];
    if (!msg) return null;
    if (msg.senderId === this.user?._id)
      return this.getMessageStatus(messageId, selectedChat);
    return null;
  }
  isMessageAlreadySeen(messageId: string) {
    const msg = this.message[messageId];
    if (!msg || !this.user) return false;
    if (msg.senderId === this.user._id) return false;
    if (msg.seenBy.includes(this.user._id)) return true;
    return false;
  }
  getChatRoomId(messageId: string) {
    const msg = this.message[messageId];
    return msg ? msg.chatRoomId : null;
  }
}

const useMessageState = () => {
  const message = useAppSelector((state) => state.chat.message);
  const chatRoomToMessageMap = useAppSelector(
    (state) => state.chat.chatRoomToMessageMap,
  );
  const chatUser = useChatUserState();
  const user = useAppSelector((state) => state.auth.user);

  return useMemo(
    () =>
      new MessageContainerState(message, chatRoomToMessageMap, chatUser, user),
    [message, chatRoomToMessageMap, chatUser, user],
  );
};

export { useMessageState };
