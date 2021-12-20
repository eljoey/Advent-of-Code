const { test, input } = require('./input');

const parseData = (data) => {
    return data.split(',');
};

const dayCycle = (fishState, days) => {
    let state = new Array(9).fill(0);

    for (let i = 0; i < fishState.length; i++) {
        state[fishState[i]]++;
    }

    let count = fishState.length;
    while (days > 0) {
        let newFish = state[0];
        for (let i = 0; i < state.length - 1; i++) {


            state[i] = state[i + 1];

            if (i === 6) {
                state[i] += newFish;
            }
        }

        state[8] = newFish;
        count += newFish;

        days--;
    }

    return count;
};

const p1 = (data) => {
    let fishState = parseData(data);
    let cycles = 80;

    return dayCycle(fishState, cycles);
};

const p2 = (data) => {
    let fishState = parseData(data);
    let cycles = 256;
    let remainder = 256 % 7;


    return dayCycle(fishState, cycles);
};

console.log(p2(input));