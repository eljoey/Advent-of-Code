const { test, input } = require('./input');

const parseData = (data) => {
    return data.map(a => a.split(''));
};

const isLowPoint = (graph, row, col) => {
    let point = graph[row][col];
    let north = row > 0 ? graph[row - 1][col] : Infinity;
    let east = col < graph[0].length - 1 ? graph[row][col + 1] : Infinity;
    let south = row < graph.length - 1 ? graph[row + 1][col] : Infinity;
    let west = col > 0 ? graph[row][col - 1] : Infinity;

    if (point >= north) {
        return false;
    }
    if (point >= east) {
        return false;
    }
    if (point >= south) {
        return false;
    }
    if (point >= west) {
        return false;
    }

    return true;
};

const p1 = (data) => {
    const input = parseData(data);
    let riskLevel = 0;

    for (let i = 0; i < input.length; i++) {
        for (let j = 0; j < input[0].length; j++) {
            if (isLowPoint(input, i, j)) {
                riskLevel += 1 + Number(input[i][j]);
            }
        }
    }

    return riskLevel;
};

const basinSize = (graph, row, col) => {
    if (row < 0 || col < 0 || row >= graph.length || col >= graph[0].length) return 0;
    if (graph[row][col] === '9') return 0;
    graph[row][col] = '9';

    let north = basinSize(graph, row + 1, col);
    let south = basinSize(graph, row - 1, col);
    let east = basinSize(graph, row, col + 1);
    let west = basinSize(graph, row, col - 1);

    return 1 + north + east + west + south;
};

const p2 = (data) => {
    const input = parseData(data);
    const sizes = [];

    for (let i = 0; i < input.length; i++) {
        for (let j = 0; j < input[0].length; j++) {
            const basin = basinSize(input, i, j);

            if (basin > 0) {
                sizes.push(basin);
            }
        }
    }
    sizes.sort((a, b) => a - b);
    let sizeProduct = sizes[sizes.length - 1] * sizes[sizes.length - 2] * sizes[sizes.length - 3];

    return sizeProduct;
};

console.log(p2(input));