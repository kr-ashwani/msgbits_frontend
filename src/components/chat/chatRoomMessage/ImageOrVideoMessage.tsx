import { MessageState } from "@/hooks/AppSelector/useMessageState";
import React from "react";
import DocumentMessage from "./DocumentMessage";
import Svg from "@/components/svg";
import Image from "next/image";

const ImageOrVideoMessage = ({
  messageState,
}: {
  messageState: MessageState;
}) => {
  const fileMessage = messageState.getRawMessage();

  if (!fileMessage) return null;
  if (fileMessage.type !== "file") return null;

  const file = fileMessage.file;
  const selfMsg = messageState.isMessageFromSelf();

  console.log();
  if (
    (!file.fileType.includes("image/") && !file.fileType.includes("video/")) ||
    !file.dimension
  )
    return <DocumentMessage messageState={messageState} />;

  return (
    <div
      className={`mx-2 mt-2 flex items-center justify-center rounded-xl ${file.url ? "" : "bg-chat-bg"}`}
    >
      {file.url ? (
        file.fileType.includes("image/") ? (
          <Image
            className="rounded-xl"
            alt="message"
            src={file.url}
            width={file.dimension.width}
            height={file.dimension.height}
          />
        ) : (
          <video
            className="rounded-xl"
            width={file.dimension.width}
            height={file.dimension.height}
            controls
            muted
          >
            <source src={file.url} type={file.fileType} />
          </video>
        )
      ) : (
        <div
          className="flex items-center justify-center"
          style={{
            width: file.dimension.width,
            height: file.dimension.height,
          }}
        >
          <div className="text-theme-color">
            {Svg("loading", { width: "40", height: "40", strokeWidth: 2 })}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageOrVideoMessage;
