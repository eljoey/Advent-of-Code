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

    let sum = Number(arr[0]);

    let left = 0;
    let right = 0;
    while (sum != invalidNum) {
        if (sum < invalidNum) {
            sum += Number(arr[++right]);
        }
        if (sum > invalidNum) {
            sum -= Number(arr[left++]);
        }
    }
    let min = Infinity;
    let max = 0;

    for (let i = left; i <= right; i++) {
        let number = Number(arr[i]);

        if (number < min) {
            min = number;
        }
        if (number > max) {
            max = number;
        }
    }


    return min + max;
};

console.log(p2(input));