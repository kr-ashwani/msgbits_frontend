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

  forEach(callback: (data: T) => void): void {
    let current = this.head;
    while (current) {
      callback(current.data);
      current = current.next;
    }
  }

  removeElem(callback: (data: T) => boolean): void {
    let current = this.head;
    let prevNode: NodeItem<T> | null = null;

    while (current) {
      const shouldRemove = callback(current.data);

      if (shouldRemove) {
        if (current === this.head) {
          this.head = current.next;
          if (!this.head) {
            this.tail = null;
          }
        } else if (prevNode) {
          prevNode.next = current.next;
          if (current === this.tail) {
            this.tail = prevNode;
          }
        }

        current.next = null;
        return;
      }

      prevNode = current;
      current = current.next;
    }
  }

  peek(): T | null {
    return this.head ? this.head.data : null;
  }

  clear(): void {
    this.head = null;
    this.tail = null;
  }

  toArray(): T[] {
    const result: T[] = [];
    let current = this.head;
    while (current) {
      result.push(current.data);
      current = current.next;
    }
    return result;
  }
}
