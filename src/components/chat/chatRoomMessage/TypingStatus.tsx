import Avatar from "@/components/utility/Avatar";
import { useChatTypingStatusState } from "@/hooks/AppSelector/useChatTypingStatusState";
import { useSelectedChatState } from "@/hooks/AppSelector/useSelectedChatState";
import { IUser } from "@/schema/userSchema";
import React, { useMemo, useRef } from "react";
import TypingIndicator from "./TypingIndicator";

const TypingStatus = () => {
  const typingStatus = useChatTypingStatusState();
  const selectedChat = useSelectedChatState();
  const statusRef = useRef<{ user: IUser | null; message: string }>({
    message: "",
    user: null,
  });
  const status = useMemo(() => {
    const member = typingStatus.getUser(selectedChat.getSelectedChatId() ?? "");

    if (!member) return null;
    const message =
      member.userName === "You"
        ? "You are typing"
        : `${member.userName} is typing`;

    return { message, user: member.user };
  }, [typingStatus, selectedChat]);

  if (status) {
    statusRef.current.message = status.message;
    statusRef.current.user = status.user;
  }

  return (
    <div
      className={`absolute inset-0 flex select-none items-start transition-all duration-500 ${status?.message ? "opacity-1 translate-y-[-35px]" : "translate-y-0 opacity-25"}`}
    >
      {statusRef.current.user ? (
        <div className="rounded-typing-status-radius relative flex w-auto items-center bg-chat-bg px-4 py-[5px] pr-8">
          <div className="rounded-typing-status-radius absolute inset-0 bg-theme-color opacity-[0.08]"></div>
          <Avatar src={statusRef.current.user.profilePicture} size={25} />
          <div className="p-1 pl-3 pr-2 text-sm font-semibold text-msg-message">
            {statusRef.current.message}
          </div>
          <TypingIndicator className="mt-[8px]" />
        </div>
      ) : null}
    </div>
  );
};

export default TypingStatus;
