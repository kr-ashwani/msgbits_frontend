import { SafeImage } from "@/components/utility/SafeImage";
import { ImagePreview, useImagePreview } from "@/context/ImagePreviewContext";
import { useMessageState } from "@/hooks/AppSelector/useMessageState";
import { useAppSelector } from "@/lib/store/hooks";
import { IFileMessage } from "@/schema/MessageSchema";
import { Image } from "lucide-react";
import React, { useMemo } from "react";

const SharedPhotos = () => {
  const selectedChatId = useAppSelector((state) => state.chat.selectedChat.id);
  const messageState = useMessageState();
  const imageMessages = useMemo(() => {
    const photosMesssage: IFileMessage[] = [];
    if (!selectedChatId) return photosMesssage;
    messageState.getMessagesOfChatRoom(selectedChatId).forEach((msg) => {
      const rawMsg = msg.getRawMessage();
      if (!rawMsg) return;
      if (rawMsg.type === "file" && rawMsg.file.fileType.includes("image/"))
        photosMesssage.push(rawMsg);
    });

    return photosMesssage;
  }, [messageState, selectedChatId]);
  const { setImagePreview } = useImagePreview();

  const renderPhotos = imageMessages.slice(0, 12);

  if (!imageMessages.length) return null;

  function showImagePreview(photoIndex: number) {
    const imagePreview = imageMessages.map<ImagePreview>((pic) => ({
      url: pic.file.url,
      fileId: pic.file.fileId,
    }));

    setImagePreview({
      images: imagePreview,
      initialImageCursor: photoIndex,
    });
  }
  return (
    <div className="flex flex-col gap-5 px-5 pt-3">
      <div className="flex items-center gap-3 font-semibold text-detail-font-color">
        {/* eslint-disable-next-line jsx-a11y/alt-text */}
        <Image size={20} />
        <p>Shared photos</p>
      </div>
      <div className="grid-cols-4-65 grid max-w-[400px] auto-rows-[65px] gap-x-1.5 gap-y-1.5">
        {renderPhotos.map((msg, index) => (
          <SafeImage
            onClick={() => showImagePreview(index)}
            key={msg.messageId}
            src={msg.file.url}
            alt=""
            width={80}
            height={80}
            style={{ objectFit: "cover" }}
            className="h-full w-full cursor-pointer rounded-lg object-cover object-center"
          />
        ))}
      </div>
      {imageMessages.length > 12 ? (
        <div
          onClick={() => showImagePreview(12)}
          className="cursor-pointer self-center px-5 text-[15px] font-semibold text-theme-color"
        >
          View More
        </div>
      ) : null}
    </div>
  );
};

export default SharedPhotos;
