import React from "react";

interface ChatSvgOpts {
  type: "ImageAttachment";
  width: string;
  height: string;
  fill: string;
}

export const MessageSvg = (
  type: ChatSvgOpts["type"],
  opts: Partial<Omit<ChatSvgOpts, "type">> = {},
) => {
  if (type === "ImageAttachment")
    return (
      <svg
        width={opts.width ? opts.width : "24"}
        height={opts.height ? opts.height : "24"}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
        <circle cx="8.5" cy="8.5" r="1.5"></circle>
        <path d="M21 15l-5-5L5 21"></path>
      </svg>
    );
};
