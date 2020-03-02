class Stop {
    constructor(id) {
        this.id = id
        this.lines = []
        this.siblings = []
    }

    getKey() {
        return this.id
    }

    getNeighbors() {
        return this.siblings
    }

    isOnLine(lineId) {
        if(!this.lines.includes(lineId)) {
            this.lines.push(lineId)
        }
    }

    isSiblingOf(stopId) {
        if(!this.siblings.includes(stopId)) {
            this.siblings.push(stopId)
        }
    }
}

class Comparator {
    /**
     * @param {function(a: *, b: *)} [compareFunction] - It may be custom compare function that, let's
     * say may compare custom objects together.
     */
    constructor(compareFunction) {
        this.compare = compareFunction || Comparator.defaultCompareFunction;
    }

    /**
     * Default comparison function. It just assumes that "a" and "b" are strings or numbers.
     * @param {(string|number)} a
     * @param {(string|number)} b
     * @returns {number}
     */
    static defaultCompareFunction(a, b) {
        if (a === b) {
            return 0;
        }

        return a < b ? -1 : 1;
    }

    /**
     * Checks if two variables are equal.
     * @param {*} a
     * @param {*} b
     * @return {boolean}
     */
    equal(a, b) {
        return this.compare(a, b) === 0;
    }

    /**
     * Checks if variable "a" is less than "b".
     * @param {*} a
     * @param {*} b
     * @return {boolean}
     */
    lessThan(a, b) {
        return this.compare(a, b) < 0;
    }

    /**
     * Checks if variable "a" is greater than "b".
     * @param {*} a
     * @param {*} b
     * @return {boolean}
     */
    greaterThan(a, b) {
        return this.compare(a, b) > 0;
    }

    /**
     * Checks if variable "a" is less than or equal to "b".
     * @param {*} a
     * @param {*} b
     * @return {boolean}
     */
    lessThanOrEqual(a, b) {
        return this.lessThan(a, b) || this.equal(a, b);
    }

    /**
     * Checks if variable "a" is greater than or equal to "b".
     * @param {*} a
     * @param {*} b
     * @return {boolean}
     */
    greaterThanOrEqual(a, b) {
        return this.greaterThan(a, b) || this.equal(a, b);
    }

    /**
     * Reverses the comparison order.
     */
    reverse() {
        const compareOriginal = this.compare;
        this.compare = (a, b) => compareOriginal(b, a);
    }
}

class Heap {
    /**
     * @constructs Heap
     * @param {Function} [comparatorFunction]
     */
    constructor(comparatorFunction) {
        if (new.target === Heap) {
            throw new TypeError('Cannot construct Heap instance directly');
        }

        // Array representation of the heap.
        this.heapContainer = [];
        this.compare = new Comparator(comparatorFunction);
    }

    /**
     * @param {number} parentIndex
     * @return {number}
     */
    getLeftChildIndex(parentIndex) {
        return (2 * parentIndex) + 1;
    }

    /**
     * @param {number} parentIndex
     * @return {number}
     */
    getRightChildIndex(parentIndex) {
        return (2 * parentIndex) + 2;
    }

    /**
     * @param {number} childIndex
     * @return {number}
     */
    getParentIndex(childIndex) {
        return Math.floor((childIndex - 1) / 2);
    }

    /**
     * @param {number} childIndex
     * @return {boolean}
     */
    hasParent(childIndex) {
        return this.getParentIndex(childIndex) >= 0;
    }

    /**
     * @param {number} parentIndex
     * @return {boolean}
     */
    hasLeftChild(parentIndex) {
        return this.getLeftChildIndex(parentIndex) < this.heapContainer.length;
    }

    /**
     * @param {number} parentIndex
     * @return {boolean}
     */
    hasRightChild(parentIndex) {
        return this.getRightChildIndex(parentIndex) < this.heapContainer.length;
    }

    /**
     * @param {number} parentIndex
     * @return {*}
     */
    leftChild(parentIndex) {
        return this.heapContainer[this.getLeftChildIndex(parentIndex)];
    }

