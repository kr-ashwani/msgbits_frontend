import { FileMessage } from "@/chat/Message";
import { ChatSvg } from "@/components/svg/chatSvg";
import { useSelectedChatState } from "@/hooks/AppSelector/useSelectedChatState";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { useFiles } from "./ChatAreaFooter";
import { convertFiletoFileMessage } from "@/utils/custom/convertFiletoFileMessage";
import Svg from "@/components/svg";
import { useMessageDispatch } from "@/hooks/AppDispatcher/useMessageDispatch";
import { IMessage } from "@/schema/MessageSchema";

const FilesPreviewFooter = () => {
  const selectedChat = useSelectedChatState();
  const chatState = selectedChat.getChatState();
  const { files, setFiles } = useFiles();
  const fileMessages = useRef<{ [p in string]: IMessage }>({});
  const fileMessagesArr = useRef<IMessage[]>([]);
  const [loading, setLoading] = useState(true);

  const messageDispatch = useMessageDispatch();

  useEffect(() => {
    setLoading(true);
    const initiateFileMessageCoversion = async () => {
      // check whether it is already in cache
      const pendingFiles = files.filter(
        (file) => !Boolean(fileMessages.current[file.fileId]),
      );

      // convert pending file to fileMessages
      const fileMsg = await convertFiletoFileMessage(pendingFiles);
      // added converted fileMessages to cache
      fileMsg.forEach(
        (msg) => (fileMessages.current[msg.file.fileId] = msg.toObject()),
      );

      fileMessagesArr.current = [];
      files.forEach((file) =>
        fileMessagesArr.current.push(fileMessages.current[file.fileId]),
      );

      setLoading(false);
    };
    initiateFileMessageCoversion();
  }, [files]);

  if (!chatState) return null;

  const sendFiles = () => {
    const chatRoomId = selectedChat.getSelectedChatId();
    if (!chatRoomId || !fileMessagesArr.current.length) return;

    console.log(fileMessagesArr.current);

    messageDispatch.setMessagesOfChatRoom({
      [chatRoomId]: fileMessagesArr.current,
    });

    setFiles([]);
  };
  return (
    <div className="flex px-10 py-2 pb-6">
      <div className="grow">
        <div className="flex h-full max-w-40 items-center gap-2 rounded-xl bg-input-bg px-3 py-2">
          <Image
            src={chatState.getChatRoomPicture() || ""}
            width={25}
            height={25}
            alt="chatRoom pic"
          ></Image>
          <div className="font-sm truncate font-semibold text-detail-font-color">
            {chatState.getChatRoomName()}
          </div>
        </div>
      </div>
      <div className="cursor-pointer text-theme-color" onClick={sendFiles}>
        {loading ? Svg("loading") : ChatSvg("msgSend")}
      </div>
    </div>
  );
};

export default FilesPreviewFooter;
