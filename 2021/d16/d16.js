const { test, input } = require('./input');

const hexToBinary = (str) => {
    const key = {
        '0': '0000',
        '1': '0001',
        '2': '0010',
        '3': '0011',
        '4': '0100',
        '5': '0101',
        '6': '0110',
        '7': '0111',
        '8': '1000',
        '9': '1001',
        'A': '1010',
        'B': '1011',
        'C': '1100',
        'D': '1101',
        'E': '1110',
        'F': '1111',
    };

    let result = '';
    for (let i = 0; i < str.length; i++) {
        const value = key[str[i]];

        result = result + value;
    }

    return result;
};

const getLiteralValuePacket = (str) => {
    let index = 6;

    while (true) {
        if (str[index] === '0') {
            break;
        }
        index += 5;
    }

    let packet = str.slice(0, index + 5);
    let remainingStr = str.slice(index + 5);
    return [packet, remainingStr];
};

const parseOperatorValue = (str) => {
    const lengthTypeId = str[6];

    if (lengthTypeId === '0') {
        const packetLengthBinary = str.slice(7, 22);
        const packetLength = parseInt(packetLengthBinary, 2);
        let [packets, tail] = getPackets(str.slice(22, 22 + packetLength));
        let result = [packets];

        while (tail.length) {
            [packets, tail] = getPackets(tail);
            result.push(packets);
        }

        return [[str.slice(0, 6), result], str.slice(22 + packetLength)];
    } else {
        let packetNumber = parseInt(str.slice(7, 18), 2);
        let remaining = str.slice(18);
        let packets = [];
        while (packetNumber > 0) {
            let [packet, tail] = getPackets(remaining);
            packets.push(packet);
            remaining = tail;
            packetNumber--;
        }

        return [[str.slice(0, 6), packets], remaining];
    }
};

const getPackets = (str) => {
    const typeId = str.slice(3, 6);
    let packet = '';
    let tail = '';

    if (typeId === '100') {
        [packet, tail] = getLiteralValuePacket(str);
    } else {
        [packet, tail] = parseOperatorValue(str);
    }

    return [packet, tail];
};

const sumOfVersions = (arr) => {
    let stack = [...arr];
    const result = [];
    while (stack.length) {
        const next = stack.pop();

        if (Array.isArray(next)) {
            stack.push(...next);
        } else {
            result.push(next);
        }
    }

    let sum = 0;
    for (let i = 0; i < result.length; i++) {
        let versionStr = result[i].slice(0, 3);
        let versionNum = parseInt(versionStr, 2);

        sum += versionNum;
    }

    return sum;
};

const p1 = (input) => {
    const binaryStr = hexToBinary(input);
    let packets = getPackets(binaryStr)[0];

    return sumOfVersions(packets);
};

const arrayDepth = (arr) => {
    return Array.isArray(arr) ?
        1 + Math.max(...arr.map(arrayDepth)) :
        0;
};

const literalValue = (str) => {
    let binaryString = '';
    let index = 6;

    while (true) {
        binaryString = binaryString + str.slice(index + 1, index + 5);
        if (str[index] === '0') {
            break;
        }
        index += 5;
    }

    return parseInt(binaryString, 2);
};

const mathString = (arr) => {
    // let depth = arrayDepth(arr);
    let result = [];
    const key = {
        '000': '+',
        '001': '*',
        '010': 'min',
        '011': 'max',
        '100': 'literal',
        '101': 'greater',
        '110': 'less',
        '111': 'equal'
    };
    // console.log(depth);
    // if (depth === 1) {
    //     let digits = [];
    //     for (let i = 0; i < arr.length; i++) {
    //         digits.push(literalValue(arr[i]));
    //     }
    //     return digits;
    // } else {
    //     const typeId = arr[0].slice(3, 6);
    //     console.log(typeId);
    //     if (typeId === '100') {
    //         result.push(literalValue(arr[0]));
    //     } else {
    //         result.push(key[typeId]);
    //     }
    //     result.push(mathString(arr.slice(1)));

    // }
    // console.log('RESULT 2', result);

    for (let i = 0; i < arr.length; i++) {
        const element = arr[i];

        if (typeof element === 'string') {
            const typeId = element.slice(3, 6);
            if (typeId === '100') {
                result.push(literalValue(element));
            } else {
                result.push(key[typeId]);
            }
        } else {
            result.push(mathString(arr[i]));
        }
    }


    return result;
};

const doMath = (arr) => {
    let instruction = arr[0];
    if (instruction === '+') {
        let sum = 0;
        for (let i = 0; i < arr[1].length; i++) {
            let element = arr[1][i];

            if (typeof element !== 'number') {
                element = doMath(arr[1][i]);
            }

            sum += element;
        }
        // console.log('SUM: ', sum);
        return sum;
    } else if (instruction === '*') {
        let product = 1;
        for (let i = 0; i < arr[1].length; i++) {
            let element = arr[1][i];

            if (typeof element !== 'number') {
                element = doMath(arr[1][i]);
            }

            product *= element;
        }
        // console.log('PRODUCT: ', product);
        return product;
    } else if (instruction === 'min') {
        let min = Infinity;
        for (let i = 0; i < arr[1].length; i++) {
            let element = arr[1][i];

            if (typeof element !== 'number') {
                element = doMath(arr[1][i]);
            }
            min = Math.min(min, element);
        }
        // console.log('MIN: ', min);
        return min;
    } else if (instruction === 'max') {
        let max = Number.NEGATIVE_INFINITY;
        for (let i = 0; i < arr[1].length; i++) {
            let element = arr[1][i];

            if (typeof element !== 'number') {
                element = doMath(arr[1][i]);
            }
            max = Math.max(max, element);
        }
        // console.log('MAX: ', max);
        return max;
    } else if (instruction === 'greater') {
        let num1 = arr[1][0];
        let num2 = arr[1][1];

        if (typeof num1 !== 'number') {
            num1 = doMath(arr[1][0]);
        }
        if (typeof num2 !== 'number') {
            num2 = doMath(arr[1][0]);
        }

        // console.log('GREATER: ', num1, num2);
        return num1 > num2 ? 1 : 0;
    } else if (instruction === 'less') {
        let num1 = arr[1][0];
        let num2 = arr[1][1];

        if (typeof num1 !== 'number') {
            num1 = doMath(arr[1][0]);
        }
        if (typeof num2 !== 'number') {
            num2 = doMath(arr[1][0]);
        }

        // console.log('LESS: ', num1, num2);
        return num1 < num2 ? 1 : 0;
    } else if (instruction === 'equal') {
        let num1 = arr[1][0];
        let num2 = arr[1][1];

        if (typeof num1 !== 'number') {
            num1 = doMath(arr[1][0]);
        }
        if (typeof num2 !== 'number') {
            num2 = doMath(arr[1][0]);
        }

        // console.log('EQUAL: ', num1, num2);
        return num1 === num2 ? 1 : 0;
    }
};

const p2 = (input) => {
    const binaryStr = hexToBinary(input);
    let packets = getPackets(binaryStr)[0];
    // console.log(JSON.stringify(packets));

    let formula = mathString(packets);
    // console.log(JSON.stringify(formula));
    return doMath(formula);
};

console.log(p2(input));