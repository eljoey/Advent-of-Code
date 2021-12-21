const { test, input } = require('./input');

const parseData = (data) => {
    const output = [];

    for (let i = 0; i < data.length; i++) {
        let row = [];
        for (let j = 0; j < data[0].length; j++) {
            row.push(Number(data[i][j]));
        }
        output.push(row);
    }

    return output;
};

const flash = (graph, row, col) => {
    graph[row][col] = -100;

    // nw
    if (row - 1 >= 0 && col - 1 >= 0) {
        graph[row - 1][col - 1]++;
    }
    // n
    if (row - 1 >= 0) {
        graph[row - 1][col]++;
    }
    // ne
    if (row - 1 >= 0 && col + 1 < graph[0].length) {
        graph[row - 1][col + 1]++;
    }
    // e
    if (col + 1 < graph[0].length) {
        graph[row][col + 1]++;
    }
    // se
    if (row + 1 < graph.length && col + 1 < graph[0].length) {
        graph[row + 1][col + 1]++;
    }
    // s
    if (row + 1 < graph.length) {
        graph[row + 1][col]++;
    }
    // sw
    if (row + 1 < graph.length && col - 1 >= 0) {
        graph[row + 1][col - 1]++;
    }
    // w
    if (col - 1 >= 0) {
        graph[row][col - 1]++;
    }

    return graph;
};

const flashCheck = (graph) => {
    let result = false;

    for (let i = 0; i < graph.length; i++) {
        for (let j = 0; j < graph[0].length; j++) {

            if (graph[i][j] > 9) {
                graph = flash(graph, i, j);
                result = true;
            }

        }
    }

    return [result, graph];
};

const step = (graph) => {
    for (let i = 0; i < graph.length; i++) {
        for (let j = 0; j < graph[0].length; j++) {
            graph[i][j]++;

            if (graph[i][j] > 9) {
                graph = flash(graph, i, j);
            }

        }
    }

    let check = flashCheck(graph);

    while (check[0]) {
        check = flashCheck(graph);
    }

    return graph;
};

const countFlashes = (graph) => {
    let count = 0;
    for (let i = 0; i < graph.length; i++) {
        for (let j = 0; j < graph[0].length; j++) {
            if (graph[i][j] < 0) {
                count++;
            }

        }
    }

    return count;
};

const resetAfterFlashes = (graph) => {
    for (let i = 0; i < graph.length; i++) {
        for (let j = 0; j < graph[0].length; j++) {
            if (graph[i][j] < 0) {
                graph[i][j] = 0;
            }

        }
    }
    return graph;
};

const p1 = (data) => {
    let input = parseData(data);
    let stepsToTake = 100;
    let flashes = 0;
    let output = [];

    while (stepsToTake > 0) {
        output = step(input);
        flashes += countFlashes(output);
        output = resetAfterFlashes(output);

        stepsToTake--;
    }

    return flashes;
};

let isSyncronized = (graph) => {
    for (let i = 0; i < graph.length; i++) {
        for (let j = 0; j < graph[0].length; j++) {
            if (graph[i][j] !== 0) {
                return false;
            }
        }
    }

    return true;
};

const p2 = (data) => {
    let input = parseData(data);
    let steps = 1;
    let output = input;

    while (true) {
        output = step(output);
        output = resetAfterFlashes(output);

        if (isSyncronized(output)) {
            break;
        }
        steps++;
    }

    return steps;
};

console.log(p2(input));