const input = require('./input');
const inputs = input.input;

const getBagsArr = (string) => {
    let regex = /(bag+?)(s\b|\b)/gi;
    let numRegex = /\d/gi;
    let newString = string
        .replace(regex, '')
        .replace(numRegex, '')
        .replace('.', '')
        .replace('contain', ',')
        .split(',');
    let x = newString.map(i => {
        return i.trim();
    });

    return x;
};

const createStorage = (arr) => {
    let storage = {};
    for (let i = 0; i < arr.length; i++) {
        let result = getBagsArr(arr[i]);
        storage[result[0]] = { children: [] };

        for (let j = 1; j < result.length; j++) {
            if (result[j] === 'no other') {
                break;
            }

            storage[result[0]].children.push(result[j]);
        }
    }
    return storage;
};

// console.log(getBagsArr(inputs[87]));

const findContainsGold = () => {
    let storage = createStorage(inputs);

    const chilrenHelper = (child) => {
        if (child === 'shiny gold') {
            return true;
        }

        let found = false;

        let chilrenOfChild = storage[child].children;
        for (let i = 0; i < chilrenOfChild.length; i++) {
            let answer = chilrenHelper(chilrenOfChild[i]);

            if (answer) {
                found = true;
            }
        }
        return found;
    };

    let count = 0;
    for (const key in storage) {
        let found = false;
        let children = storage[key].children;

        for (let i = 0; i < children.length; i++) {
            let answer = chilrenHelper(children[i]);
            if (answer) {
                found = true;
            }
        }
        if (found) {
            count++;
        }
    }

    return count;
};

console.log(findContainsGold());