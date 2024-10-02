import { formatBytes } from "@/utils/custom/formatBytes";
import { FileUploadStatus, UploadFile } from "./types";

export class FileProcess {
  private readonly baseURL: URL;
  private statusCallback: (status: FileUploadStatus) => void;

  constructor(
    statusCallback: (status: FileUploadStatus) => void,
    serverURL: string,
  ) {
    this.baseURL = new URL(serverURL);
    this.statusCallback = statusCallback;
  }

  public processFile(task: UploadFile): void {
    this.uploadFileToServer(task);
  }

  private async uploadFileToServer(task: UploadFile) {
    const { fileId, file } = task;
    const formData = new FormData();

    formData.append("file-upload", file, file.name);

    const uploadUrl = new URL(`/upload/${fileId}`, this.baseURL);

    this.performUpload(uploadUrl, formData, task);
  }

  private performUpload(url: URL, formData: FormData, task: UploadFile) {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", url.toString(), true);
    xhr.withCredentials = true;
    const { file, fileId } = task;
    const totalSize = file.size;
    let lastRecTime = Date.now();
    let lastLoadedBytes = 0;

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        const progress = (event.loaded / event.total) * 100;
        const percentage = Math.round(progress * 10) / 10;

        const totalSeconds = (Date.now() - lastRecTime) / 1000;
        const totalBytesPerSec = Math.round(
          (event.loaded - lastLoadedBytes) / totalSeconds,
        );

        lastLoadedBytes = event.loaded;
        lastRecTime = Date.now();

        this.statusCallback({
          fileId,
          status: "UPLOADING",
          size: formatBytes(totalSize),
          uploadedSize: formatBytes(event.loaded),
          speed: `${formatBytes(totalBytesPerSec, 0)}/s `,
          percentage,
        });
      }
    };

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        this.statusCallback({
          fileId,
          status: "UPLOADED",
        });
      } else {
        this.statusCallback({
          fileId,
          status: "FAILED",
          error: new Error("Failed to upload file"),
          fileExtension: file.name.split(".")[1] || "",
        });
      }
    };

    xhr.onerror = () => {
      this.statusCallback({
        fileId,
        status: "FAILED",
        error: new Error("Failed to upload file"),
        fileExtension: file.name.split(".")[1] || "",
      });
    };

    xhr.send(formData);
  }
}
