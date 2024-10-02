import React, { useEffect } from "react";
import { FilesPreviewCarousel } from "./FilesPreviewCarousel";
import { useFiles } from "./ChatAreaFooter";
import { ChatSvg } from "@/components/svg/chatSvg";
import FilesPreviewFooter from "./FilesPreviewFooter";
import { useAppSelector } from "@/lib/store/hooks";

const FilesPreviewDrawer = () => {
  const { files, setFiles } = useFiles();
  const selectedChat = useAppSelector((state) => state.chat.selectedChat);

  useEffect(() => {
    setFiles([]);
  }, [selectedChat.id, setFiles]);

  return (
    <div
      className={`absolute inset-0 z-[2] flex transition-transform duration-300 ${files.length && selectedChat.id ? "translate-y-0" : "translate-y-full"} flex-col bg-chat-bg`}
    >
      <div className="flex items-center border-b-[1px] border-border-color bg-chat-bg py-3">
        <div
          className="ml-[-8px] cursor-pointer pl-3"
          onClick={() => setFiles([])}
        >
          {ChatSvg("backArrow")}
        </div>

        <p className="pl-1 text-xl font-semibold">Files Preview</p>
      </div>
      {files.length && selectedChat.id ? (
        <>
          <FilesPreviewCarousel />
          <FilesPreviewFooter />
        </>
      ) : null}
    </div>
  );
};

export default FilesPreviewDrawer;
