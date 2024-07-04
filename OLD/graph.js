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

    addVertex(vertex) {
        if (!this.adjacencyList[vertex]) {
            this.adjacencyList[vertex] = [];
        }
    }

    addEdge(vertexA, vertexB, weight = 1) {
        this.adjacencyList[vertexA].push({ node: vertexB, weight });
        this.adjacencyList[vertexB].push({ node: vertexA, weight });
    }

    // dijkstra's algorithm
    getPath(start, finish) {
        const nodes = new PriorityQueue();
        const distances = {};
        const previous = {};
        let path = [];
        let smallest;

        for (let vertex in this.adjacencyList) {
            if (vertex === start) {
                distances[vertex] = 0;
                nodes.enqueue(vertex, 0);
            } else {
                distances[vertex] = Infinity;
                nodes.enqueue(vertex, Infinity);
            }
            previous[vertex] = null;
        }

        while (nodes.values.length) {
            smallest = nodes.dequeue().val;

            // path done so find it
            if (smallest === finish) {
                while (previous[smallest]) {
                    path.push(smallest);
                    smallest = previous[smallest];
                }
                break;
            }

            if (smallest || distances[smallest] !== Infinity) {
                for (let neighbor in this.adjacencyList[smallest]) {
                    let nextNode = this.adjacencyList[smallest][neighbor];

                    let candidate = distances[smallest] + nextNode.weight;
                    let nextNeighbor = nextNode.node;

                    if (candidate < distances[nextNeighbor]) {
                        distances[nextNeighbor] = candidate;
                        previous[nextNeighbor] = smallest;
                        nodes.enqueue(nextNeighbor, candidate);
                    }
                }
            }
        }

        return path.concat(smallest).reverse();
    }
}

let graph = new Graph();
graph.addVertex('702');
graph.addVertex('707');
graph.addVertex('708');
graph.addVertex('709');
graph.addVertex('710');
graph.addVertex('716');
graph.addVertex('718');
graph.addVertex('720');
graph.addVertex('719');
graph.addVertex('715');
graph.addVertex('713');
graph.addVertex('717');
graph.addVertex('797');
graph.addVertex('711');

graph.addVertex('Stair 1');
graph.addVertex('Stair 2');

graph.addVertex('Hall 1');
graph.addVertex('Hall 2');
graph.addVertex('Hall 3');
graph.addVertex('Hall 4');
graph.addVertex('Hall 5');
graph.addVertex('Hall 6');
graph.addVertex('Hall 7');

graph.addEdge('702', 'Hall 7');
graph.addEdge('Stair 2', 'Hall 7');
graph.addEdge('Hall 7', 'Hall 6');

graph.addEdge('708', 'Hall 6');
graph.addEdge('707', 'Hall 6');
graph.addEdge('Hall 6', 'Hall 5');

graph.addEdge('710', 'Hall 5');
graph.addEdge('709', 'Hall 5');
graph.addEdge('Hall 5', 'Hall 4');

graph.addEdge('716', 'Hall 4');
graph.addEdge('711', 'Hall 4');
graph.addEdge('Hall 4', 'Hall 3');

graph.addEdge('713', 'Hall 3');
graph.addEdge('715', 'Hall 3');
graph.addEdge('797', 'Hall 3');
graph.addEdge('Hall 3', 'Hall 2');

graph.addEdge('718', 'Hall 2');
graph.addEdge('717', 'Hall 2');
graph.addEdge('Hall 2', 'Hall 1');

graph.addEdge('719', 'Hall 1');
graph.addEdge('720', 'Hall 1');
graph.addEdge('Hall 2', 'Stair 1');

console.log(graph.getPath('715', '708'));
