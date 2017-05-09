function Node (val) {
  this.value = val;
}

function AMGraph () {
  this.vertexList = [];
  this.edgeList = [];

  // Vertex Logic

  this.addVertex = function (val) {
    this.vertexList.push(new Node(val));
    this.edgeList.forEach(function (row, idx) {
      this.edgeList[idx] = row.concat(-1);
    }, this);
    this.edgeList.push(Array.from(new Array(this.vertexList.length), function (el) {return -1}));

    return this.vertexList.length - 1
  }

  this.removeVertex = function (vertId) {
    if (this.vertexList[vertId]) {
      this.vertexList.splice(vertId, 1);
      this.edgeList.splice(vertId, 1);
      this.edgeList.forEach(function (row, idx) {
        this.edgeList[idx].splice(vertId, 1);
      }, this);
      return true;
    } else return false;
  }

  this.getVertexValue = function (vertId) {
    if (this.vertexList[vertId]) return this.vertexList[vertId].value;
    else return;
  }

  this.setVertexValue = function (vertId, val) {
    if (this.vertexList[vertId]) {
      this.vertexList[vertId].value = val;
      return true;
    } else return false;
  }

  // Edge Logic

  this.addEdge = function (vertId1, vertId2, val) {
    if (this.vertexList[vertId1] && this.vertexList[vertId2]) {
      this.edgeList[vertId1][vertId2] = 0;
      this.edgeList[vertId2][vertId1] = 0;
      return true;
    } else return false;
  }
}

var graph = new AMGraph();

graph.addVertex(1);
graph.addVertex(2);
graph.addVertex(3);

console.log(graph.getVertexValue(1));
console.log(graph.setVertexValue(1, "Hello"));
console.log(graph.addEdge(0,1, "Hi"));

console.log(graph);
