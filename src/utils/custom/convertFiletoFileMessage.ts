import { File } from "@/chat/File";
import { FileMessage } from "@/chat/Message";
import { FileUpload } from "@/components/chat/chatRoomMessage/ChatAreaFooter";
import { calculateFrameSize, Dimensions } from "./calculateFrameSize";
import { getDimesionOfFile } from "./getDimesionOfFile";

export const convertFiletoFileMessage = async (
  fileUpload: FileUpload[],
): Promise<FileMessage[]> => {
  // Pre-allocate the array with the correct size
  const fileMsgArr: FileMessage[] = new Array(fileUpload.length);

  // Promise.all to process all files concurrently
  await Promise.all(
    fileUpload.map(async (elem, i) => {
      let dimension: Dimensions | null = null;
      let url = "";
      try {
        const originalDimension = await getDimesionOfFile(elem);
        if (originalDimension) {
          dimension = calculateFrameSize(
            originalDimension.width,
            originalDimension.height,
          );
          url = originalDimension.url;
        }
      } catch (error) {}

      const file = new File({
        fileId: elem.fileId,
        fileName: elem.file.name.split(".")[0],
        size: elem.file.size,
        fileType: elem.file.type,
        extension: elem.file.name.split(".")[1],
        url,
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
