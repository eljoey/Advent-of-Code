const { example, input } = require('./input');

const p1 = (input) => {
    let cache = {};
    for (let i = 0; i < input.length; i++) {
        cache[input[i]] = [i + 1];
    }

    let limitP1 = 2020;
    let limitP2 = 30000000;
    let lastNumber = input[input.length - 1];
    for (let i = input.length; i < limitP2; i++) {
        if (cache[lastNumber].length === 1) {
            cache[0].push(i + 1);
            cacheZeroLen = cache[0].length;
            cache[0] = [cache[0][cacheZeroLen - 2], cache[0][cacheZeroLen - 1]];
            lastNumber = 0;
        } else {
            let lastNumLen = cache[lastNumber].length;
            let diff = cache[lastNumber][lastNumLen - 1] - cache[lastNumber][lastNumLen - 2];
            // let diff = cache[lastNumber][1] - cache[lastNumber][0];

            if (cache[diff]) {
                cache[diff].push(i + 1);
                cacheDiffLen = cache[diff].length;
                cache[diff] = [cache[diff][cacheDiffLen - 2], cache[diff][cacheDiffLen - 1]];
            } else {
                cache[diff] = [i + 1];
            }

            lastNumber = diff;
        }
    }
    return lastNumber;
};

console.log(p1(input));