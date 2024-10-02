import { MessageState } from "@/hooks/AppSelector/useMessageState";
import React from "react";
import { FileIcon, defaultStyles } from "react-file-icon";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { SquareArrowOutUpRight } from "lucide-react";
import { formatBytes } from "@/utils/custom/formatBytes";

const CircularProgress = ({
  className,
  value = 0,
}: {
  className?: string;
  value?: number;
}) => {
  return (
    <CircularProgressbar
      text="0%"
      value={value}
      strokeWidth={13}
      className={className}
      styles={{
        // Customize the root svg element
        root: {},
        // Customize the path, i.e. the "completed progress"
        path: {
          // Path color
          stroke: `#17c964`,
        },
        // Customize the circle behind the path, i.e. the "total progress"
        trail: {
          // Trail color
          stroke: "transparent",
        },
        // Customize the text
        text: {
          // Text color
          fill: "#fff",
          // Text size
          fontSize: "22px",
        },
      }}
    />
  );
};

const DocumentMessage = ({ messageState }: { messageState: MessageState }) => {
  const fileMessage = messageState.getRawMessage();

  if (!fileMessage) return null;
  if (fileMessage.type !== "file") return null;

  const selfMsg = messageState.isMessageFromSelf();
  const file = fileMessage.file;

  return (
    <div
      className={`mx-2 cursor-pointer ${fileMessage.message ? "mb-3" : ""} mt-2 flex shrink-0 items-center rounded-xl`}
    >
      <a
        href={file.url}
        onClick={(e) => !file.url && e.preventDefault()}
        target="_blank"
        rel="noopener noreferrer"
      >
        <div id={file.fileId} className="flex w-[270px] items-center px-2 py-1">
          <div className="h-12 w-0 shrink grow">
            <div className="flex items-center gap-2 overflow-hidden">
              <div className="w-7 shrink-0">
                <FileIcon
                  extension={file.extension}
                  {...(defaultStyles as any)[file.extension]}
                />
              </div>
              <div className="truncate">{file.fileName}</div>
            </div>
            <div
              className={`mt-[6px] flex shrink-0 items-center gap-1 text-[11px] font-semibold ${selfMsg ? "text-white-200" : "text-msg-message"} `}
            >
              <div className="fileUploadDescA truncate">
                {file.url ? formatBytes(file.size, 0) : "Pending"}
              </div>
              <div className="mx-[1px] h-[6px] w-[6px] rounded-full bg-msg-message"></div>
              <div className="fileUploadDescB truncate">{file.extension}</div>
            </div>
          </div>

          <div className={`progressLabel shrink-0 justify-center self-center`}>
            {file.url ? (
              <SquareArrowOutUpRight strokeWidth={2.5} className="h-7 w-7" />
            ) : (
              <CircularProgress className="h-12 w-12" />
            )}
          </div>
        </div>
      </a>
    </div>
  );
};

export default DocumentMessage;
