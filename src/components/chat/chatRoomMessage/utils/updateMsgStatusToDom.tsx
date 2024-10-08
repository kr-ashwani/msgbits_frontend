import { MessageSvg } from "@/components/svg/MessageSvg";
import ReactDOMServer from "react-dom/server";

export interface MsgStatus {
  lastPendingMsg: string | null;
  lastSentMsg: string | null;
  lastDeliveredMsg: string | null;
  lastSeenMsg: string | null;
}

export const resetMsgStatus = (): MsgStatus => {
  return {
    lastPendingMsg: null,
    lastSentMsg: null,
    lastDeliveredMsg: null,
    lastSeenMsg: null,
  };
};

type Status = "msgPending" | "msgSent" | "msgDelivered" | "msgSeen";

export function updateMsgStatusToDom(
  msgStatus: MsgStatus,
  action: "show" | "hide",
) {
  //pending
  updateDom(msgStatus.lastPendingMsg, "msgPending", action);
  //sent
  updateDom(msgStatus.lastSentMsg, "msgSent", action);
  //delivered
  updateDom(msgStatus.lastDeliveredMsg, "msgDelivered", action);
  //seen
  updateDom(msgStatus.lastSeenMsg, "msgSeen", action);
}

function updateDom(
  messageId: string | null,
  status: Status,
  action: "show" | "hide",
) {
  if (messageId) {
    const msgElem = document.getElementById(messageId);
    if (!msgElem) return;

    const [statusElem] = Array.from(
      msgElem.getElementsByClassName("status"),
    ) as HTMLElement[];

    if (statusElem)
      statusElem.innerHTML =
        action === "show"
          ? ReactDOMServer.renderToString(
              <div className="absolute">{MessageSvg(status)}</div>,
            )
          : "";
  }
}
