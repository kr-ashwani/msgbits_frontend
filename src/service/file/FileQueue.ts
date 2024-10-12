import { DoublyLinkedList } from "./../../utils/custom/DoublyLinkedList";
import { FileProcess } from "./FileProcess";
import {
  FileQueueConfig,
  FileUploadStatus,
  LogLevel,
  UploadFile,
  UploadFileTask,
} from "./types";

const defaultLogger = (message: string, level: LogLevel) => {
  console[level](message);
};

export class FileQueue {
  private queue: DoublyLinkedList<UploadFileTask>;
  private activeUploads: Map<string, UploadFileTask> = new Map();
  private fileStatusCallbacks: {
    [p in string]: ((status: FileUploadStatus) => void)[];
  };
  private callbacks: ((status: FileUploadStatus) => void)[];
  private config: FileQueueConfig;
  private fileProcess: FileProcess;

  constructor(config: Partial<FileQueueConfig> = {}) {
    const serverURL = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost";
    this.fileProcess = new FileProcess(this.fileProcessCallback, serverURL);
    this.config = {
      maxConcurrentUploads: 3,
      maxRetries: 0,
      retryDelay: 1000,
      logger: defaultLogger,
      ...config,
    };
    this.queue = new DoublyLinkedList<UploadFileTask>();
    this.fileStatusCallbacks = {};
    this.callbacks = [];
  }

  public enqueue(fileUpload: UploadFile) {
    const task: UploadFileTask = { ...fileUpload, retries: 0 };
    this.queue.enqueue(task);
    this.processQueue();
  }

  private async processQueue(): Promise<void> {
    const availableSlots =
      this.config.maxConcurrentUploads - this.activeUploads.size;
    if (availableSlots <= 0 || this.queue.isEmpty()) return;

    this.queue.forEach((task) => {
      if (this.activeUploads.size >= this.config.maxConcurrentUploads) return;
      if (!this.activeUploads.has(task.fileId)) this.processTask(task);
    });
  }

  public registerCallbackForFile(
    fileId: string,
    callback: (status: FileUploadStatus) => void,
  ): void {
    if (this.fileStatusCallbacks[fileId])
      this.fileStatusCallbacks[fileId].push(callback);
    else this.fileStatusCallbacks[fileId] = [callback];
  }

  public registerCallback(callback: (status: FileUploadStatus) => void): void {
    this.callbacks.push(callback);
  }
  public unregisterCallback(
    callback: (status: FileUploadStatus) => void,
  ): void {
    this.callbacks = this.callbacks.filter((cb) => cb !== callback);
  }

  public unregisterCallbackForFile(
    fileId: string,
    callback: (status: FileUploadStatus) => void,
  ): void {
    this.fileStatusCallbacks[fileId] = this.fileStatusCallbacks[fileId].filter(
      (cb) => cb !== callback,
    );
  }
  public unregisterAllCallbackForFile(fileId: string): void {
    delete this.fileStatusCallbacks[fileId];
  }

  private async processTask(task: UploadFileTask): Promise<void> {
    this.activeUploads.set(task.fileId, task);
    this.fileProcess.processFile(task);
  }

  private getUploadTaskFromQueue(fileId: string): UploadFileTask | null {
    let task: UploadFileTask | null = null;
    this.queue.forEach((elem) => {
      if (elem.fileId === fileId) task = elem;
    });
    return task;
  }
  private async retryTask(fileId: string): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, this.config.retryDelay));
    this.activeUploads.delete(fileId);
    this.processQueue();
  }

  private async removeTask(fileId: string): Promise<void> {
    this.queue.removeElements((t) => t.fileId === fileId);
    this.activeUploads.delete(fileId);
    this.processQueue();
  }
  // this is purposely set to arrow function
  // so that (this) is always to binded to class instance
  private fileProcessCallback = (status: FileUploadStatus): void => {
    if (status.status !== "FAILED") this.callRegisteredCallbacks(status);

    switch (status.status) {
      case "UPLOADED":
        this.config.logger(
          `File with ID: ${status.fileId}) uploaded successfully.`,
          "info",
        );
        this.removeTask(status.fileId);
        this.unregisterAllCallbackForFile(status.fileId);
        break;
      case "FAILED":
        const task = this.getUploadTaskFromQueue(status.fileId);
        if (!task) return;

        if (task.retries < this.config.maxRetries) {
          task.retries++;
          this.config.logger(
            `Retrying file with (ID: ${status.fileId}), attempt ${task.retries}.`,
            "warn",
          );
          this.retryTask(status.fileId);
        } else {
          this.config.logger(
            `File with ID: ${status.fileId}) failed after ${this.config.maxRetries} attempts. Removing from Queue`,
            "error",
          );
          this.callRegisteredCallbacks(status);
          this.removeTask(status.fileId);
          this.unregisterAllCallbackForFile(status.fileId);
        }
    }
  };
  private callRegisteredCallbacks(status: FileUploadStatus) {
    this.callbacks.forEach((callback) => callback({ ...status }));
    this.fileStatusCallbacks[status.fileId]?.forEach((callback) =>
      callback({ ...status }),
    );
  }

  public getQueueSize(): number {
    return this.queue.size;
  }

  public getActiveUploads(): number {
    return this.activeUploads.size;
  }

  public clearQueue(): void {
    this.queue = new DoublyLinkedList<UploadFileTask>();
    this.activeUploads.clear();
  }
}
