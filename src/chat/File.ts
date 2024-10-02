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
  } | null;

  constructor(file: IFile) {
    this.fileId = file.fileId;
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
