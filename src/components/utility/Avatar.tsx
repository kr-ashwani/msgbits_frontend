import React from "react";
import { cn } from "@/lib/utils";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { SafeImage } from "./SafeImage";

const Avatar = ({
  src,
  size,
  className = "",
  onClick,
}: {
  src: string | StaticImport;
  size: number;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => void;
}) => {
  return (
    <div
      className={cn("shrink-0 rounded-full", className)}
      style={{ width: `${size}px`, height: `${size}px` }}
    >
      <SafeImage
        className="h-full w-full rounded-full object-cover object-center"
        src={src}
        height={size}
        width={size}
        onClick={onClick}
        alt="user Avatar Image"
      />
    </div>
  );
};

export default Avatar;
