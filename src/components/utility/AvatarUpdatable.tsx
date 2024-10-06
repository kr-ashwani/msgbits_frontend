import React, { useRef, useState } from "react";
import Avatar from "./Avatar";
import { cn } from "@/lib/utils";
import Svg from "../svg";
import FileUploadIndicator from "./FileUploadIndicator";
import { uploadFileToServer } from "@/utils/custom/uploadFileToServer";
import { FileUploadStatus } from "@/service/file/types";

const AvatarUpdatable = ({
  src,
  size,
  setSrc,
  className = "",
  avatarClassName = "",
  onClick,
  showBg = true,
  onSrcUrlChange,
  processImageFn,
  imageUploadClass = "",
}: {
  src: string;
  size: number;
  setSrc: React.Dispatch<React.SetStateAction<string>>;
  className?: string;
  avatarClassName?: string;
  showBg?: boolean;
  onClick?: () => void;
  onSrcUrlChange?: (newUrl: string, fileId: string) => void;
  processImageFn?: (e: React.ChangeEvent<HTMLInputElement>) => Promise<string>;
  imageUploadClass?: string;
}) => {
  const [loading, setLoading] = useState(false);
  const loadingLabel = useRef<HTMLDivElement>(null);

  return (
    <div
      className={cn(
        "group/update relative cursor-pointer rounded-full",
        className,
      )}
      style={{ width: size, height: size }}
    >
      <Avatar
        src={src}
        size={size}
        className={avatarClassName}
        onClick={onClick}
      />

      {showBg ? (
        <div className="theme-color-Animation absolute inset-0 flex items-center justify-center rounded-full bg-theme-color opacity-20 group-hover/update:flex"></div>
      ) : null}

      {loading ? (
        <>
          <div className="theme-color-Animation absolute inset-0 flex items-center justify-center rounded-full bg-theme-color text-white opacity-70 group-hover/update:flex"></div>
          <div className="absolute inset-0 flex items-center justify-center text-white">
            <div
              className="absolute inset-0 flex items-center justify-center font-semibold"
              ref={loadingLabel}
            >
              0%
            </div>
            <div className="text-white">
              {Svg("loading", { width: "90", height: "90", strokeWidth: 1.5 })}
            </div>
          </div>
        </>
      ) : (
        <>
          <FileUploadIndicator
            indicatorClass={cn("bottom-3 right-[12%]", imageUploadClass)}
          />

          <input
            onChange={async (e) => {
              setLoading(true);
              try {
                if (processImageFn) setSrc(await processImageFn(e));
                if (!e.target.files) return;
                const a = await uploadFileToServer(
                  Array.from(e.target.files),
                  (status: FileUploadStatus) => {
                    const label = loadingLabel.current;
                    if (status.status === "UPLOADING" && label)
                      label.textContent = `${status.percentage}%`;
                  },
                );
                if (a.length && a[0].url !== "failed") {
                  setSrc(a[0].url);
                  if (onSrcUrlChange) onSrcUrlChange(a[0].url, a[0].fileId);
                }
              } finally {
                setLoading(false);
              }

              (e.target as any).value = null; // TypeScript will not complain about this
            }}
            className="absolute inset-0 cursor-pointer rounded-full opacity-0"
            type="file"
            accept="image/*"
            name=""
            id=""
          />
        </>
      )}
    </div>
  );
};

export default AvatarUpdatable;
