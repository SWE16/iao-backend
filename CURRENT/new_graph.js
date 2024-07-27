const { VertexType, PriorityQueue, Graph } = require('./utils');

// dijkstra's algorithm
function getPath(graph, start, finish) {
    const nodes = new PriorityQueue();
    const distances = {};
    const previous = {};
    let path = [];
    let smallest;

    for (let vertex in graph.adjacencyList) {
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
                path.push(graph.adjacencyList[smallest].toString());
                smallest = previous[smallest];
            }
            break;
        }

        if (smallest || distances[smallest] !== Infinity) {
            for (let neighbor in graph.adjacencyList[smallest].edges) {
                let nextNode = graph.adjacencyList[smallest].edges[neighbor];

                let candidate = distances[smallest] + nextNode.weight;
                let nextNeighbor = nextNode.name;

                if (candidate < distances[nextNeighbor]) {
                    distances[nextNeighbor] = candidate;
                    previous[nextNeighbor] = smallest;
                    nodes.enqueue(nextNeighbor, candidate);
                }
            }
        }
    }

    return path.concat(graph.adjacencyList[smallest].toString()).reverse();
}

let graph = new Graph();

// graph.addVertex('702', VertexType.ROOM);
// graph.addVertex('707', VertexType.ROOM);
// graph.addVertex('708', VertexType.ROOM);
// graph.addVertex('709', VertexType.ROOM);
// graph.addVertex('710', VertexType.ROOM);
// graph.addVertex('716', VertexType.ROOM);
// graph.addVertex('718', VertexType.ROOM);
// graph.addVertex('720', VertexType.ROOM);
// graph.addVertex('719', VertexType.ROOM);
// graph.addVertex('715', VertexType.ROOM);
// graph.addVertex('713', VertexType.ROOM);
// graph.addVertex('717', VertexType.ROOM);
// graph.addVertex('797', VertexType.ROOM);
// graph.addVertex('711', VertexType.ROOM);

// graph.addVertex('Stair 1', VertexType.STAIR);
// graph.addVertex('Stair 2', VertexType.STAIR);

// graph.addVertex('Hall 1', VertexType.HALL);
// graph.addVertex('Hall 2', VertexType.HALL);
// graph.addVertex('Hall 3', VertexType.HALL);
// graph.addVertex('Hall 4', VertexType.HALL);
// graph.addVertex('Hall 5', VertexType.HALL);
// graph.addVertex('Hall 6', VertexType.HALL);
// graph.addVertex('Hall 7', VertexType.HALL);

// graph.addEdge('702', 'Hall 7');
// graph.addEdge('Stair 2', 'Hall 7');
// graph.addEdge('Hall 7', 'Hall 6');

// graph.addEdge('708', 'Hall 6');
// graph.addEdge('707', 'Hall 6');
// graph.addEdge('Hall 6', 'Hall 5');

// graph.addEdge('710', 'Hall 5');
// graph.addEdge('709', 'Hall 5');
// graph.addEdge('Hall 5', 'Hall 4');

// graph.addEdge('716', 'Hall 4');
// graph.addEdge('711', 'Hall 4');
// graph.addEdge('Hall 4', 'Hall 3');

// graph.addEdge('713', 'Hall 3');
// graph.addEdge('715', 'Hall 3');
// graph.addEdge('797', 'Hall 3');
// graph.addEdge('Hall 3', 'Hall 2');

// graph.addEdge('718', 'Hall 2');
// graph.addEdge('717', 'Hall 2');
// graph.addEdge('Hall 2', 'Hall 1');

// graph.addEdge('719', 'Hall 1');
// graph.addEdge('720', 'Hall 1');
// graph.addEdge('Hall 2', 'Stair 1');

// graph.saveGraph('./saved_graphs/swift7');
// graph.loadGraph('./saved_graphs/swift7');

// graph.addVertex('Stair 1', VertexType.STAIR);

// graph.addVertex('Hall 1', VertexType.HALL);
// graph.addVertex('Hall 2', VertexType.HALL);
// graph.addVertex('Hall 3', VertexType.HALL);

// for (let i in [
//     '641',
//     '643',
//     '645',
//     '646',
//     '647',
//     '648',
//     '649',
//     '650',
//     '652',
//     '653',
//     '655',
//     '658',
//     '660',
//     '661',
//     '662',
//     '664',
//     '655',
// ]) {
//     graph.addVertex(i, VertexType.ROOM);
// }

console.log();

// graph.saveGraph('./saved_graphs/swift7');
graph.loadGraph('./saved_graphs/lindhall-00.json');
// graph.loadGraph('./saved_graphs/swift7');

console.log(getPath(graph, '0060', '0014'));
