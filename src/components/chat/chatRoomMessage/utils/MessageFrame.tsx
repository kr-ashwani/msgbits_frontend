import React from "react";

const MessageFrame = ({
  renderAvatar,
  renderMessageFrame,
  selfMessage,
  showAvatar,
  msgId,
}: {
  renderAvatar: () => React.ReactNode;
  renderMessageFrame: () => React.ReactNode;
  selfMessage: boolean;
  showAvatar: boolean;
  msgId: string;
}) => {
  return (
    <div
      key={msgId}
      id={msgId}
      className={`relative flex w-full gap-1 ${selfMessage ? "flex-row-reverse gap-[6px]" : "md:gap-3"} ${
        showAvatar ? "mt-[8px]" : ""
      }`}
    >
      <div className="highlighter theme-color-Animation pointer-events-none absolute inset-0 touch-none select-none bg-theme-color opacity-0 transition-opacity duration-300"></div>
      {renderAvatar()}
      {renderMessageFrame()}
    </div>
  );
};

export default MessageFrame;
