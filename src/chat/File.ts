import { v4 as uuidv4 } from "uuid";
import { IFile } from "@/schema/FileSchema";

class File implements IFile {
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
}