    /**
     * @param {number} parentIndex
     * @return {*}
     */
    rightChild(parentIndex) {
        return this.heapContainer[this.getRightChildIndex(parentIndex)];
    }

    /**
     * @param {number} childIndex
     * @return {*}
     */
    parent(childIndex) {
        return this.heapContainer[this.getParentIndex(childIndex)];
    }

    /**
     * @param {number} indexOne
     * @param {number} indexTwo
     */
    swap(indexOne, indexTwo) {
        const tmp = this.heapContainer[indexTwo];
        this.heapContainer[indexTwo] = this.heapContainer[indexOne];
        this.heapContainer[indexOne] = tmp;
    }

    /**
     * @return {*}
     */
    peek() {
        if (this.heapContainer.length === 0) {
            return null;
        }

        return this.heapContainer[0];
    }

    /**
     * @return {*}
     */
    poll() {
        if (this.heapContainer.length === 0) {
            return null;
        }

        if (this.heapContainer.length === 1) {
            return this.heapContainer.pop();
        }

        const item = this.heapContainer[0];

        // Move the last element from the end to the head.
        this.heapContainer[0] = this.heapContainer.pop();
        this.heapifyDown();

        return item;
    }

    /**
     * @param {*} item
     * @return {Heap}
     */
    add(item) {
        this.heapContainer.push(item);
        this.heapifyUp();
        return this;
    }

    /**
     * @param {*} item
     * @param {Comparator} [comparator]
     * @return {Heap}
     */
    remove(item, comparator = this.compare) {
        // Find number of items to remove.
        const numberOfItemsToRemove = this.find(item, comparator).length;

        for (let iteration = 0; iteration < numberOfItemsToRemove; iteration += 1) {
            // We need to find item index to remove each time after removal since
            // indices are being changed after each heapify process.
            const indexToRemove = this.find(item, comparator).pop();

            // If we need to remove last child in the heap then just remove it.
            // There is no need to heapify the heap afterwards.
            if (indexToRemove === (this.heapContainer.length - 1)) {
                this.heapContainer.pop();
            } else {
                // Move last element in heap to the vacant (removed) position.
                this.heapContainer[indexToRemove] = this.heapContainer.pop();

                // Get parent.
                const parentItem = this.parent(indexToRemove);

                // If there is no parent or parent is in correct order with the node
                // we're going to delete then heapify down. Otherwise heapify up.
                if (
                    this.hasLeftChild(indexToRemove)
                    && (
                        !parentItem
                        || this.pairIsInCorrectOrder(parentItem, this.heapContainer[indexToRemove])
                    )
                ) {
                    this.heapifyDown(indexToRemove);
                } else {
                    this.heapifyUp(indexToRemove);
                }
            }
        }

        return this;
    }

    /**
     * @param {*} item
     * @param {Comparator} [comparator]
     * @return {Number[]}
     */
    find(item, comparator = this.compare) {
        const foundItemIndices = [];

        for (let itemIndex = 0; itemIndex < this.heapContainer.length; itemIndex += 1) {
            if (comparator.equal(item, this.heapContainer[itemIndex])) {
                foundItemIndices.push(itemIndex);
            }
        }

        return foundItemIndices;
    }

    /**
     * @return {boolean}
     */
    isEmpty() {
        return !this.heapContainer.length;
    }

    /**
     * @return {string}
     */
    toString() {
        return this.heapContainer.toString();
    }

    /**
     * @param {number} [customStartIndex]
     */
    heapifyUp(customStartIndex) {
        // Take the last element (last in array or the bottom left in a tree)
        // in the heap container and lift it up until it is in the correct
        // order with respect to its parent element.
        let currentIndex = customStartIndex || this.heapContainer.length - 1;

        while (
            this.hasParent(currentIndex)
            && !this.pairIsInCorrectOrder(this.parent(currentIndex), this.heapContainer[currentIndex])
            ) {
            this.swap(currentIndex, this.getParentIndex(currentIndex));
            currentIndex = this.getParentIndex(currentIndex);
        }
    }

