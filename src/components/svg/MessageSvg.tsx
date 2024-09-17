import React from "react";

interface ChatSvgOpts {
  type:
    | "ImageAttachment"
    | "msgPending"
    | "msgSent"
    | "msgDelivered"
    | "msgSeen";
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
  if (type === "msgPending")
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={opts.width ? opts.width : "23"}
        height={opts.height ? opts.height : "23"}
        viewBox="0 0 1024 1024"
        stroke="currentColor"
        fill="currentColor"
        version="1.1"
      >
        <path
          d="M511.9 183c-181.8 0-329.1 147.4-329.1 329.1s147.4 329.1 329.1 329.1c181.8 0 329.1-147.4 329.1-329.1S693.6 183 511.9 183z m0 585.2c-141.2 0-256-114.8-256-256s114.8-256 256-256 256 114.8 256 256-114.9 256-256 256z"
          // fill="#0F1F3C"
        />
        <path
          d="M548.6 365.7h-73.2v161.4l120.5 120.5 51.7-51.7-99-99z"
          // fill="#0F1F3C"
        />
      </svg>
    );
  if (type === "msgSent")
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={opts.width ? opts.width : "15"}
        height={opts.height ? opts.height : "15"}
        viewBox="0 0 512 512"
        stroke="currentColor"
        fill="currentColor"
      >
        <path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-111 111-47-47c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l64 64c9.4 9.4 24.6 9.4 33.9 0L369 209z" />
      </svg>
    );
  if (type === "msgDelivered")
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        width={opts.width ? opts.width : "16"}
        height={opts.height ? opts.height : "16"}
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path d="M2.305,11.235a1,1,0,0,1,1.414.024l3.206,3.319L14.3,7.289A1,1,0,0,1,15.7,8.711l-8.091,8a1,1,0,0,1-.7.289H6.9a1,1,0,0,1-.708-.3L2.281,12.649A1,1,0,0,1,2.305,11.235ZM20.3,7.289l-7.372,7.289-.263-.273a1,1,0,1,0-1.438,1.39l.966,1a1,1,0,0,0,.708.3h.011a1,1,0,0,0,.7-.289l8.091-8A1,1,0,0,0,20.3,7.289Z" />
      </svg>
    );
  if (type === "msgSeen")
    return (
      <svg
        fill="currentColor"
        className="___12fm75w f1w7gpdv fez10in fg4l7m0"
        aria-hidden="true"
        width={opts.width ? opts.width : "16"}
        height={opts.height ? opts.height : "16"}
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M3.26 11.6A6.97 6.97 0 0 1 10 6c3.2 0 6.06 2.33 6.74 5.6a.5.5 0 0 0 .98-.2A7.97 7.97 0 0 0 10 5a7.97 7.97 0 0 0-7.72 6.4.5.5 0 0 0 .98.2ZM9.99 8a3.5 3.5 0 1 1 0 7 3.5 3.5 0 0 1 0-7Z"
          fill="currentColor"
        ></path>
      </svg>
    );
};
