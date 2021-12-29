const { test, input } = require('./input');

const parseInput = (data) => {
    const template = data[0];
    const key = {};

    for (let i = 2; i < data.length; i++) {
        let pair = data[i].slice(0, 2);
        let value = data[i].slice(-1);

        key[pair] = value;
    }

    return [template, key];
};

const createStoreAndCount = (str) => {
    let store = {};
    let letterCount = {};

    for (let i = 0; i < str.length - 1; i++) {
        let pair = str.slice(i, i + 2);
        let letter = str[i];

        if (!store[pair]) {
            store[pair] = 0;
        }
        if (!letterCount[letter]) {
            letterCount[letter] = 0;
        }

        letterCount[letter]++;
        store[pair]++;
    }

    if (!letterCount[str[str.length - 1]]) {
        letterCount[str[str.length - 1]] = 0;
    }

    letterCount[str[str.length - 1]]++;

    return [store, letterCount];
};

const maxMinusMin = (obj) => {
    let min = Infinity;
    let max = 0;

    for (const letter in obj) {
        let count = obj[letter];

        if (min > count) {
            min = count;
        }

        if (max < count) {
            max = count;
        }
    }

    return max - min;
};

const takeSteps = (dict, store, letterCount, stepsToTake) => {
    while (stepsToTake > 0) {
        let temp = {};

        for (const pair in store) {
            let new1 = `${pair[0]}${dict[pair]}`;
            let new2 = `${dict[pair]}${pair[1]}`;
            if (!letterCount[dict[pair]]) {
                letterCount[dict[pair]] = 0;
            }
            if (!temp[new1]) {
                temp[new1] = 0;
            }
            if (!temp[new2]) {
                temp[new2] = 0;
            }

            letterCount[dict[pair]] += store[pair];
            temp[new1] += store[pair];
            temp[new2] += store[pair];

        }

        store = temp;
        stepsToTake--;
    }

    return letterCount;
};

const p1 = (data) => {
    let [template, dict] = parseInput(data);
    let [store, letterCount] = createStoreAndCount(template);
    let count = takeSteps(dict, store, letterCount, 10);

    return maxMinusMin(count);
};

const p2 = (data) => {
    let [template, dict] = parseInput(data);
    let [store, letterCount] = createStoreAndCount(template);
    let count = takeSteps(dict, store, letterCount, 40);

    return maxMinusMin(count);
};

console.log(p2(input));