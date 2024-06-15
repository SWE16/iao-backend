const fs = require('node:fs');
const path = require('path');

let VertexType = {
    ROOM: 'room',
    HALL: 'hall',
    STAIR: 'stair',
    ELEVATOR: 'elevator',
};

class PriorityQueue {
    constructor() {
        this.values = [];
    }

    enqueue(val, priority) {
        this.values.push({ val, priority });
        this.values.sort((a, b) => a.priority - b.priority);
    }

    dequeue() {
        return this.values.shift();
    }
}

class Graph {
    constructor() {
        this.adjacencyList = {};
    }

    addVertex(vertex, type) {
        if (!this.adjacencyList[vertex]) {
            this.adjacencyList[vertex] = {
                name: vertex,
                edges: [],
                type,
                toString() {
                    return `${this.name} (${this.type}) `;
                },
            };
        }
    }

    addEdge(vertexA, vertexB, weight = 1) {
        this.adjacencyList[vertexA].edges.push({ node: vertexB, weight });
        this.adjacencyList[vertexB].edges.push({ node: vertexA, weight });
    }

    saveGraph(location) {
        try {
            fs.writeFileSync(
                path.join(__dirname, location),
                JSON.stringify(this.adjacencyList)
            );
        } catch (err) {
            console.error(err);
        }
    }

    loadGraph(location) {
        try {
            const data = fs.readFileSync(path.join(__dirname, location));
            this.adjacencyList = JSON.parse(data);

            for (let vertex in this.adjacencyList) {
                this.adjacencyList[vertex].toString = function () {
                    return `${this.name} (${this.type}) `;
                };
            }
        } catch (err) {
            console.error(err);
        }
    }
}

module.exports = { VertexType, PriorityQueue, Graph };
