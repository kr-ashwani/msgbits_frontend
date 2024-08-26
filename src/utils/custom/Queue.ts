class NodeItem<T> {
  data: T;
  next: NodeItem<T> | null = null;

  constructor(data: T) {
    this.data = data;
  }
}

export class Queue<T> {
  private head: NodeItem<T> | null = null;
  private tail: NodeItem<T> | null = null;

  enqueue(data: T): void {
    const newNode = new NodeItem(data);
    if (this.tail) {
      this.tail.next = newNode;
    } else {
      this.head = newNode;
    }
    this.tail = newNode;
  }

  dequeue(): T | null {
    if (!this.head) {
      return null;
    }
    const data = this.head.data;
    this.head = this.head.next;
    if (!this.head) {
      this.tail = null;
    }
    return data;
  }

  isEmpty(): boolean {
    return this.head === null;
  }

  peek(): T | null {
    return this.head ? this.head.data : null;
  }
}
