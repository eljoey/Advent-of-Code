const input = require('./input');

let example = [
    'abc',
    '',
    'a',
    'b',
    'c',
    '',
    'ab',
    'ac',
    '',
    'a',
    'a',
    'a',
    'a',
    '',
    'b',
];

const formatInput = (arr) => {
    let formatted = [];
    let tempObj = [];
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === '') {
            formatted.push(tempObj);
            tempObj = [];
            continue;
        }

        tempObj.push(arr[i]);
    }
    formatted.push(tempObj);

    return formatted;
};

let properInputs = formatInput(input.input);
let exImputs = formatInput(example);

const customCustoms = (arr) => {
    let count = 0;
    let cache = {};
    for (let i = 0; i < arr.length; i++) {
        cache = {};
        for (let j = 0; j < arr[i].length; j++) {
            for (let k = 0; k < arr[i][j].length; k++) {
                let letter = arr[i][j][k];
                if (!cache[letter]) {
                    cache[letter] = 1;
                } else {
                    cache[letter] += 1;
                }
            }


        }
        for (const key in cache) {
            if (cache[key] === arr[i].length) {
                count++;
            }
        }
    }
    return count;
};

console.log(customCustoms(properInputs));
// console.log(customCustoms(exImputs));