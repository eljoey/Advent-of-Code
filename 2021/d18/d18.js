const { test, input } = require('./input');

const getArrayDepth = (value) => {
    return Array.isArray(value) ? 1 + Math.max(...value.map(getArrayDepth)) : 0;
};

const split = (arr) => {
    let performedSplit = false;
    for (var i = 0; i < arr.length; i++) {
        if (Array.isArray(arr[i])) {
            [arr[i], performedSplit] = split(arr[i]);
        } else if (arr[i] >= 10) {
            performedSplit = true;
            let left = Math.floor(arr[i] / 2);
            let right = Math.ceil(arr[i] / 2);
            arr[i] = [left, right];
        }
        if (performedSplit) {
            return [arr, true];
        }


    }

    return [arr, performedSplit];
};

const replaceLeft = (str, numStr) => {
    for (let i = str.length - 1; i >= 0; i--) {
        let found = false;
        let string = '';
        let index = i;
        while (str[index] !== ',' && str[index] !== '[' && str[index] !== ']') {
            string = str[index] + string;
            index--;
            found = true;
        }

        if (found) {
            let newNum = Number(string) + Number(numStr);

            return str.substr(0, index + 1) + newNum + str.substr(i + 1);
        }
    }

    return str;
};

const replaceRight = (str, numStr) => {
    for (let i = 0; i < str.length; i++) {
        let found = false;
        let string = '';
        let index = i;
        while (str[index] !== ',' && str[index] !== '[' && str[index] !== ']') {
            string = string + str[index];
            index++;
            found = true;
        }

        if (found) {
            let newNum = Number(string) + Number(numStr);
            return str.substr(0, i) + newNum + str.substr(index);
        }
    }

    return str;
};

const explode = (arr) => {
    const arrStr = JSON.stringify(arr);
    let depth = 0;

    for (let i = 0; i < arrStr.length; i++) {
        const element = arrStr[i];
        if (depth === 5) {
            let start = i - 1;
            let end = i;
            while (arrStr[end] !== ']') end++;
            const [left, right] = arrStr.slice(i, end).split(',');
            let leftSide = replaceLeft(arrStr.slice(0, start), left);
            let rightSide = replaceRight(arrStr.slice(end + 1), right);
            return JSON.parse(leftSide + '0' + rightSide);
        }
        else if (element === '[') depth++;
        else if (element === ']') depth--;
    }
};

const magnitude = (arr) => {
    while (getArrayDepth(arr) > 1) {
        for (let i = 0; i < arr.length; i++) {
            if (Array.isArray(arr[i]) && getArrayDepth(arr[i]) > 1) {
                arr[i] = magnitude(arr[i]);
            } else if (Array.isArray(arr[i])) {
                arr[i] = (arr[i][0] * 3) + (arr[i][1] * 2);
            }
        }
    }
    return (arr[0] * 3) + (arr[1] * 2);
};

const p1 = (input) => {
    let result = input[0];

    for (let i = 1; i < input.length; i++) {
        const element = input[i];
        result = [result, element];
        while (true) {
            while (getArrayDepth(result) > 4) {
                result = explode(result);
            }

            [result, performedSplit] = split(result);

            if (getArrayDepth(result) <= 4 && !performedSplit) {
                break;
            }
        }
    }
    return magnitude(result);
};

const p2 = (input) => {
    let max = 0;
    for (let i = 0; i < input.length; i++) {
        for (let j = 0; j < input.length; j++) {
            if (i === j) continue;
            let pair = [input[i], input[j]];
            let mag = 0;
            while (true) {
                while (getArrayDepth(pair) > 4) {
                    pair = explode(pair);
                }

                [pair, performedSplit] = split(pair);

                if (getArrayDepth(pair) <= 4 && !performedSplit) {
                    break;
                }
            }

            mag = magnitude(pair);
            if (mag > max) {
                max = mag;
            }
        }
    }
    return max;
};

console.log(p2(input));
