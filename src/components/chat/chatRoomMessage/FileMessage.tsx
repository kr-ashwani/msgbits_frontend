import { MessageState } from "@/hooks/AppSelector/useMessageState";
import React from "react";
import ImageOrVideoMessage from "./ImageMessage";
import DocumentMessage from "./DocumentMessage";
import TextMessage from "./TextMessage";

const FileMessage = ({ messageState }: { messageState: MessageState }) => {
  const rawMessage = messageState.getRawMessage();

  if (!rawMessage) return null;
  if (rawMessage.type !== "file") return null;

  const file = rawMessage.file;

  return (
    <TextMessage
      messageState={messageState}
      messageClassName="w-0 grow"
      messageFrameClassName="pt-1"
    >
      {file.dimension ? (
        <ImageOrVideoMessage messageState={messageState} />
      ) : (
        <DocumentMessage messageState={messageState} />
      )}
    </TextMessage>
  );
};

export default FileMessage;
