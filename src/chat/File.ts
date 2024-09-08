import { v4 as uuidv4 } from "uuid";
import { IFile } from "@/schema/FileSchema";

export class File implements IFile {
  fileId: string;
  fileName: string;
  size: number;
  fileType: string;
  extension: string;
  url: string;
  dimension: {
    width: number;
    height: number;
  };

  constructor(file: Omit<IFile, "fileId">) {
    this.fileId = uuidv4();
    this.fileName = file.fileName;
    this.size = file.size;
    this.fileType = file.fileType;
    this.extension = file.extension;
    this.url = file.url;
    this.dimension = file.dimension;
  }

  toObject(): IFile {
    return {
      fileId: this.fileId,
      fileName: this.fileName,
      size: this.size,
      fileType: this.fileType,
      extension: this.extension,
      url: this.url,
      dimension: this.dimension,
    };
  }
}
