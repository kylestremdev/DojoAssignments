function Node (val) {
  this.value = val;
}

function ELGraph () {
  this.vertexList = [];
  this.edgeList = [];

  // Vertex Logic

  this.addVertex = function (val) {
    this.vertexList.push(new Node(val));
    return this.vertexList.length - 1;
  }

  this.removeVertex = function (vertId) {
    this.vertexList.splice(vertId, 1);
    return this;
  }

  this.getVertexValue = function (vertId) {
    return this.vertexList[vertId].value;
  }

  this.setVertexValue = function (vertId, val) {
    this.vertexList[vertId].value = val;
  }

  // Edge Logic

  this.addEdge = function (vertId1, vertId2, val) {
    if (this.vertexList[vertId1] && this.vertexList[vertId2]) {
      this.edgeList.push([vertId1, vertId2, val]);
      return true;
    } else return false;
  }

  this.removeEdge = function (vertId1, vertId2) {
    if (this.vertexList[vertId1] && this.vertexList[vertId2]) {
      for (var i in this.edgeList) {
        if (this.edgeList[i][0] == vertId1 && this.edgeList[i][1] == vertId2) {
          this.edgeList.splice(i, 1);
          return true;
        }
      }
      return false;
    } else return false;
  }

  this.getEdgeValue = function (vertId1, vertId2) {
    if (this.vertexList[vertId1] && this.vertexList[vertId2]) {
      for (var i in this.edgeList) {
        if (this.edgeList[i][0] == vertId1 && this.edgeList[i][1] == vertId2) {
          return this.edgeList[i][2];
        }
      } return false;
    } else return false;
  }

  this.setEdgeValue = function (vertId1, vertId2, val) {
    if (this.vertexList[vertId1] && this.vertexList[vertId2]) {
      for (var i in this.edgeList) {
        if (this.edgeList[i][0] == vertId1 && this.edgeList[i][1] == vertId2) {
          this.edgeList[i][2] = val;
          return true;
        }
      } return false;
    } else return false;
  }
}

module.exports = ELGraph;
