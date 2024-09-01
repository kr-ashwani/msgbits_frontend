import { FileMetaData, UploadTask } from "./FileQueue";

interface UploadResult {
  success: boolean;
  error?: Error;
}

export class FileProcess {
  private readonly baseURL: URL;

  constructor(serverURL: string = "http://192.168.29.250:8080") {
    this.baseURL = new URL(serverURL);
  }

  public getFileURL(fileMetaData: FileMetaData): {
    fileUrl: string;
    downloadUrl: string;
  } {
    try {
      const queryString = new URLSearchParams(
        Object.entries(fileMetaData),
      ).toString();
      const fileUrl = new URL("/file/", this.baseURL);
      const downloadUrl = new URL("/download/", this.baseURL);
      fileUrl.search = downloadUrl.search = queryString;
      return {
        fileUrl: fileUrl.toString(),
        downloadUrl: downloadUrl.toString(),
      };
    } catch (err) {
      console.error("Error in getFileURL:", err);
      throw new Error("Failed to construct file URLs");
    }
  }

  public processFile(
    task: UploadTask,
    onProgress: (fileId: string, progress: number) => void,
  ): Promise<void> {
    return this.uploadFileToServer(task, onProgress);
  }

  private async uploadFileToServer(
    task: UploadTask,
    onProgress: (fileId: string, progress: number) => void,
  ): Promise<void> {
    const { id: fileId, file, fileMetaData } = task;
    const formData = new FormData();
    const totalSize = file.size;

    formData.append("file-upload", file, file.name);
    formData.append(
      "metadata",
      JSON.stringify({
        fileId,
        fileType: file.type,
        size: file.size,
        originalName: file.name,
      }),
    );

    const queryString = new URLSearchParams(
      Object.entries(fileMetaData),
    ).toString();
    const uploadUrl = new URL(`/upload/?${queryString}`, this.baseURL);

    try {
      const result = await this.performUpload(
        uploadUrl,
        formData,
        (progress) => {
          const roundedProgress = Math.round(progress * 10) / 10; // Round to 1 decimal place
          onProgress(fileId, roundedProgress);
        },
      );

      if (!result.success) {
        throw result.error || new Error("Upload failed");
      }
    } catch (error) {
      console.error("Error in uploadFileToServer:", error);
      throw error;
    }
  }

  private performUpload(
    url: URL,
    formData: FormData,
    onProgress: (progress: number) => void,
  ): Promise<UploadResult> {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("POST", url.toString(), true);
      xhr.withCredentials = true;

      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const progress = (event.loaded / event.total) * 100;
          onProgress(progress);
        }
      };

      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve({ success: true });
        } else {
          resolve({
            success: false,
            error: new Error(`Upload failed with status: ${xhr.status}`),
          });
        }
      };

      xhr.onerror = () => {
        resolve({
          success: false,
          error: new Error("Network error during file upload"),
        });
      };

      xhr.send(formData);
    });
  }
}
