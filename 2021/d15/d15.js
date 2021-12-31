const { test, input } = require('./input');

const findShortedPath = (grid) => {
    const steps = [
        [-1, 0],
        [0, -1],
        [1, 0],
        [0, 1],
    ];

    const height = grid.length;
    const width = grid[0].length;

    let queueHead = { v: [0, 0, 0] };
    let costs = {};

    while (true) {
        let [cost, x, y] = queueHead.v;
        if (x === width - 1 && y === height - 1) return cost;

        for (const [dx, dy] of steps) {
            const xx = x + dx;
            const yy = y + dy;
            if (xx < 0 || xx >= width || yy < 0 || yy >= height) continue;
            let newCost = cost + grid[yy][xx];
            let key = `${xx}:${yy}`;
            if (!(key in costs) || costs[key] > newCost) {
                costs[key] = newCost;
                let p = queueHead;
                while (p.n != null && p.n.v[0] < newCost) p = p.n;
                p.n = { v: [newCost, xx, yy], n: p.n };
            }
        }

        if (!queueHead.n) {
            console.error("not found");
            process.exit(1);
        }
        queueHead = queueHead.n;
    }
};


const p1 = (data) => {
    data = data.map(a => a.split('').map(b => Number(b)));

    return findShortedPath(data);
};

const createRow = (grid) => {
    let copy = grid.map(a => a.map(b => b));
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[0].length; j++) {
            copy[i][j + grid.length] = (grid[i][j] + 1) <= 9 ? grid[i][j] + 1 : (grid[i][j] + 1) % 9;
            copy[i][j + grid.length * 2] = (grid[i][j] + 2) <= 9 ? grid[i][j] + 2 : (grid[i][j] + 2) % 9;
            copy[i][j + grid.length * 3] = (grid[i][j] + 3) <= 9 ? grid[i][j] + 3 : (grid[i][j] + 3) % 9;
            copy[i][j + grid.length * 4] = (grid[i][j] + 4) <= 9 ? grid[i][j] + 4 : (grid[i][j] + 4) % 9;
        }
    }
    return copy;
};

const p2 = (data) => {
    data = data.map(a => a.split('').map(b => Number(b)));
    template = [...data];
    let result = [];

    for (let i = 0; i < 5; i++) {
        result.push(...createRow(template));
        template = template.map(row => row.map(col => {
            col += 1;
            if (col > 9) return col % 9;

            return col;
        }));
    }
    return findShortedPath(result);
};

console.log(p2(input));

