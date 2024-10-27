import { SafeImage } from "@/components/utility/SafeImage";
import { MessageState } from "@/hooks/AppSelector/useMessageState";
import { cn } from "@/lib/utils";
import { IFileMessage, IMessage } from "@/schema/MessageSchema";
import { capitalizeStr } from "@/utils/custom/capitalizeStr";
import React, { ReactNode, useCallback, useEffect, useRef } from "react";

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

  if (rawMessage.type === "file")
    return (
      <div className="max-w-52 text-sm font-semibold text-msg-message">
        <div className="truncate">
          {rawMessage?.message || rawMessage?.file.fileName}
        </div>
      </div>
    );
}

function renderFileMessageLogo(fileMessage: IFileMessage): ReactNode {
  const file = fileMessage.file;

  if (file.dimension && file.fileType.includes("image/")) {
    return (
      <div className="relative w-11 rounded-lg">
        <SafeImage
          src={file.url}
          alt={file.fileName}
          fill
          className="rounded-lg object-cover"
        />
      </div>
    );
  }

  return null;
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
        "relative flex h-full grow cursor-pointer overflow-hidden rounded-xl bg-theme-bg-color p-3 pl-6",
        className,
      )}
      onClick={() => scrollToMessage(rawMessage?.messageId || "")}
    >
      <div
        className={`flex ${rawMessage?.type === "file" ? "shrink gap-3" : "w-0"} grow`}
      >
        <div className={`grow truncate`}>
          <div
            className="absolute bottom-0 left-0 top-0 w-[5px]"
            style={{
              backgroundColor: senderUser?.profileColor,
            }}
          ></div>
          <div
            className="truncate font-semibold"
            style={{
              color: senderUser?.profileColor,
            }}
          >
            {capitalizeStr(senderUser?.name || "")}
          </div>
          {repliedMessageComp(repliedMessage, rawMessage)}
        </div>
        {rawMessage?.type === "file" ? renderFileMessageLogo(rawMessage) : null}
      </div>
    </div>
  );
};

export default RepliedToMessage;
