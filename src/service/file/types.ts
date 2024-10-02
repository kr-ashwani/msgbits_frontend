export interface FileUploadPending {
  fileId: string;
  status: "PENDING";
}
export interface FileUploadProgress {
  fileId: string;
  status: "UPLOADING";
  // formated string
  size: string;
  uploadedSize: string;
  speed: string;
  percentage: number;
}
export interface FileUploadCompleted {
  fileId: string;
  status: "UPLOADED";
}
export interface FileUploadFailed {
  fileId: string;
  status: "FAILED";
  fileExtension: string;
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
}
export interface UploadFileTask {
  file: File;
  fileId: string;
  retries: number;
}
