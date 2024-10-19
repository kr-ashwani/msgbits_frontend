import ImagePreviewDrawer from "@/components/chat/chatRoomMessage/ImagePreviewDrawer";
import React, { ReactNode, useCallback, useState } from "react";

export interface ImagePreview {
  url: string;
  fileId: string;
}
export interface ImagePreviewState {
  images: ImagePreview[];
  initialImageCursor: number;
}
interface ImagePreviewContextProps {
  imagePreview: ImagePreviewState;
  setImagePreview: React.Dispatch<React.SetStateAction<ImagePreviewState>>;
  setSingleImagePreview: (imageUrl: string) => void;
}

export function useImagePreview() {
  const context = React.useContext(ImagePreviewContext);

  if (!context) {
    throw new Error("useImagePreview must be used within a <ChatFooterArea />");
  }

  return context;
}

const ImagePreviewContext =
  React.createContext<ImagePreviewContextProps | null>(null);

export const ImagePreviewProvider = ({ children }: { children: ReactNode }) => {
  const [imagePreview, setImagePreview] = useState<ImagePreviewState>({
    images: [],
    initialImageCursor: 0,
  });

  const setSingleImagePreview = useCallback((imageUrl: string) => {
    setImagePreview({
      images: [
        {
          url: imageUrl,
          fileId: "xxxNULLxxx",
        },
      ],
      initialImageCursor: 0,
    });
  }, []);

  const value = {
    imagePreview,
    setImagePreview,
    setSingleImagePreview,
  };
  return (
    <ImagePreviewContext.Provider value={value}>
      {children}
      <ImagePreviewDrawer />
    </ImagePreviewContext.Provider>
  );
};

export default ImagePreviewContext;
