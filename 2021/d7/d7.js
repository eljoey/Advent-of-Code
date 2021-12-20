const { test, input } = require('./input');

const median = arr => {
    const mid = Math.floor(arr.length / 2),
        nums = [...arr].sort((a, b) => a - b);
    return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
};

const average = (array) => array.reduce((a, b) => a + b) / array.length;

const fuelCost = (steps) => {
    let cost = 0;

    while (steps > 0) {
        cost += steps;
        steps--;
    }

    return cost;
};

const p1 = (data) => {
    const med = median(data);
    let fuel = 0;

    for (let i = 0; i < data.length; i++) {
        fuel += Math.abs(data[i] - med);
    }

    return fuel;
};

const p2 = (data) => {
    const avg = Math.ceil(average(data));
    const med = median(data);
    let fuel = Infinity;
    for (let i = med; i <= avg; i++) {
        let cost = 0;
        for (let j = 0; j < data.length; j++) {
            cost += fuelCost(Math.abs(data[j] - i));
        }
        if (cost < fuel) {
            fuel = cost;
        }
    }

    return fuel;
};

console.log(p2(input));