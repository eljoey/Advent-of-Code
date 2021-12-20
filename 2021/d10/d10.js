const { test, input } = require('./input');

const parseData = (data) => {
    return data.map(a => a.split(''));
};

const firstError = (line) => {
    const dict = {
        ')': '(',
        ']': '[',
        '}': '{',
        '>': '<'
    };
    const stack = [];

    for (let i = 0; i < line.length; i++) {
        if (!dict[line[i]]) {
            stack.push(line[i]);
        } else {
            let opening = stack.pop();

            if (opening !== dict[line[i]]) {
                return line[i];
            }
        }
    }

    return null;
};

const calcScore = (errors) => {
    let dict = {
        ')': 3,
        ']': 57,
        '}': 1197,
        '>': 25137
    };
    let score = 0;

    for (let i = 0; i < errors.length; i++) {
        const element = errors[i];

        score += dict[element];
    }

    return score;
};

const p1 = (data) => {
    const input = parseData(data);

    const errors = [];

    for (let i = 0; i < input.length; i++) {
        let error = firstError(input[i]);

        if (error) {
            console.log(i);
            errors.push(firstError(input[i]));
        }
    }

    return calcScore(errors);
};

const missing = (line) => {
    const dict = {
        ')': '(',
        ']': '[',
        '}': '{',
        '>': '<'
    };
    const stack = [];

    for (let i = 0; i < line.length; i++) {
        if (!dict[line[i]]) {
            stack.push(line[i]);
        } else {
            let opening = stack.pop();

            if (opening !== dict[line[i]]) {
                return;
            }
        }
    }

    return stack;
};

const calcPoints = (errorsArr) => {
    const dict = {
        '(': 1,
        '[': 2,
        '{': 3,
        '<': 4
    };

    let score = 0;

    for (let i = errorsArr.length - 1; i >= 0; i--) {
        score = score * 5 + dict[errorsArr[i]];
    }

    return score;
};

const p2 = (data) => {
    const input = parseData(data);
    const score = [];

    for (let i = 0; i < input.length; i++) {
        const element = input[i];
        const errors = missing(element);

        if (errors) {
            score.push(calcPoints(errors));
        }
    }
    score.sort((a, b) => a - b);
    let middle = Math.floor(score.length / 2);

    return score[middle];
};
console.log(p2(input));