    /**
     * @param {number} [customStartIndex]
     */
    heapifyDown(customStartIndex = 0) {
        // Compare the parent element to its children and swap parent with the appropriate
        // child (smallest child for MinHeap, largest child for MaxHeap).
        // Do the same for next children after swap.
        let currentIndex = customStartIndex;
        let nextIndex = null;

        while (this.hasLeftChild(currentIndex)) {
            if (
                this.hasRightChild(currentIndex)
                && this.pairIsInCorrectOrder(this.rightChild(currentIndex), this.leftChild(currentIndex))
            ) {
                nextIndex = this.getRightChildIndex(currentIndex);
            } else {
                nextIndex = this.getLeftChildIndex(currentIndex);
            }

            if (this.pairIsInCorrectOrder(
                this.heapContainer[currentIndex],
                this.heapContainer[nextIndex],
            )) {
                break;
            }

            this.swap(currentIndex, nextIndex);
            currentIndex = nextIndex;
        }
    }

    /**
     * Checks if pair of heap elements is in correct order.
     * For MinHeap the first element must be always smaller or equal.
     * For MaxHeap the first element must be always bigger or equal.
     *
     * @param {*} firstElement
     * @param {*} secondElement
     * @return {boolean}
     */
    /* istanbul ignore next */
    pairIsInCorrectOrder(firstElement, secondElement) {
        throw new Error(`
      You have to implement heap pair comparision method
      for ${firstElement} and ${secondElement} values.
    `);
    }
}

class MinHeap extends Heap {
    /**
     * Checks if pair of heap elements is in correct order.
     * For MinHeap the first element must be always smaller or equal.
     * For MaxHeap the first element must be always bigger or equal.
     *
     * @param {*} firstElement
     * @param {*} secondElement
     * @return {boolean}
     */
    pairIsInCorrectOrder(firstElement, secondElement) {
        return this.compare.lessThanOrEqual(firstElement, secondElement);
    }
}

class PriorityQueue extends MinHeap {
    constructor() {
        // Call MinHip constructor first.
        super();

        // Setup priorities map.
        this.priorities = new Map();

        // Use custom comparator for heap elements that will take element priority
        // instead of element value into account.
        this.compare = new Comparator(this.comparePriority.bind(this));
    }

    /**
     * Add item to the priority queue.
     * @param {*} item - item we're going to add to the queue.
     * @param {number} [priority] - items priority.
     * @return {PriorityQueue}
     */
    add(item, priority = 0) {
        this.priorities.set(item, priority);
        super.add(item);
        return this;
    }

    /**
     * Remove item from priority queue.
     * @param {*} item - item we're going to remove.
     * @param {Comparator} [customFindingComparator] - custom function for finding the item to remove
     * @return {PriorityQueue}
     */
    remove(item, customFindingComparator) {
        super.remove(item, customFindingComparator);
        this.priorities.delete(item);
        return this;
    }

    /**
     * Change priority of the item in a queue.
     * @param {*} item - item we're going to re-prioritize.
     * @param {number} priority - new item's priority.
     * @return {PriorityQueue}
     */
    changePriority(item, priority) {
        this.remove(item, new Comparator(this.compareValue));
        this.add(item, priority);
        return this;
    }

    /**
     * Find item by ite value.
     * @param {*} item
     * @return {Number[]}
     */
    findByValue(item) {
        return this.find(item, new Comparator(this.compareValue));
    }

    /**
     * Check if item already exists in a queue.
     * @param {*} item
     * @return {boolean}
     */
    hasValue(item) {
        return this.findByValue(item).length > 0;
    }

    /**
     * Compares priorities of two items.
     * @param {*} a
     * @param {*} b
     * @return {number}
     */
    comparePriority(a, b) {
        if (this.priorities.get(a) === this.priorities.get(b)) {
            return 0;
        }
        return this.priorities.get(a) < this.priorities.get(b) ? -1 : 1;
    }

