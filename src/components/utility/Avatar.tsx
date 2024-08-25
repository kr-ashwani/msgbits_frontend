import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

const Avatar = ({
  src,
  size,
  className = "",
  onClick,
}: {
  src: string | StaticImport;
  size: number;
  className?: string;
  onClick?: () => void;
}) => {
  return (
    <div
      className={cn("shrink-0 rounded-full", className)}
      style={{ width: `${size}px`, height: `${size}px` }}
    >
      <Image
        className="h-full w-full rounded-full object-cover object-center"
        src={src}
        width={size}
        onClick={onClick}
        height={size}
        alt="user Avatar Image"
      />
    </div>
  );
};

export default Avatar;