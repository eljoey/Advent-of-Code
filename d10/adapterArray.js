let { example, input } = require('./input');

const p1 = (arr) => {
    arr.sort((a, b) => a - b);
    // 3 starts at one because gary's a cheater
    let gary = {
        1: 0,
        3: 1
    };

    for (let i = 0; i < arr.length; i++) {
        let diff = arr[i] - arr[i - 1];
        if (i === 0) {
            diff = arr[i];
        }

        if (diff === 1) {
            gary[1]++;
        }
        if (diff === 3) {
            gary[3]++;
        }
    }
    return gary[1] * gary[3];
};
const p2 = (arr) => {
    arr.sort((a, b) => a - b);
    // is this retarded? its gotta be, but it works so yolo
    arr[-1] = 0;
    let cache = {};

    const helper = (index) => {
        if (index === arr.length - 1) {
            return 1;
        }

        if (cache[index]) {
            return cache[index];
        }

        let newIndex = index + 1;
        let diff = arr[newIndex] - arr[index];
        let count = 0;

        while (diff <= 3) {
            let result = helper(newIndex);
            cache[newIndex] = result;
            count += result;

            newIndex++;
            diff = arr[newIndex] - arr[index];
        }

        return count;

    };

    return helper(-1);
};

console.log(p2(input));
