const { test, input } = require('./input');

const parseInput = (data) => {
    const dict = {};

    for (let i = 0; i < data.length; i++) {
        let split = data[i].split("-");
        if (!dict[split[0]]) {
            dict[split[0]] = [];
        }
        if (!dict[split[1]]) {
            dict[split[1]] = [];
        }
        dict[split[0]].push(split[1]);
        dict[split[1]].push(split[0]);
    }

    return dict;
};

const helperP1 = (visited, dict) => {
    const len = visited.length;
    const curNode = visited[len - 1];

    if (curNode === 'end') return 1;

    let count = 0;
    for (let i = 0; i < dict[curNode].length; i++) {
        let node = dict[curNode][i];
        if (visited.includes(node) && node[0] === node[0].toLowerCase()) {
            continue;
        }
        if (node === 'start') {
            continue;
        }

        const result = helperP1([...visited, node], dict);
        count += result;
    }

    return count;
};

const p1 = (data) => {
    const parsedData = parseInput(data);

    return helperP1(['start'], parsedData);
};

const invalidSmallCaves = (nodes) => {
    let dict = {};

    for (let i = 0; i < nodes.length; i++) {
        if (nodes[i] === nodes[i].toUpperCase()) {
            continue;
        }

        if (!dict[nodes[i]]) {
            dict[nodes[i]] = 0;
        }

        dict[nodes[i]]++;

        if (dict[nodes[i]] > 2) {
            return true;
        }
    }

    let count = 0;
    for (const key in dict) {
        if (dict[key] > 1) {
            count++;
        }
    }
    return count > 1 ? true : false;
};

const helperP2 = (visited, dict) => {
    const len = visited.length;
    const curNode = visited[len - 1];

    if (curNode === 'end') return 1;

    let count = 0;
    for (let i = 0; i < dict[curNode].length; i++) {
        let node = dict[curNode][i];
        if (invalidSmallCaves([...visited, node])) {
            continue;
        }
        if (node === 'start') {
            continue;
        }

        const result = helperP2([...visited, node], dict);
        count += result;
    }

    return count;
};

const p2 = (data) => {
    const parsedData = parseInput(data);

    return helperP2(['start'], parsedData);
};

console.log(p2(input));

