const { input, test } = require('./input');

const p1 = (data) => {
    let pos = [0, 0];

    for (let i = 0; i < data.length; i++) {
        const [dir, amnt] = data[i].split(' ');

        pos = move(dir, Number(amnt), pos);
    }

    return pos[0] * pos[1];
};

const move = (direction, ammount, curPos) => {
    if (direction === 'forward') {
        curPos[0] += ammount;
    }
    if (direction === 'up') {
        curPos[1] -= ammount;
    }
    if (direction === 'down') {
        curPos[1] += ammount;
    }

    return curPos;
};

const p2 = (data) => {
    let horizontal = 0;
    let depth = 0;
    let aim = 0;

    for (let i = 0; i < data.length; i++) {
        let [input, ammount] = data[i].split(' ');

        if (input === 'down') {
            aim += Number(ammount);
        }

        if (input === 'up') {
            aim -= Number(ammount);
        }

        if (input === 'forward') {
            horizontal += Number(ammount);
            depth += aim * Number(ammount);
        }

    }

    return horizontal * depth;
};

console.log(p2(input));