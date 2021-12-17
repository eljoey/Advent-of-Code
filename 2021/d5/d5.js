const { test, input } = require('./input');

const parseData = (data) => {
    let output = data.map(input => {
        let x = input.replace(' -> ', ',').split(',');
        return x;
    });

    return output;
};

const markVertical = (layout, level, x2, y2) => {
    let start = Math.min(x2, y2);
    let end = Math.max(x2, y2);

    while (start <= end) {
        if (!layout[`${level}-${start}`]) {
            layout[`${level}-${start}`] = 0;
        }

        layout[`${level}-${start}`]++;
        start++;
    }

    return layout;
};

const markHorizontal = (layout, level, x1, y1) => {
    let start = Math.min(x1, y1);
    let end = Math.max(x1, y1);

    while (start <= end) {
        if (!layout[`${start}-${level}`]) {
            layout[`${start}-${level}`] = 0;
        }
        !layout[`${start}-${level}`]++;
        start++;
    }

    return layout;
};

const markDiagonal = (layout, x1, x2, y1, y2) => {
    x1 = Number(x1);
    y1 = Number(y1);
    const xDir = x1 - x2 > 0 ? -1 : 1;
    const yDir = y1 - y2 > 0 ? -1 : 1;
    let diff = Math.abs(x1 - x2);

    while (diff >= 0) {
        if (!layout[`${x1}-${y1}`]) {
            layout[`${x1}-${y1}`] = 0;
        }
        layout[`${x1}-${y1}`]++;

        x1 += xDir;
        y1 += yDir;
        diff--;
    }

    return layout;



};

const multipleLayers = (layers) => {
    let count = 0;

    for (const layer in layers) {
        if (layers[layer] >= 2) {
            count++;
        }
    }

    return count;
};

const p1 = (data) => {
    let ventLocations = parseData(data);
    let vents = {};

    for (let i = 0; i < ventLocations.length; i++) {
        let [x1, y1, x2, y2] = ventLocations[i];

        if (x1 === x2) {
            vents = markVertical(vents, x1, y1, y2);
        }
        if (y2 === y1) {
            vents = markHorizontal(vents, y2, x1, x2);
        }

    }

    return multipleLayers(vents);
};

const p2 = (data) => {
    let ventLocations = parseData(data);
    let vents = {};

    for (let i = 0; i < ventLocations.length; i++) {
        let [x1, y1, x2, y2] = ventLocations[i];

        if (x1 === x2) {
            vents = markVertical(vents, x1, y1, y2);
        }
        if (y2 === y1) {
            vents = markHorizontal(vents, y2, x1, x2);
        }
        if (y2 !== y1 && x1 !== x2) {
            vents = markDiagonal(vents, x1, x2, y1, y2);
        }

    }

    return multipleLayers(vents);
};

console.log(p2(input));