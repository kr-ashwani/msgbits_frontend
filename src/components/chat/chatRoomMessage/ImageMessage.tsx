import { MessageState } from "@/hooks/AppSelector/useMessageState";
import React from "react";
import DocumentMessage from "./DocumentMessage";
import Svg from "@/components/svg";
import { SafeImage } from "@/components/utility/SafeImage";

const ImageOrVideoMessage = ({
  messageState,
}: {
  messageState: MessageState;
}) => {
  const fileMessage = messageState.getRawMessage();

  if (!fileMessage) return null;
  if (fileMessage.type !== "file") return null;

  const file = fileMessage.file;

  // if file is not image or dimension is missing
  if (!file.fileType.includes("image/") || !file.dimension)
    return <DocumentMessage messageState={messageState} />;

  return (
    <div
      className={`mx-2 mt-2 flex items-center justify-center rounded-xl ${file.url && file.url !== "failed" ? "" : "bg-chat-bg"}`}
    >
      {file.url && file.url !== "failed" ? (
        <SafeImage
          className="rounded-xl"
          alt="message"
          src={file.url}
          width={file.dimension.width}
          height={file.dimension.height}
        />
      ) : (
        <div
          className="flex items-center justify-center overflow-hidden"
          style={{
            width: file.dimension.width,
            height: file.dimension.height,
          }}
        >
          <div id={file.fileId} className="relative flex text-theme-color">
            <div className="progressLabelAttach absolute inset-0 flex items-center justify-center text-sm font-medium">
              {file.url === "failed" ? "Failed" : "0%"}
            </div>

            {file.url === "failed"
              ? null
              : Svg("loading", { width: "80", height: "80", strokeWidth: 1.3 })}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageOrVideoMessage;
