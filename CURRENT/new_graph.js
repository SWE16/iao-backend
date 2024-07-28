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

function searchLinder(graphdata, start, finish) {
    let graph = new Graph();

    // graph.loadGraph('./LINDHALL/lindhall-with16.json');

    console.log(graphdata);

    graph.loadGraphDirect(graphdata);

    console.log(graph.adjacencyList);

    const result = getPath(graph, start, finish);

    console.log(result);

    if (result.length == 1) {
        return ['Error: Rooms Not Connected'];
    }

    return result;
}

module.exports = { searchLinder };
