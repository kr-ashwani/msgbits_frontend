import { ChatSvg } from "@/components/svg/chatSvg";
import { useImagePreview } from "@/context/ImagePreviewContext";
import ImagePreviewCarousel from "./ImagePreviewCarousel";

const ImagePreviewDrawer = () => {
  const { imagePreview, setImagePreview } = useImagePreview();

  return (
    <div
      className={`absolute inset-0 z-[2] flex transition-transform duration-300 ${imagePreview.images.length ? "translate-y-0" : "translate-y-full"} flex-col bg-chat-bg`}
    >
      <div className="flex items-center border-b-[1px] border-border-color bg-chat-bg py-3">
        <div
          className="ml-[-8px] cursor-pointer pl-3"
          onClick={() => setImagePreview({ images: [], initialImageCursor: 0 })}
        >
          {ChatSvg("backArrow")}
        </div>

        <p className="pl-1 text-xl font-semibold">Image Preview</p>
      </div>
      {imagePreview.images.length ? (
        <>
          <ImagePreviewCarousel />
        </>
      ) : null}
    </div>
  );
};

export default ImagePreviewDrawer;
