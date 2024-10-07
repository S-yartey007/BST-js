import { TreeNode } from "./treeNode.js";
import { Queue } from "./queue.js";
class Tree {
  root;
  constructor(array) {
    this.root = buildTree(array, 0, array.length - 1);
  }

  levelOrder(callback) {
    const root = this.root;
    if (!callback) {
      throw new Error("callback missing");
    }
    if (root === null) return;
    const queue = new Queue();
    queue.enqueue(root);
    while (!queue.isEmpty()) {
      const node = queue.dequeue();
      callback(node);
      if (node.left) {
        queue.enqueue(node.left);
      }
      if (node.right) {
        queue.enqueue(node.right);
      }
    }
  }

  inOrder(callback, root = this.root) {
    if (!callback) {
      throw new Error("callback missing");
    }
    if (root) {
      this.inOrder(callback, root.left);
      callback(root);
      this.inOrder(callback, root.right);
    }
  }

  preOrder(callback, root = this.root) {
    if (!callback) {
      throw new Error("callback missing");
    }
    if (root) {
      callback(root);
      this.preOrder(callback, root.left);
      this.preOrder(callback, root.right);
    }
  }

  postOrder(callback, root = this.root) {
    if (!callback) {
      throw new Error("callback missing");
    }
    if (root) {
      this.postOrder(callback, root.left);
      this.postOrder(callback, root.right);
      callback(root);
    }
  }

  insert(root, value) {
    const node = new TreeNode(value);

    if (root === null) {
      return node;
    }

    let current = root;
    let parent = null;
    while (current) {
      parent = current;
      if (value < current.data) {
        current = current.left;
      } else {
        current = current.right;
      }
    }
    if (value < parent.data) {
      parent.left = node;
    } else {
      parent.right = node;
    }
    node.parent = parent;
    return root;
  }
  delete(node, value) {
    if (node === null) return null;

    if (value < node.data) {
      node.left = this.delete(node.left, value);
    } else if (value > node.data) {
      node.right = this.delete(node.right, value);
    } else {
      if (node.left === null && node.right === null) {
        return null;
      }
      if (node.left === null) {
        return node.right;
      } else if (node.right === null) {
        return node.left;
      } else {
        const successor = findMin(node.right);
        node.data = successor.data;
        node.right = this.delete(node.right, successor.value);
      }
    }
    return node;
  }
  find(node, value) {
    if (node === null) return null;
    if (value === node.data) return node;
    else if (value < node.data) return this.find(node.left, value);
    else return this.find(node.right, value);
  }

  height(node) {
    if (node === null) return -1;
    const leftHeight = this.height(node.left);
    const rightHeight = this.height(node.right);
    return Math.max(leftHeight, rightHeight) + 1;
  }
  isBalanced(root) {
    function checkHeiht(node) {
      if (node === null) return 0;

      const leftHeight = checkHeiht(node.left);
      if (leftHeight === -1) return -1;

      const rightHeight = checkHeiht(node.right);
      if (rightHeight === -1) return -1;

      if (Math.abs(leftHeight - rightHeight) > 1) return -1;

      return Math.max(leftHeight, rightHeight) + 1;
    }
    return checkHeiht(root) != -1;
  }
  balance() {
    const sortedArray = [];
    this.inOrder((node) => {
      sortedArray.push(node.data);
    });
    this.root = buildTree(sortedArray, 0, sortedArray.length - 1);
  }
  depth(node, root) {
    if (node === root) return 0;
    //console.log(node);
    const parentDepth = this.depth(node.parent, root);
    return parentDepth + 1;
  }
}

function findMin(node) {
  while (node.left) {
    node = node.left;
  }
  return node;
}

function buildTree(array, start, end, parent = null) {
  if (start > end) return null;
  const mid = Math.floor((start + end) / 2);
  const node = new TreeNode(array[mid]);
  node.parent = parent;

  node.left = buildTree(array, start, mid - 1, node);
  node.right = buildTree(array, mid + 1, end, node);
  return node;
}

export { Tree };
