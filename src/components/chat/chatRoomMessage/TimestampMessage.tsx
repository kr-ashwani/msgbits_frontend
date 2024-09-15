import { MessageState } from "@/hooks/AppSelector/useMessageState";
import React from "react";
import { format, isThisWeek, isToday, isYesterday } from "date-fns";
import { capitalizeStr } from "@/utils/custom/capitalizeStr";

function formatDate(date: string | number | Date): string {
  try {
    if (isToday(date)) {
      return "today";
    } else if (isYesterday(date)) {
      return "yesterday";
    } else if (isThisWeek(date)) {
      return format(date, "EEEE");
    } else {
      return format(date, "dd MMMM yyyy");
    }
  } catch (err) {
    return "NA";
  }
}

const TimestampMessage = ({ messageState }: { messageState: MessageState }) => {
  return (
    <div className="mt-[6px] w-full truncate pt-[2px] text-center text-[13px] font-semibold text-msg-message">
      {capitalizeStr(formatDate(messageState.getRawMessage()?.createdAt || ""))}
    </div>
  );
};

export default TimestampMessage;
