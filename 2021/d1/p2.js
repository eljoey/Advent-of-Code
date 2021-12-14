const { input, test } = require('./input');

const windowSum = (data, index) => {
    const sum = data[index] + data[index - 1] + data[index - 2];

    return sum;
};

const increases = (data) => {
    let count = 0;

    for (let i = 3; i < data.length; i++) {
        let prevSum = windowSum(data, i - 1);
        let sum = windowSum(data, i);

        if (sum > prevSum) {
            count++;
        }
    }

    return count;
};

console.log(increases(input));