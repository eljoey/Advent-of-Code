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

console.log(findFirstWrongNum(input));