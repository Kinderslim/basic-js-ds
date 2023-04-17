const { NotImplementedError } = require('../extensions/index.js');

// const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  constructor() {
    this.roots = null;
  }

  root() {
    if (!this.roots) {
      return null;
    }
    return this.roots;
  }

  add(data) {
    this.roots = addFunc(this.roots, data);
    function addFunc(node, data) {
      if (!node) {
        return new Node(data);
      }
      if (node.data === data) {
        return node;
      }
      if (data < node.data) {
        node.left = addFunc(node.left, data);
      } else {
        node.right = addFunc(node.right, data);
      }
      return node;
    }
  }

  has(data) {
    return searchFunc(this.roots, data);
    function searchFunc(node, data) {
      if (!node) {
        return false;
      }
      if (node.data === data) {
        return true;
      }
      return data < node.data ?
        searchFunc(node.left, data) :
        searchFunc(node.right, data);
    }
  }

  find(data) {
    let node = this.roots;
    while (node.data !== data) {
      if (data < node.data) {
        node = node.left;
      } else {
        node = node.right;
      }
      if (node === null) {
        return null;
      }
    }
    return node;
  }

  remove(data) {
    this.roots = removeFunc(this.roots, data);
    function removeFunc(node, data) {
      if (!node) {
        return null;
      }
      if (data < node.data) {
        node.left = removeFunc(node.left, data);
        return node;
      } else if (data > node.data) {
        node.right = removeFunc(node.right, data);
        return node;
      } else {
        if (!node.left && !node.right) {
          return null;
        }
        if (!node.left) {
          node = node.right;
          return node;
        }
        if (!node.right) {
          node = node.left;
          return node;
        }
        let minFromRight = node.right;
        while (minFromRight.left) {
          minFromRight = minFromRight.left;
        }
        node.data = minFromRight.data;
        node.right = removeFunc(node.right, minFromRight.data);
        return node;
      }
    }
  }

  min() {
    if (!this.roots) {
      return;
    }
    let node = this.roots;
    while (node.left) {
      node = node.left;
    }
    return node.data;
  }

  max() {
    if (!this.roots) {
      return;
    }
    let node = this.roots;
    while (node.right) {
      node = node.right;
    }
    return node.data;
  }
}

module.exports = {
  BinarySearchTree
};