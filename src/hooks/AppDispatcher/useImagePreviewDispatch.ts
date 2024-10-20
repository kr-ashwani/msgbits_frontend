import {
  addImagePreview,
  ImagePreviewState,
  resetImagePreview,
} from "@/lib/store/features/chat/chatRoomDataSlice";
import { useAppDispatch } from "@/lib/store/hooks";
import { AppDispatch } from "@/lib/store/store";
import { useMemo } from "react";

type ImagePreviewStateWithOptionalCursor = Pick<ImagePreviewState, "images"> &
  Partial<Pick<ImagePreviewState, "initialImageCursor">>;

export class ImagePreviewDispatcher {
  private dispatch: AppDispatch;

  constructor(dispatch: AppDispatch) {
    this.dispatch = dispatch;
  }
  setImagePreview(preview: string): void;
  setImagePreview(preview: ImagePreviewStateWithOptionalCursor): void;
  setImagePreview(preview: string | ImagePreviewStateWithOptionalCursor) {
    if (typeof preview === "string") {
      this.dispatch(
        addImagePreview({
          images: [
            {
              url: preview,
              fileId: "xxxNULLxxx",
            },
          ],
          initialImageCursor: 0,
        }),
      );
    } else {
      const initialImageCursor = preview.initialImageCursor ?? 0;
      this.dispatch(
        addImagePreview({
          images: preview.images,
          initialImageCursor,
        }),
      );
    }
  }
  resetImagePreview() {
    this.dispatch(resetImagePreview());
  }
}
const useImagePreviewDispatch = () => {
  const dispatch = useAppDispatch();

  return useMemo(() => new ImagePreviewDispatcher(dispatch), [dispatch]);
};

export { useImagePreviewDispatch };
