import { v4 as uuid } from "uuid";
import { fileQueue } from "@/service/file/FileQueueSingleton";
import { FileUpload } from "@/components/chat/chatRoomMessage/ChatAreaFooter";
import { convertFiletoFileMessage } from "./convertFiletoFileMessage";
import { FileUploadStatus } from "@/service/file/types";

interface FileUploaded {
  fileId: string;
  url: string;
}

export const uploadFileToServer = async (
  files: File[],
  progressCallback: (progress: FileUploadStatus) => void = () => {},
  type: FileUpload["type"] = "attachment",
): Promise<FileUploaded[]> => {
  const filesToUpload = files.map<FileUpload>((file) => ({
    file,
    type,
    fileId: uuid(),
    message: "",
    senderId: "",
    chatRoomId: "",
    repliedTo: null,
  }));

  const fileMessages = await convertFiletoFileMessage(filesToUpload);

  // if files and fileMessages length mismatches
  if (files.length !== fileMessages.length) return [];

  const fileUpload: Promise<FileUploaded>[] = [];
  fileMessages.forEach((fileMessage, i) => {
    const fileId = fileMessage.file.fileId;
    fileQueue.enqueue({
      fileId,
      fileMessage,
      file: files[i],
    });

    fileUpload.push(
      new Promise((res, rej) => {
        fileQueue.registerCallbackForFile(fileId, (uploadStatus) => {
          progressCallback(uploadStatus);
          if (uploadStatus.status === "UPLOADED")
            res({
              fileId,
              url: uploadStatus.url,
            });
          else if (uploadStatus.status === "FAILED")
            res({
              fileId,
              url: "failed",
            });
        });
      }),
    );
  });

  const res = await Promise.all(fileUpload);
  return res;
};
