import { selectedChatState } from "@/lib/store/features/chat/selectedChatSlice";
import { useAppSelector } from "@/lib/store/hooks";
import { IUser } from "@/schema/userSchema";
import { SocketEmitterQueue } from "@/service/socketQueue/SocketEmitterQueue";
import { useSocket } from "../useSocket";
import { useMemo } from "react";
import { chatRoomState } from "@/lib/store/features/chat/chatRoomSlice";
import { TextMessage } from "@/chat/Message";
import { PrivateChatRoom } from "@/chat/ChatRoom";
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

class MessageService {
  private socketQueue;
  private user;
  private selectedChat;
  private chatRoom;
  private messageDispatch;
  private chatRoomDispatch;
  private selectedChatDispatch;

  constructor(
    socketQueue: SocketEmitterQueue,
    user: IUser | null,
    selectedChat: selectedChatState,
    chatRoom: chatRoomState,
    messageDispatch: MessageDispatcher,
    chatRoomDispatch: ChatRoomDispatcher,
    selectedChatDispatch: SelectedChatDispatcher,
  ) {
    this.socketQueue = socketQueue;
    this.user = user;
    this.selectedChat = selectedChat;
    this.chatRoom = chatRoom;
    this.messageDispatch = messageDispatch;
    this.chatRoomDispatch = chatRoomDispatch;
    this.selectedChatDispatch = selectedChatDispatch;
  }
  sendNewTextMessage(message: string) {
    if (!this.user || !this.selectedChat.id) return;
    let chatRoomId = this.selectedChat.id;
    //chatRoomId can be user id so dont forget to update it
    const msg = new TextMessage(message, this.user._id, chatRoomId);
    if (!this.chatRoom[chatRoomId]) {
      // which means chatRoomId is userId.
      const chatRoom = new PrivateChatRoom(
        [this.user._id, chatRoomId],
        this.user._id,
        msg.messageId,
        msg.updatedAt,
      );
      chatRoomId = chatRoom.chatRoomId;
      this.socketQueue.emitChatRoom("chatroom-create", chatRoom.toObject());
      //this replaces userId with realChatRoomID for newly created one
      msg.chatRoomId = chatRoom.chatRoomId;
      // now select this chatRoom
      this.selectedChatDispatch.setSelectedChat(chatRoom.chatRoomId);
      // now add this chatRoom to ChatRoom Store
      this.chatRoomDispatch.createChatRoom(chatRoom.toObject());
    }
    this.socketQueue.emitChatRoomMessage(
      chatRoomId,
      "message-create",
      msg.toObject(),
    );
    // now add this message to Message Store
    this.messageDispatch.createMessage(msg.toObject());
  }
}

export const useMessageService = () => {
  const { socketQueue } = useSocket();
  const user = useAppSelector((state) => state.auth.user);
  const selectedChat = useAppSelector((state) => state.chat.selectedChat);
  const chatRoom = useAppSelector((state) => state.chat.chatRoom);
  const messageDispatch = useMessageDispatch();
  const chatRoomDispatch = useChatRoomDispatch();
  const selectedChatDispatch = useSelectedChatDispatch();

  const messageService = useMemo(
    () =>
      new MessageService(
        socketQueue,
        user,
        selectedChat,
        chatRoom,
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
    ],
  );

  return messageService;
};
