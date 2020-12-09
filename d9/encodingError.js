const { input, example } = require('./input');

const findFirstWrongNum = (arr) => {
    const last25 = [];
    let last25Pointer = 0;

    for (let i = 0; i < 25; i++) {
        last25.push(arr[i]);
    }

    for (let i = 25; i < arr.length; i++) {
        let cache = {};
        let found = false;
        for (let j = 0; j < last25.length; j++) {
            let num = last25[j];
            cache[num] = true;

            if (cache[arr[i] - num]) {
                found = true;
            }
        }

        if (found) {
            last25[last25Pointer] = arr[i];
            last25Pointer = (last25Pointer + 1) % 25;
        } else {
            return arr[i];
        }
    }
};

const p2 = (arr) => {
    let invalidNum = findFirstWrongNum(arr);

    let nums = [];
    let sum = 0;

    let startIndex = 0;
    let index = 0;
    while (startIndex < arr.length) {
        sum += Number(arr[index]);
        nums.push(arr[index]);

        if (sum == invalidNum) {
            return sumMinMax(nums);
        }
        if (sum > invalidNum) {
            sum = 0;
            nums = [];
            index = startIndex;
            startIndex++;
        }

        index++;
    }
    return 'uh oh';
};

const sumMinMax = (arr) => {
    let min = Infinity;
    let max = 0;
    for (let i = 0; i < arr.length; i++) {
        let num = Number(arr[i]);
        if (num < min) {
            min = num;
        }
        if (num > max) {
            max = num;
        }
    }
    return min + max;
};

console.log(p2(input));