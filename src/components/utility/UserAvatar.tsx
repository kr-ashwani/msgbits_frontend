import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const UserAvatar = ({
  src,
  size,
  className = "",
  onClick,
}: {
  src: string;
  size: number;
  className?: string;
  onClick?: () => void;
}) => {
  return (
    <div
      className={cn("shrink-0 rounded-[50%]", className)}
      style={{ width: `${size}px`, height: `${size}px` }}
    >
      <Image
        className="rounded-[50%] object-cover object-center"
        src={`${src}`}
        width={size}
        onClick={onClick}
        height={size}
        alt="user Avatar Image"
      />
    </div>
  );
};

export default UserAvatar;
