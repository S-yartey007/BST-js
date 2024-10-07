import { Tree } from "./tree.js";
import { prettyPrint } from "./handlers.js";
import { MergeSort } from "./mergeSort.js";

function randomNumbers() {
  const set = new Set();
  while (set.size < 100) {
    let num = Math.floor(Math.random() * 100);
    set.add(num);
  }
  return Array.from(set);
}

const sortedArray = MergeSort(randomNumbers());
const myTree = new Tree(sortedArray);
console.log(myTree.isBalanced(myTree.root));
myTree.insert(myTree.root, 102);
myTree.insert(myTree.root, 103);
myTree.insert(myTree.root, 123);
myTree.insert(myTree.root, 112);
myTree.insert(myTree.root, 132);
myTree.insert(myTree.root, 142);
myTree.insert(myTree.root, 105);
myTree.insert(myTree.root, 109);
myTree.insert(myTree.root, 101);

myTree.balance();
console.log("InOrder traversal");
myTree.inOrder((node) => {
  console.log(node.data);
});

console.log("PreOrder traversal");
myTree.preOrder((node) => {
  console.log(node.data);
});

console.log("PostOrder traversal");
myTree.postOrder((node) => {
  console.log(node.data);
});

console.log("LevelOrder traversal");
myTree.levelOrder((node) => {
  console.log(node.data);
});
