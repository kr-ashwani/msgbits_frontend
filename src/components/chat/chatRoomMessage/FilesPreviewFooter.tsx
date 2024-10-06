import { ChatSvg } from "@/components/svg/chatSvg";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { useFiles } from "./ChatAreaFooter";
import { convertFiletoFileMessage } from "@/utils/custom/convertFiletoFileMessage";
import Svg from "@/components/svg";
import { IFileMessage, IMessage } from "@/schema/MessageSchema";
import { fileQueue } from "@/service/file/FileQueueSingleton";
import { toast } from "@/utils/toast/Toast";
import { useChatService } from "@/hooks/chat/useChatService";
import { Dialog } from "@/components/utility/Dialog";
import { useAppSelector } from "@/lib/store/hooks";
import { useDispatch } from "react-redux";
import { setShowFileDiscardDialog } from "@/lib/store/features/chat/chatRoomDataSlice";
import { useSelectedChatState } from "@/hooks/AppSelector/useSelectedChatState";

const FilesPreviewFooter = () => {
  const { files, setFiles } = useFiles();
  const fileMessages = useRef<{ [p in string]: IMessage }>({});
  const fileMessagesArr = useRef<IMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const chatService = useChatService();
  const chatState = useSelectedChatState().getChatState();
  const dispatch = useDispatch();
  const showFileDiscardDialog = useAppSelector(
    (state) => state.chat.chatRoomData.showFileDiscardDialog,
  );

  useEffect(() => {
    setLoading(true);
    const initiateFileMessageConversion = async () => {
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
    initiateFileMessageConversion();
  }, [files]);

  const sendFiles = () => {
    const fileMessageToUpload: IFileMessage[] = [];

    fileMessagesArr.current.forEach((msg) => {
      if (msg.type === "file") fileMessageToUpload.push(msg);
    });

    // updated messages -- if you are sending files to new user
    // updated chatroom message is must
    const updatedMessages = chatService.sendNewMessage(
      "file",
      fileMessageToUpload,
    );

    updatedMessages?.forEach((msg) => {
      if (msg.type === "file") {
        const [file] = files.filter((elem) => elem.fileId === msg.file.fileId);
        if (!file) toast.error("file to upload is missing");

        fileQueue.enqueue({
          file: file.file,
          fileId: file.fileId,
          fileMessage: msg,
        });
      }
    });

    setFiles([]);
  };

  function handleFilesDiscard() {
    setFiles([]);
  }

  function handleDialogClose(state: boolean) {
    dispatch(setShowFileDiscardDialog(false));
  }

  if (!chatState) return null;
  return (
    <div className="flex px-10 py-2 pb-6">
      <div className="grow">
        <div className="flex h-full max-w-40 items-center gap-2 rounded-xl bg-input-bg px-3 py-2">
          <Image
            src={
              chatState.getChatRoomPicture() ||
              chatState.getTempUser()?.profilePicture ||
              ""
            }
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

      <Dialog
        title={"Discard unsent Message?"}
        description={
          "You have an unsent message, including any attached media. Leaving this screen will prevent it from being saved or sent."
        }
        cancelButtonText={"Return to File Preview"}
        confirmButtonText={"Discard"}
        alertDialogProps={{
          onOpenChange: handleDialogClose,
          open: showFileDiscardDialog,
        }}
        onConfirm={() => handleFilesDiscard()}
      >
        {null}
      </Dialog>
    </div>
  );
};

export default FilesPreviewFooter;
