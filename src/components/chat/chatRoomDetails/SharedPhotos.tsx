import { SafeImage } from "@/components/utility/SafeImage";
import { useImagePreviewDispatch } from "@/hooks/AppDispatcher/useImagePreviewDispatch";
import { useMessageState } from "@/hooks/AppSelector/useMessageState";
import { ImagePreview } from "@/lib/store/features/chat/chatRoomDataSlice";
import { useAppSelector } from "@/lib/store/hooks";
import { IFileMessage } from "@/schema/MessageSchema";
import { Image } from "lucide-react";
import React, { useMemo } from "react";

const MAX_PHOTOS_TO_SHOW_IN_GRID = 8;

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
  const imagePreviewDispatch = useImagePreviewDispatch();

  const renderPhotos = imageMessages.slice(0, MAX_PHOTOS_TO_SHOW_IN_GRID);

  if (!imageMessages.length) return null;

  function showImagePreview(photoIndex: number) {
    const imagePreview = imageMessages.map<ImagePreview>((pic) => ({
      url: pic.file.url,
      fileId: pic.file.fileId,
    }));

    imagePreviewDispatch.setImagePreview({
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
      <div className="grid grid-cols-4 gap-1.5">
        {renderPhotos.map((msg, index) => (
          <SafeImage
            onClick={() => showImagePreview(index)}
            key={msg.messageId}
            src={msg.file.url}
            alt=""
            width={180}
            height={180}
            style={{ objectFit: "cover" }}
            className="aspect-square h-full w-full cursor-pointer rounded-lg object-cover object-center"
          />
        ))}
      </div>
      {imageMessages.length > MAX_PHOTOS_TO_SHOW_IN_GRID ? (
        <div
          onClick={() => showImagePreview(MAX_PHOTOS_TO_SHOW_IN_GRID)}
          className="cursor-pointer self-center px-5 text-[15px] font-semibold text-theme-color"
        >
          View More
        </div>
      ) : null}
    </div>
  );
};

export default SharedPhotos;
