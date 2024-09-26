import { MessageState } from "@/hooks/AppSelector/useMessageState";
import { cn } from "@/lib/utils";
import { IMessage } from "@/schema/MessageSchema";
import { capitalizeStr } from "@/utils/custom/capitalizeStr";
import React, { useCallback, useEffect, useRef } from "react";

function repliedMessageComp(
  messageState: MessageState | null,
  rawMessage: IMessage | null,
): React.ReactNode {
  if (!rawMessage || !messageState) return null;

  if (rawMessage.type === "text")
    return (
      <div className="truncate text-sm font-semibold text-msg-message">
        {rawMessage?.message}
      </div>
    );
}

const RepliedToMessage = ({
  repliedMessage,
  className = "",
}: {
  repliedMessage: MessageState | null;
  className?: string;
}) => {
  const rawMessage = repliedMessage?.getRawMessage() || null;
  const senderUser = repliedMessage?.getSenderUser() || null;

  const observerRef = useRef<IntersectionObserver | null>(null);

  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const element = entry.target;
        if (!element) return;

        const [highlighter] = Array.from(
          element.getElementsByClassName("highlighter"),
        ) as HTMLElement[];
        setTimeout(() => {
          if (highlighter) highlighter.style.opacity = "0.08";
        }, 200);
        setTimeout(() => {
          if (highlighter) highlighter.style.opacity = "0";
        }, 1000);
        observerRef.current?.unobserve(element);
      });
    },
    [],
  );

  useEffect(() => {
    observerRef.current = new IntersectionObserver(handleIntersection, {
      threshold: 0.01,
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [handleIntersection]);

  const scrollToMessage = useCallback((messageId: string) => {
    const messageElement = document.getElementById(messageId);
    const scrollContainer = messageElement?.closest(
      ".chat-scroll-container",
    ) as HTMLElement;

    if (messageElement && scrollContainer) {
      const containerRect = scrollContainer.getBoundingClientRect();
      const messageRect = messageElement.getBoundingClientRect();
      const relativeTop = messageRect.top - containerRect.top;
      const scrollTop =
        scrollContainer.scrollTop +
        relativeTop -
        scrollContainer.clientHeight / 2;

      scrollContainer.scrollTo({
        top: scrollTop,
        behavior: "smooth",
      });

      observerRef.current?.observe(messageElement);
    }
  }, []);

  return (
    <div
      className={cn(
        "relative h-full grow cursor-pointer overflow-hidden rounded-xl bg-theme-bg-color p-3 pl-6",
        className,
      )}
      onClick={() => scrollToMessage(rawMessage?.messageId || "")}
    >
      <div
        className="absolute bottom-0 left-0 top-0 w-[5px]"
        style={{
          backgroundColor: senderUser?.profileColor,
        }}
      ></div>
      <div
        className="font-semibold"
        style={{
          color: senderUser?.profileColor,
        }}
      >
        {capitalizeStr(senderUser?.name || "")}
      </div>
      {repliedMessageComp(repliedMessage, rawMessage)}
    </div>
  );
};

export default RepliedToMessage;
