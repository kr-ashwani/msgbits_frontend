import { ChatSvg } from "@/components/svg/chatSvg";
import { MessageSvg } from "@/components/svg/MessageSvg";
import { useMessageService } from "@/hooks/chat/useMessageService";
import { useGetEmojiPickerHeight } from "@/hooks/useGetEmojiPickerHeight";
import EmojiPicker from "@emoji-mart/react";
import React, { useCallback, useRef, useState } from "react";

const ChatAreaFooter = () => {
  const messageDiv = useRef<HTMLDivElement>(null);
  const [message, setMessage] = useState<string>("");
  const messageService = useMessageService();
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const pickerHeight = useGetEmojiPickerHeight();

  function sendMessage(message: string) {
    if (!messageDiv.current) return;
    messageDiv.current.focus();

    if (!message.trim()) return setMessage("");
    setMessage("");
    messageDiv.current.innerText = "";
    messageService.sendNewTextMessage(message.trim());
  }

  const toggleEmojiPicker = useCallback(() => {
    setShowEmojiPicker((prev) => !prev);
  }, []);

  const handleEmojiSelect = useCallback((emoji: { native: string }) => {
    setMessage((prevText) => prevText + emoji.native);
    if (messageDiv.current) messageDiv.current.innerText += emoji.native;
  }, []);

  const focusAtEnd = useCallback(() => {
    if (!messageDiv.current) return;
    const element = messageDiv.current;
    element.focus();

    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(element);
    range.collapse(false);
    selection?.removeAllRanges();
    selection?.addRange(range);
  }, []);

  return (
    <div className="flex shrink-0 items-center gap-3 border-t-[1px] border-border-color p-3 px-4 lg:gap-4 lg:px-8">
      <div className="relative cursor-pointer">
        {showEmojiPicker ? (
          <div
            className="absolute bottom-16"
            onClick={(e) => {
              focusAtEnd();
              e.stopPropagation();
            }}
            style={{ height: `${pickerHeight}px`, overflow: "hidden" }}
          >
            <EmojiPicker
              onEmojiSelect={handleEmojiSelect}
              onClickOutside={() => setShowEmojiPicker(false)}
              theme="light"
              set="facebook"
              emojiSize={25}
              perLine={8}
            />
          </div>
        ) : null}
        <div onClick={toggleEmojiPicker}>{ChatSvg("emoteIcon")}</div>
      </div>
      <div className="cursor-pointer">{MessageSvg("ImageAttachment")}</div>
      <div className="cursor-pointer">{ChatSvg("attachment")}</div>
      <div className="relative max-h-28 grow overflow-y-auto overflow-x-hidden">
        <div
          className={`text-gray-400 absolute inset-0 select-none items-center p-4 align-middle font-medium ${message ? "hidden" : "flex"}`}
          onClick={() => messageDiv.current?.focus()}
        >
          Type a message...
        </div>
        <div
          ref={messageDiv}
          className="inputMessage rounded-md border-none bg-input-bg p-3 text-[17px] font-medium outline-none"
          contentEditable="true"
          onInput={(e) => setMessage(e.currentTarget.innerText)}
        ></div>
      </div>

      <div
        className="cursor-pointer text-theme-color"
        onClick={() => sendMessage(message)}
      >
        {ChatSvg("msgSend")}
      </div>
    </div>
  );
};

export default ChatAreaFooter;
