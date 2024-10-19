import Avatar from "@/components/utility/Avatar";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import React from "react";
import UserStatusIndicator from "./UserStatusIndicator";

const StatusAvatar = ({
  userId,
  src,
  size,
  className = "",
  indicatorClass = "",
  onClick,
}: {
  src: string | StaticImport;
  userId: string | null;
  size: number;
  className?: string;
  indicatorClass?: string;
  onClick?: (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => void;
}) => {
  return (
    <div className="relative">
      <Avatar src={src} size={size} className={className} onClick={onClick} />
      <UserStatusIndicator userId={userId} indicatorClass={indicatorClass} />
    </div>
  );
};

export default StatusAvatar;
