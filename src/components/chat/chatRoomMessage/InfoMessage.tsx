import { MessageState } from "@/hooks/AppSelector/useMessageState";
import React from "react";

const InfoMessage = ({ messageState }: { messageState: MessageState }) => {
  return (
    <div className="mt-[6px] w-full truncate px-10 pt-[2px] text-center text-[13px] font-semibold text-msg-message">
      {messageState.getMessageText()}
    </div>
  );
};

export default InfoMessage;
