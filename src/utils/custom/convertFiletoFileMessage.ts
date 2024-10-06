import { File } from "@/chat/File";
import { FileMessage } from "@/chat/Message";
import { FileUpload } from "@/components/chat/chatRoomMessage/ChatAreaFooter";
import { calculateFrameSize, Dimensions } from "./calculateFrameSize";
import { getDimesionOfFile } from "./getDimesionOfFile";
import mime from "mime-types";

export const convertFiletoFileMessage = async (
  fileUpload: FileUpload[],
): Promise<FileMessage[]> => {
  // Pre-allocate the array with the correct size
  const fileMsgArr: FileMessage[] = new Array(fileUpload.length);

  // Promise.all to process all files concurrently
  await Promise.all(
    fileUpload.map(async (elem, i) => {
      let dimension: Dimensions | null = null;
      try {
        const originalDimension = await getDimesionOfFile(elem);
        if (originalDimension) {
          dimension = calculateFrameSize(
            originalDimension.width,
            originalDimension.height,
          );
        }
      } catch (error) {}

      const fileType =
        elem.file.type ||
        mime.lookup(elem.file.name) ||
        "application/octet-stream";
      const extension =
        mime.extension(fileType) ||
        elem.file.name.split(".").pop() ||
        "noextension";

      const file = new File({
        fileId: elem.fileId,
        fileName: elem.file.name,
        size: elem.file.size,
        fileType,
        extension,
        url: "",
        dimension, // This will be null if getDimesionOfFile failed
      });

      const fileMsg = new FileMessage(
        elem.message,
        elem.senderId,
        elem.chatRoomId,
        elem.repliedTo,
        // convert to plain js object
        file.toObject(),
      );

      // Assign to the pre-allocated array
      fileMsgArr[i] = fileMsg;
    }),
  );

  return fileMsgArr;
};