    /**
     * Compares values of two items.
     * @param {*} a
     * @param {*} b
     * @return {number}
     */
    compareValue(a, b) {
        if (a === b) {
            return 0;
        }
        return a < b ? -1 : 1;
    }
}

const _intersect = (arr1, arr2) => [arr1, arr2].reduce((a, b) => a.filter(c => b.includes(c)))

function dijkstra(graph, startVertex) {
    // Init helper variables that we will need for Dijkstra algorithm.
    const distances = {};
    const visitedVertices = {};
    const previousVertices = {};
    const queue = new PriorityQueue();

    // Init all distances with infinity assuming that currently we can't reach
    // any of the vertices except the start one.
    Object.values(graph).forEach((vertex) => {
        distances[vertex.getKey()] = Infinity;
        previousVertices[vertex.getKey()] = null;
    });

    // We are already at the startVertex so the distance to it is zero.
    distances[startVertex.getKey()] = 0;

    // Init vertices queue.
    queue.add(startVertex, distances[startVertex.getKey()]);

    // Iterate over the priority queue of vertices until it is empty.
    while (!queue.isEmpty()) {
        // Fetch next closest vertex.
        const currentVertex = queue.poll();

        // Iterate over every unvisited neighbor of the current vertex.
        currentVertex.getNeighbors().forEach((neighbor) => {
            // Don't visit already visited vertices.
            if (!visitedVertices[neighbor.getKey()]) {

                const fromLines = _intersect(neighbor.lines, currentVertex.lines)
                const previousLine = previousVertices[currentVertex.getKey()] && previousVertices[currentVertex.getKey()].fromLine
                const fromLine = fromLines.length > 1 && fromLines.includes(previousLine) ? previousLine : fromLines[0]
                const weigth = previousVertices[currentVertex.getKey()] && previousVertices[currentVertex.getKey()].fromLine !== fromLine ? 1 : 0
                console.log(fromLines, previousLine, fromLine, weigth)

                // Update distances to every neighbor from current vertex.
                const existingDistanceToNeighbor = distances[neighbor.getKey()];
                const distanceToNeighborFromCurrent = distances[currentVertex.getKey()] + weigth;

                // If we've found shorter path to the neighbor - update it.
                if (distanceToNeighborFromCurrent < existingDistanceToNeighbor) {
                    distances[neighbor.getKey()] = distanceToNeighborFromCurrent;

                    // Change priority of the neighbor in a queue since it might have became closer.
                    if (queue.hasValue(neighbor)) {
                        queue.changePriority(neighbor, distances[neighbor.getKey()]);
                    }

                    // Remember previous closest vertex.
                    previousVertices[neighbor.getKey()] = {...currentVertex, fromLine };
                }

                // Add neighbor to the queue for further visiting.
                if (!queue.hasValue(neighbor)) {
                    queue.add(neighbor, distances[neighbor.getKey()]);
                }
            }
        });

        // Add current vertex to visited ones to avoid visiting it again later.
        visitedVertices[currentVertex.getKey()] = currentVertex;
    }

    // Return the set of shortest distances to all vertices and the set of
    // shortest paths to all vertices in a graph.
    return {
        distances,
        previousVertices,
    };
}


const run = (input) => {
    const [line1, line2, line3, ...data] = input
    const [nbLines, nbStations] = line1.split(' ')
    const [startStation, endStation] = line2.split(' ')

    const stops = {}

    data.forEach((dataLine, lineId) => {
        let prev;
        dataLine.split(' ').forEach(stopId => {
            let stop = stops[stopId];
            if (!stop) {
                stop = new Stop(stopId)
            }

            stop.isOnLine(lineId)
            if (prev) {
              stop.isSiblingOf(prev)
              prev.isSiblingOf(stop)
            }

            stops[stopId] = stop
            prev = stop
        });
    });

    const top = dijkstra(stops, stops[startStation])
    if (isFinite(top.distances[endStation] + 1)) {
        console.log(top.distances[endStation] + 1)
        return top.distances[endStation] + 1
    } else {
        console.log(-1)
        return -1
    }

}

module.exports = run