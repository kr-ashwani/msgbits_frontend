import { DoublyLinkedList } from "./../../utils/custom/DoublyLinkedList";
import { v4 as uuidv4 } from "uuid";
import { FileProcess } from "./FileProcess";

export interface FileMetaData {
  size: number;
  mimeType: string;
  originalName: string;
  fileId: string;
}

export interface UploadTask {
  file: File;
  retries: number;
  id: string;
  fileMetaData: FileMetaData;
}

type CallbackType = "progress" | "success" | "error";

interface ProgressData {
  fileId: string;
  progress: number;
}

interface SuccessData {
  fileId: string;
  fileMetaData: FileMetaData;
}

interface ErrorData {
  fileId: string;
  error: Error;
  retries: number;
}

type CallbackData = ProgressData | SuccessData | ErrorData;

type Callback<T extends CallbackData> = (data: T) => void;

type LogLevel = "info" | "error" | "warn";

interface FileQueueConfig {
  maxConcurrentUploads: number;
  maxRetries: number;
  retryDelay: number;
  logger: (message: string, level: LogLevel) => void;
}

const defaultLogger = (message: string, level: LogLevel) => {
  console[level](message);
};

export class FileQueue {
  private queue: DoublyLinkedList<UploadTask>;
  private activeUploads: Map<string, UploadTask> = new Map();
  private callbacks: {
    progress: Set<Callback<ProgressData>>;
    success: Set<Callback<SuccessData>>;
    error: Set<Callback<ErrorData>>;
  };
  private config: FileQueueConfig;

  constructor(
    private fileProcess: FileProcess,
    config: Partial<FileQueueConfig> = {},
  ) {
    this.config = {
      maxConcurrentUploads: 3,
      maxRetries: 3,
      retryDelay: 1000,
      logger: defaultLogger,
      ...config,
    };
    this.queue = new DoublyLinkedList<UploadTask>();
    this.callbacks = {
      progress: new Set(),
      success: new Set(),
      error: new Set(),
    };
  }

  public enqueue(file: File): FileMetaData {
    const id = uuidv4();
    const fileMetaData: FileMetaData = {
      originalName: file.name,
      mimeType: file.type,
      size: file.size,
      fileId: id,
    };
    const task: UploadTask = { file, retries: 0, id, fileMetaData };

    this.queue.enqueue(task);
    this.processQueue();
    return fileMetaData;
  }

  private async processQueue(): Promise<void> {
    const availableSlots =
      this.config.maxConcurrentUploads - this.activeUploads.size;
    if (availableSlots <= 0 || this.queue.isEmpty()) return;

    this.queue.forEach((task) => {
      if (this.activeUploads.size >= this.config.maxConcurrentUploads) return;
      if (!this.activeUploads.has(task.id)) {
        this.processTask(task);
      }
    });
  }

  public registerCallback<T extends CallbackType>(
    type: T,
    callback: Callback<
      T extends "progress"
        ? ProgressData
        : T extends "success"
          ? SuccessData
          : ErrorData
    >,
  ): void {
    this.callbacks[type].add(callback as any);
  }

  public unregisterCallback<T extends CallbackType>(
    type: T,
    callback: Callback<
      T extends "progress"
        ? ProgressData
        : T extends "success"
          ? SuccessData
          : ErrorData
    >,
  ): void {
    this.callbacks[type].delete(callback as any);
  }

  private async processTask(task: UploadTask): Promise<void> {
    this.activeUploads.set(task.id, task);
    try {
      await this.fileProcess.processFile(task, (fileId, progress) => {
        this.notifyCallbacks("progress", { fileId, progress });
      });
      this.config.logger(
        `File ${task.file.name} (ID: ${task.id}) uploaded successfully.`,
        "info",
      );
      this.queue.removeElements((t) => t.id === task.id);
      this.notifyCallbacks("success", {
        fileId: task.id,
        fileMetaData: task.fileMetaData,
      });
    } catch (error) {
      if (task.retries < this.config.maxRetries) {
        task.retries++;
        this.config.logger(
          `Retrying file ${task.file.name} (ID: ${task.id}), attempt ${task.retries}.`,
          "warn",
        );
        await this.retryTask(task);
      } else {
        this.config.logger(
          `File ${task.file.name} (ID: ${task.id}) failed after ${this.config.maxRetries} attempts. Removing from Queue`,
          "error",
        );
        this.queue.removeElements((t) => t.id === task.id);
        this.notifyCallbacks("error", {
          fileId: task.id,
          error: error as Error,
          retries: task.retries,
        });
      }
    } finally {
      this.activeUploads.delete(task.id);
      this.processQueue();
    }
  }

  private async retryTask(task: UploadTask): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, this.config.retryDelay));
    this.queue.enqueue(task);
    this.processQueue();
  }

  private notifyCallbacks<T extends CallbackType>(
    type: T,
    data: T extends "progress"
      ? ProgressData
      : T extends "success"
        ? SuccessData
        : ErrorData,
  ): void {
    this.callbacks[type].forEach((callback) => callback(data as any));
  }

  public getQueueSize(): number {
    return this.queue.size;
  }

  public getActiveUploads(): number {
    return this.activeUploads.size;
  }

  public clearQueue(): void {
    this.queue = new DoublyLinkedList<UploadTask>();
    this.activeUploads.clear();
  }
}
