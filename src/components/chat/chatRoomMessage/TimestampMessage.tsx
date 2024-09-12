import { MessageState } from "@/hooks/AppSelector/useMessageState";
import React from "react";
import { format, isThisWeek, isToday, isYesterday } from "date-fns";

function capitalize(str: string): string {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}
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
    <div className="w-full py-2 text-center text-[13px] font-semibold text-msg-message">
      {capitalize(formatDate(messageState.getRawMessage()?.createdAt || ""))}
    </div>
  );
};

export default TimestampMessage;
