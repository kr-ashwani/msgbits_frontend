import React from "react";
import Image from "next/image";

const UserAvatar = ({ src, size }: { src: string; size: number }) => {
  return (
    <div
      className="shrink-0 rounded-[50%]"
      style={{ width: `${size}px`, height: `${size}px` }}
    >
      <Image
        className="rounded-[50%] object-cover object-center"
        src={`${src}`}
        width={size}
        height={size}
        alt="user Avatar Image"
      />
    </div>
  );
};

export default UserAvatar;
