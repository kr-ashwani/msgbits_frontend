import { FileUpload } from "@/components/chat/chatRoomMessage/ChatAreaFooter";
import { IFile } from "@/schema/FileSchema";

const getImageMetadata = async (
  file: File,
): Promise<{ width: number; height: number; url: string }> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      resolve({ width: img.width, height: img.height, url: img.src });
      //window.URL.revokeObjectURL(img.src);
    };
    img.onerror = () => {
      reject(new Error("Failed to load image"));
    };
    img.src = URL.createObjectURL(file as unknown as Blob);
  });
};

const getVideoMetadata = async (
  file: File,
): Promise<{ width: number; height: number; url: string }> => {
  return new Promise((resolve, reject) => {
    const video = document.createElement("video");
    video.preload = "metadata";
    video.onloadedmetadata = () => {
      //window.URL.revokeObjectURL(video.src);
      resolve({
        width: video.videoWidth,
        height: video.videoHeight,
        url: video.src,
      });
    };
    video.onerror = () => {
      reject(new Error("Failed to load video metadata"));
    };
    video.src = URL.createObjectURL(file as unknown as Blob);
  });
};

export const getDimesionOfFile = async (
  fileUpload: FileUpload,
): Promise<{ width: number; height: number; url: string } | null> => {
  const imageMimeTypeRegex =
    /^image\/(jpeg|png|gif|bmp|webp|svg\+xml|tiff|x-icon)$/i;
  const videoMimeTypeRegex =
    /^video\/(mp4|mpeg|quicktime|x-msvideo|x-ms-wmv|3gpp|webm)$/i;
  const fileType = fileUpload.file.type;

  if (fileUpload.type === "document") return null;

  if (fileUpload.type === "attachment") {
    // file is nether video nor image
    if (
      !imageMimeTypeRegex.test(fileType) &&
      !videoMimeTypeRegex.test(fileType)
    )
      return null;
  }

  if (imageMimeTypeRegex.test(fileType))
    return await getImageMetadata(fileUpload.file);

  if (videoMimeTypeRegex.test(fileType))
    return await getVideoMetadata(fileUpload.file);

  return null;
};
