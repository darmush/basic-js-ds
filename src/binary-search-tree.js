const { NotImplementedError } = require('../lib');
const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  constructor() {
    this.rootNode = null;
  }

  root() {
    return this.rootNode;
  }

  add(data) {
    const newNode = new Node(data);

    if (this.rootNode === null) {
      this.rootNode = newNode;
      return;
    }

    let current = this.rootNode;

    while (true) {
      if (newNode.data === current.data) return
      if (newNode.data < current.data) {
        if (current.left === null) {
          current.left = newNode;
          return
        }
        current = current.left;
      } else {
        if (current.right === null) {
          current.right = newNode;
          return
        }
        current = current.right;
      }
    }
  }

  find(data) {
    if (this.rootNode === null) {
      return null;
    }

    let current = this.rootNode;

    while (current !== null) {
      if (data === current.data) return current
      current = data < current.data ? current.left : current.right
    }

    return null;
  }

  has(data) {
    return this.find(data) !== null
  }

  remove(data) {
    let parent = null;
    let current = this.rootNode;

    while (current !== null && current.data !== data) {
      parent = current;
      current = data < current.data ? current.left : current.right;
    }

    if (current === null) return;

    if (current.left !== null && current.right !== null) {
      let minParent = current;
      let min = current.right;

      while (min.left !== null) {
        minParent = min;
        min = min.left;
      }

      current.data = min.data;
      parent = minParent;
      current = min;
    }

    const child = current.left !== null ? current.left : current.right;

    if (parent === null) {
      this.rootNode = child;
    } else if (parent.left === current) {
      parent.left = child;
    } else {
      parent.right = child;
    }

  }

  min() {
    if (this.rootNode === null) {
      return null;
    }
    let current = this.rootNode;
    while (current.left !== null) {
      current = current.left;
    }
    return current.data;

  }

  max() {
    if (this.rootNode === null) {
      return null;
    }
    let current = this.rootNode;
    while (current.right !== null) {
      current = current.right;
    }
    return current.data;
  }
}

module.exports = {
  BinarySearchTree
};
