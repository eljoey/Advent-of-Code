const { example, input } = require('./input');

const createStartCube = (arr) => {
    let newArr = [];
    let padding = Math.ceil((15 - arr.length) / 2);
    console.log(padding);
    for (let i = 0; i < padding; i++) {
        newArr.push(['.', '.', '.', '.', '.', '.', '.', '.', '.', '.',]);
    }

    for (const string of arr) {
        let addPadding = string.padStart(padding + arr.length, 'X').padEnd(padding * 2 + arr.length, 'X');
        let split = addPadding.split('');
        newArr.push(split);
    }

    for (let i = 0; i < padding; i++) {
        newArr.push(['.', '.', '.', '.', '.', '.', '.', '.', '.', '.',]);
    }
    console.log(newArr.length);
};

createStartCube(input);