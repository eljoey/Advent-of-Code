const { test, input } = require('./input');

const parseData = (data) => {
    const dots = [];
    const folds = [];

    for (let i = 0; i < data.length; i++) {
        let input = data[i];

        if (input === '') continue;

        if (input[0] === 'f') {
            let splitString = input.split('=');
            let axis = splitString[0][splitString[0].length - 1];
            let point = Number(splitString[1]);

            folds.push([axis, point]);
        } else {
            let splitString = input.split(',');

            dots.push([Number(splitString[1]), Number(splitString[0])]);
        }
    }

    return [dots, folds];
};

const createGraph = (dotCords) => {
    let rowMax = 0;
    let colMax = 0;

    for (let i = 0; i < dotCords.length; i++) {
        let [row, col] = dotCords[i];
        if (row > rowMax) {
            rowMax = row;
        };

        if (col > colMax) {
            colMax = col;
        }
    }

    let graph = [];
    for (let i = 0; i <= rowMax; i++) {
        let array = new Array(colMax + 1).fill('.');
        graph.push(array);
    }

    return graph;
};

const markDots = (dots, graph) => {
    for (let i = 0; i < dots.length; i++) {
        let [row, col] = dots[i];
        graph[row][col] = '#';
    }

    return graph;
};

const performYFold = (foldAxis, graph) => {
    let upper = graph.slice(0, foldAxis);
    let lower = graph.slice(foldAxis + 1);

    for (let i = 0; i < lower.length; i++) {
        for (let j = 0; j < lower[0].length; j++) {
            const element = lower[i][j];
            const oppositeRow = lower.length - 1 - i;

            if (element === '#') {
                upper[oppositeRow][j] = '#';
            }
        }
    }

    return upper;
};

const performXFold = (foldAxis, graph) => {
    let left = [];
    let right = [];

    for (let i = 0; i < graph.length; i++) {
        left.push(graph[i].slice(0, foldAxis));
        right.push(graph[i].slice(foldAxis + 1));
    }

    for (let i = 0; i < right.length; i++) {
        for (let j = 0; j < right[0].length; j++) {
            const element = right[i][j];
            const oppositeCol = right[i].length - 1 - j;

            if (element === '#') {
                left[i][oppositeCol] = '#';
            }
        }
    }

    return left;
};

const countMarks = (graph) => {
    let count = 0;

    for (let i = 0; i < graph.length; i++) {
        for (let j = 0; j < graph[0].length; j++) {
            const element = graph[i][j];

            if (element === '#') {
                count++;
            }
        }
    }

    return count;
};

const p1 = (data) => {
    const [dots, folds] = parseData(data);

    let graph = createGraph(dots);
    let markedGraph = markDots(dots, graph);


    if (folds[0][0] === 'y') {
        markedGraph = performYFold(folds[0][1], markedGraph);
    } else {
        markedGraph = performXFold(folds[0][1], markedGraph);
    }

    return countMarks(markedGraph);
};

const p2 = (data) => {
    const [dots, folds] = parseData(data);

    let graph = createGraph(dots);
    let markedGraph = markDots(dots, graph);

    for (let i = 0; i < folds.length; i++) {
        if (folds[i][0] === 'y') {
            markedGraph = performYFold(folds[i][1], markedGraph);
        } else {
            markedGraph = performXFold(folds[i][1], markedGraph);
        }
    }

    for (let i = 0; i < markedGraph.length; i++) {
        console.log(markedGraph[i].join(''));
    }
};

console.log(p2(input));