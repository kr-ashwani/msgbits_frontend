import { FileQueue } from "./FileQueue";

class FileQueueSingleton {
  private static instance: FileQueue | null = null;

  public static getInstance(): FileQueue {
    if (!FileQueueSingleton.instance) {
      FileQueueSingleton.instance = new FileQueue();
    }
    return FileQueueSingleton.instance;
  }
}

const fileQueue = FileQueueSingleton.getInstance();
export { fileQueue };
