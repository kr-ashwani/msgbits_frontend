import React, { useEffect, useState } from "react";
import Avatar from "./Avatar";
import { ChatSvg } from "../svg/chatSvg";
import { cn } from "@/lib/utils";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Svg from "../svg";

const AvatarUpdatable = ({
  src,
  size,
  className = "",
  avatarClassName = "",
  onClick,
  processImageFn,
}: {
  src: string | StaticImport;
  size: number;
  className?: string;
  avatarClassName?: string;
  onClick?: () => void;
  processImageFn?: (e: React.ChangeEvent<HTMLInputElement>) => Promise<string>;
}) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setImgSrc(src);
  }, [src]);

  return (
    <div
      className={cn(
        "group/update relative cursor-pointer rounded-full",
        className,
      )}
      style={{ width: size, height: size }}
    >
      <Avatar
        src={imgSrc}
        size={size}
        className={avatarClassName}
        onClick={onClick}
      />

      <div className="absolute inset-0 flex items-center justify-center rounded-full bg-theme-color opacity-40 group-hover/update:flex"></div>

      {loading ? (
        <div className="absolute inset-0 flex items-center justify-center text-xl font-bold text-white">
          {Svg("loading", { width: "60", height: "60" })}
        </div>
      ) : (
        <>
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 rounded-full text-white group-hover/update:flex">
            {ChatSvg("cameraIcon")}
            <p className="font-bold">Change Picture</p>
          </div>

          <input
            onChange={async (e) => {
              setLoading(true);
              try {
                if (processImageFn) setImgSrc(await processImageFn(e));
              } finally {
                setLoading(false);
              }
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