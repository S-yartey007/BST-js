class Queue {
  constructor() {
    this.array = [];
  }
  enqueue(item) {
    this.array.push(item);
  }
  dequeue() {
    if (this.isEmpty()) {
      return null;
    } else {
      return this.array.shift();
    }
  }
  isEmpty() {
    return this.array.length === 0;
  }

  front() {
    if (this.isEmpty()) {
      return null;
    }
    return this.array[0];
  }
  size() {
    return this.array.length;
  }
}

export { Queue };
