const { example, example2, input } = require('./input');

const p1 = (arr) => {
    let storage = {};
    let skip = 'X';
    let mask;

    for (let i = 0; i < arr.length; i++) {
        let input = arr[i];
        let isMask = input[1] === 'a' ? true : false;

        if (isMask) {
            mask = input.slice(7);
        } else {
            let [address, value] = input.split(' = ');
            value = parseInt(value).toString(2).padStart(36, '0');
            value = applyMask(value, mask, skip);
            value = parseInt(value, 2);
            storage[address] = value;
        }
    }

    let sum = 0;
    for (const key in storage) {
        sum += storage[key];
    }
    return sum;
};

const applyMask = (num, mask, skipVal) => {
    let newNum = [...num];
    for (let i = 0; i < mask.length; i++) {
        let maskVal = mask[i];

        if (maskVal !== skipVal) {
            newNum[i] = maskVal;
        }
    }
    return newNum.join('');
};

const p2 = (arr) => {
    let memRegex = /^mem\[(\d+)\].=.(\d+)$/;
    let storage = {};
    let mask;

    for (let i = 0; i < arr.length; i++) {
        let input = arr[i];
        let isMask = input.includes('mask') ? true : false;
        let skip = '0';

        if (isMask) {
            mask = input.slice(7);
        } else {
            let memArr = memRegex.exec(input);
            let memory = memArr[1];
            let value = memArr[2];
            memory = parseInt(memory).toString(2).padStart(36, '0');
            memory = applyMask(memory, mask, skip);
            let memSlots = getMemSlots(memory);
            memSlots.forEach(bitVal => {
                let number = parseInt(bitVal, 2);
                storage[number] = value;
            });
        }

    }
    let sum = 0;
    for (const key in storage) {
        sum = sum + Number(storage[key]);
    }
    return sum;
};

const getMemSlots = (bitString) => {
    const results = new Set([]);

    const helper = (index, string) => {
        let strArr = [...string];

        if (index === string.length) {
            results.add(string);
            return;
        }

        let swapDone = false;
        for (let i = index; i < string.length; i++) {
            let val = string[i];

            if (val === 'X') {
                swapDone = true;
                strArr[i] = '0';
                helper(i + 1, strArr.join(''));
                strArr[i] = '1';
                helper(i + 1, strArr.join(''));
            }
        }

        if (!swapDone) {
            results.add(string);
        }

    };
    helper(0, bitString);
    return results;
};

console.log(p2(input));
