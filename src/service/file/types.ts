import { IFileMessage } from "@/schema/MessageSchema";

export interface FileUploadPending {
  fileId: string;
  fileMessage: IFileMessage;
  status: "PENDING";
}
export interface FileUploadProgress {
  fileId: string;
  fileMessage: IFileMessage;
  status: "UPLOADING";
  // formated string
  size: string;
  uploadedSize: string;
  speed: string;
  percentage: number;
}
export interface FileUploadCompleted {
  fileId: string;
  fileMessage: IFileMessage;
  status: "UPLOADED";
  url: string;
}
export interface FileUploadFailed {
  fileId: string;
  fileMessage: IFileMessage;
  status: "FAILED";
  error: Error;
}

export type FileUploadStatus =
  | FileUploadPending
  | FileUploadProgress
  | FileUploadCompleted
  | FileUploadFailed;

export type LogLevel = "info" | "error" | "warn";

export interface FileQueueConfig {
  maxConcurrentUploads: number;
  maxRetries: number;
  retryDelay: number;
  logger: (message: string, level: LogLevel) => void;
}

export interface UploadFile {
  file: File;
  fileId: string;
  fileMessage: IFileMessage;
}
export interface UploadFileTask extends UploadFile {
  retries: number;
}
