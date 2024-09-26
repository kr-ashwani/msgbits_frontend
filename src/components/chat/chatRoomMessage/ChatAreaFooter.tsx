import { ChatSvg } from "@/components/svg/chatSvg";
import { MessageSvg } from "@/components/svg/MessageSvg";
import { useChatService } from "@/hooks/chat/useChatService";
import { useGetEmojiPickerHeight } from "@/hooks/useGetEmojiPickerHeight";
import EmojiPicker from "./EmojiPicker";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useChatInputMessageState } from "@/hooks/AppSelector/useChatInputMessageState";
import { useCacheInputMessage } from "@/hooks/chat/useCacheInputMessage";
import debounce from "lodash/debounce";
import { useSelectedChatState } from "@/hooks/AppSelector/useSelectedChatState";
import TypingStatus from "./TypingStatus";
import { useChatRoomDataDispatch } from "@/hooks/AppDispatcher/useChatRoomDataDispatch";
import { useAppSelector } from "@/lib/store/hooks";

const TYPING_DEBOUNCE_DELAY = 500; //  500 msecond

const ChatAreaFooter = () => {
  const messageDiv = useRef<HTMLDivElement>(null);
  const [message, setMessage] = useState<string>("");
  const typingStartedRef = useRef(false); // Ref to track typing state
  const chatService = useChatService();
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const pickerHeight = useGetEmojiPickerHeight();
  const enterToSendMsg = useAppSelector(
    (state) => state.chat.setting.enterToSendMessage,
  );
  const chatInputMessageState = useChatInputMessageState();
  useCacheInputMessage(message);
  const selectedChat = useSelectedChatState();
  const footerRef = useRef<HTMLDivElement>(null);
  const typingRef = useRef<HTMLDivElement>(null);
  const repliedMsgState = useAppSelector(
    (state) => state.chat.chatRoomData.repliedToMessage,
  );
  const chatRoomDataDispatch = useChatRoomDataDispatch();

  // Create a memoized version of the typing indicator function
  const sendTypingIndicator = useCallback(() => {
    chatService.sendTypingIndicator();
  }, [chatService]);

  // Create a stable reference to the debounced function
  const debouncedTypingEventRef = useRef(
    debounce(sendTypingIndicator, TYPING_DEBOUNCE_DELAY),
  );
  // Update the debounced function when sendTypingIndicator changes
  useEffect(() => {
    debouncedTypingEventRef.current = debounce(
      sendTypingIndicator,
      TYPING_DEBOUNCE_DELAY,
    );
  }, [sendTypingIndicator]);

  useEffect(() => {
    // Cleanup function to cancel any pending debounced calls when the component unmounts
    // eslint-disable-next-line react-hooks/exhaustive-deps
    return () => debouncedTypingEventRef.current.cancel();
  }, []);

  const handleStartTyping = useCallback(
    (newMessage: string) => {
      // Emit typing event immediately on the first character typed
      if (!typingStartedRef.current && newMessage.length > 0) {
        typingStartedRef.current = true; // Mark that typing has started
        chatService.sendTypingIndicator(); // Emit event immediately for first typing
      }
    },
    [chatService],
  );

  const toggleEmojiPicker = useCallback(() => {
    setShowEmojiPicker((prev) => !prev);
  }, []);

  const handleEmojiSelect = useCallback(
    (emoji: { native: string }) => {
      setMessage((prevText) => prevText + emoji.native);
      if (messageDiv.current) {
        messageDiv.current.innerText += emoji.native;
        handleStartTyping(messageDiv.current.innerText);
        // Debounce subsequent typing events
        debouncedTypingEventRef.current();
      }
    },
    [handleStartTyping],
  );

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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" && !e.shiftKey && enterToSendMsg) {
      e.preventDefault();
      sendMessage();
    }
  };

  const updateMessage = useCallback(
    function updateMessage(msg: string = "") {
      setMessage(msg);
      if (messageDiv.current) messageDiv.current.innerText = msg;
    },
    [setMessage],
  );

  function sendMessage() {
    const chatRoomId = selectedChat.getSelectedChatId();
    if (!messageDiv.current || !chatRoomId) return;
    messageDiv.current.focus();

    if (!message.trim()) return updateMessage();
    chatService.sendNewTextMessage(
      message.trim(),
      repliedMsgState[chatRoomId] || null,
    );
    chatRoomDataDispatch.resetRepliedToMessage({
      chatRoomId,
    });
    updateMessage();
  }

  const handleInput = useCallback(
    (e: React.FormEvent<HTMLDivElement>) => {
      const newMessage = e.currentTarget.innerText;
      setMessage(newMessage);
      handleStartTyping(newMessage);
      // Debounce subsequent typing events
      debouncedTypingEventRef.current();
    },
    [handleStartTyping],
  );

  useEffect(() => {
    updateMessage(chatInputMessageState.getSelectedChatMessage());
  }, [chatInputMessageState, updateMessage]);

  useEffect(() => {
    typingStartedRef.current = false;
  }, [selectedChat]);

  useEffect(() => {
    if (!footerRef.current) return;

    const adjustHeightOfTyping = () => {
      if (typingRef.current && footerRef.current) {
        typingRef.current.style.top = "0px";
      }
    };

    // Initial adjustment
    adjustHeightOfTyping();

    // Create a ResizeObserver
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        if (entry.target === footerRef.current) {
          adjustHeightOfTyping();
        }
      }
    });

    // Start observing the chat view
    resizeObserver.observe(footerRef.current);

    // Clean up
    return () => {
      if (footerRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        resizeObserver.unobserve(footerRef.current);
      }
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div
      ref={footerRef}
      className="relative z-[2] shrink-0 border-t-[1px] border-border-color"
    >
      <div className="flex items-center gap-3 bg-theme-bg-color p-3 px-4 lg:gap-4 lg:px-8">
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
            className={`text-gray-400 absolute inset-0 cursor-text select-none items-center p-4 align-middle font-medium ${
              message ? "hidden" : "flex"
            }`}
            onClick={() => messageDiv.current?.focus()}
          >
            Type a message...
          </div>
          <div
            ref={messageDiv}
            className="inputMessage rounded-md border-none bg-input-bg p-3 text-[17px] font-medium outline-none"
            contentEditable="true"
            onInput={handleInput}
            onKeyDown={handleKeyDown}
          ></div>
        </div>

        <div className="cursor-pointer text-theme-color" onClick={sendMessage}>
          {ChatSvg("msgSend")}
        </div>
      </div>

      <div ref={typingRef} className="absolute inset-0 z-[-1] select-none">
        <TypingStatus />
      </div>
    </div>
  );
};

export default ChatAreaFooter;
