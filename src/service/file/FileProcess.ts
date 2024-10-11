import { formatBytes } from "@/utils/custom/formatBytes";
import { FileUploadStatus, UploadFile } from "./types";
import { FileSchema, IFile } from "@/schema/FileSchema";
import { serverResWapperSchema } from "@/schema/ServerResWrapperSchema";
import { fetchData } from "@/utils/custom/customFetch";
import { z } from "zod";

export class FileProcess {
  private readonly baseURL: URL;
  private statusCallback: (status: FileUploadStatus) => void;

  constructor(
    statusCallback: (status: FileUploadStatus) => void,
    serverURL: string,
  ) {
    this.baseURL = new URL(
      serverURL.endsWith("/") ? serverURL : serverURL + "/",
    );
    this.statusCallback = statusCallback;
  }

  public processFile(task: UploadFile): void {
    this.uploadFileToServer(task);
  }

  private async uploadFileToServer(task: UploadFile) {
    const { fileId, file } = task;
    const formData = new FormData();

    formData.append("file-upload", file, file.name);

    const uploadUrl =
      this.baseURL.toString() +
      `${this.baseURL.toString().endsWith("/") ? "" : "/"}upload/${fileId}`;

    this.performUpload(uploadUrl, formData, task);
  }

  private performUpload(url: string, formData: FormData, task: UploadFile) {
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
          fileMessage: task.fileMessage,
          status: "UPLOADING",
          size: formatBytes(totalSize),
          uploadedSize: formatBytes(event.loaded),
          speed: `${formatBytes(totalBytesPerSec, 0)}/s `,
          percentage,
        });
      }
    };

    xhr.onload = async () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        const response = JSON.parse(xhr.responseText);
        if (!response?.url)
          this.callErrorCallback("Failed to upload file meta data", task);

        const dto = { ...task.fileMessage.file, url: response.url };
        const fileDTORes = await this.uploadFileMetaData(dto);
        if (fileDTORes)
          this.statusCallback({
            fileId,
            fileMessage: task.fileMessage,
            status: "UPLOADED",
            url: fileDTORes.url,
          });
        else this.callErrorCallback("Failed to upload file meta data", task);
      } else this.callErrorCallback("Failed to upload file", task);
    };

    xhr.onerror = () => {
      this.callErrorCallback("Failed to upload file", task);
    };

    xhr.send(formData);
  }

  private async uploadFileMetaData(fileDTO: IFile): Promise<IFile | null> {
    try {
      const response = await fetchData(
        "/filemetadata",
        serverResWapperSchema(FileSchema),
        fileDTO,
      );

      return response.success ? response.payload.data : null;
    } catch (err) {
      return null;
    }
  }

  private callErrorCallback(errMsg: string, task: UploadFile) {
    this.statusCallback({
      fileId: task.fileId,
      fileMessage: task.fileMessage,
      status: "FAILED",
      error: new Error(errMsg),
    });
  }
}
