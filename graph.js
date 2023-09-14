class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  addVertex(vertex) {
    this.nodes.add(vertex);
  }

  addVertices(vertexArray) {
    vertexArray.forEach((vertex) => {
      this.addVertex(vertex);
    });
  }

  addEdge(v1, v2) {
    v1.adjacent.add(v2);
    v2.adjacent.add(v1);
  }

  removeEdge(v1, v2) {
    v1.adjacent.delete(v2);
    v2.adjacent.delete(v1);
  }

  removeVertex(vertex) {
    this.nodes.delete(vertex);
    vertex.adjacent.forEach((adjVertex) => {
      adjVertex.adjacent.delete(vertex);
    });
  }

  depthFirstSearch(start) {
    const visited = new Set();
    const result = [];

    function dfs(node) {
      if (!node || visited.has(node)) return;
      visited.add(node);
      result.push(node.value);
      node.adjacent.forEach((adjNode) => {
        dfs(adjNode);
      });
    }

    dfs(start);
    return result;
  }

  breadthFirstSearch(start) {
    const visited = new Set();
    const result = [];
    const queue = [];

    queue.push(start);
    visited.add(start);

    while (queue.length > 0) {
      const currentNode = queue.shift();
      result.push(currentNode.value);

      currentNode.adjacent.forEach((adjNode) => {
        if (!visited.has(adjNode)) {
          visited.add(adjNode);
          queue.push(adjNode);
        }
      });
    }

    return result;
  }
}

module.exports = { Graph, Node };
