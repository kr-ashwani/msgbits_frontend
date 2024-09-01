class ListNode<T> {
  constructor(
    public data: T,
    public prev: ListNode<T> | null = null,
    public next: ListNode<T> | null = null,
  ) {}
}

export class DoublyLinkedList<T> {
  private head: ListNode<T> | null = null;
  private tail: ListNode<T> | null = null;
  private _size: number = 0;

  get size(): number {
    return this._size;
  }

  isEmpty(): boolean {
    return this._size === 0;
  }

  enqueue(data: T): void {
    const newNode = new ListNode(data);
    if (this.isEmpty()) {
      this.head = this.tail = newNode;
    } else {
      newNode.prev = this.tail;
      this.tail!.next = newNode;
      this.tail = newNode;
    }
    this._size++;
  }

  dequeue(): T | undefined {
    if (this.isEmpty()) return undefined;
    const data = this.head!.data;
    this.removeNode(this.head!);
    return data;
  }

  private removeNode(node: ListNode<T>): void {
    if (node === this.head) {
      this.head = node.next;
    }
    if (node === this.tail) {
      this.tail = node.prev;
    }
    if (node.prev) {
      node.prev.next = node.next;
    }
    if (node.next) {
      node.next.prev = node.prev;
    }
    node.prev = node.next = null;
    this._size--;
  }

  removeElements(predicate: (data: T) => boolean): void {
    let current = this.head;
    while (current) {
      const next = current.next;
      if (predicate(current.data)) {
        this.removeNode(current);
      }
      current = next;
    }
  }

  forEach(callback: (data: T) => void): void {
    let current = this.head;
    while (current) {
      callback(current.data);
      current = current.next;
    }
  }

  toArray(): T[] {
    const result: T[] = [];
    this.forEach((data) => result.push(data));
    return result;
  }
}
