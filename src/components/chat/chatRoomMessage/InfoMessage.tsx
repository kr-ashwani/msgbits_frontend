import { MessageState } from "@/hooks/AppSelector/useMessageState";
import React from "react";

const InfoMessage = ({ messageState }: { messageState: MessageState }) => {
  return (
    <div className="w-full py-2 text-center text-[13px] font-semibold text-msg-message">
      {messageState.getMessageText()}
    </div>
  );
};

export default InfoMessage;
