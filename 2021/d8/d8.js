const { test, input } = require('./input');

const parseData = (data) => {
    let halves = data.map(string => string.split(' | '));

    let spacing = halves.map(element => {
        { return element.map(string => string.split(' ')); }
    });

    return spacing;
};

const determineOutputValues = (input) => {
    let values = [];
    for (let i = 0; i < input.length; i++) {
        let outputValues = input[i][1];
        values = [...values, ...outputValues];
    }

    return values;
};

const p1 = (data) => {
    const input = parseData(data);
    let outputValues = determineOutputValues(input);
    let count = 0;

    for (let i = 0; i < outputValues.length; i++) {
        let length = outputValues[i].length;
        if (length === 2) {
            count++;
        }
        if (length === 4) {
            count++;
        }
        if (length === 3) {
            count++;
        }
        if (length === 7) {
            count++;
        }
    }

    return count;
};



/*
0: the letter thats in 7 but not 1      
1: one of two letters in 4 but not 1    
    - then only one not in all 5 length inputs
2: one of two in 1                      
    - then only one not in all 6 length inputs
3: one of two letters in 4 but not 1    
    -then only one in all 5 length inputs
4: one of two in 8 but not in 4 or 7    
    -then only one not in all 6 length inputs
5: one of two in 1                      
    -then only one in all 6 length inputs
6: one of two in 8 but not in 4 or 7    
    -then only one in all 6 length inputs
*/

const firstPass = (one, four, seven, eight) => {
    const key = {};
    key[0] = seven.replace(one[0], '').replace(one[1], '').split('');
    key[1] = four.replace(one[0], '').replace(one[1], '').split('');
    key[2] = one.split('');
    key[3] = four.replace(one[0], '').replace(one[1], '').split('');
    key[4] = eight.replace(four[0], '').replace(four[1], '').replace(four[2], '').replace(four[3], '').replace(seven[0], '').replace(seven[1], '').replace(seven[2], '').split('');
    key[5] = one.split('');
    key[6] = eight.replace(four[0], '').replace(four[1], '').replace(four[2], '').replace(four[3], '').replace(seven[0], '').replace(seven[1], '').replace(seven[2], '').split('');

    return key;
};

const secondPass = (key, strings) => {
    let fiveLen = [strings[3], strings[4], strings[5]];
    let sixLen = [strings[6], strings[7], strings[8]];

    key[0] = key[0][0];
    key[1] = fiveLen.map(a => a.split('').includes(key[1][0])).includes(false) ? key[1][0] : key[1][1];
    key[2] = sixLen.map(a => a.split('').includes(key[2][0])).includes(false) ? key[2][0] : key[2][1];
    key[3] = fiveLen.map(a => a.split('').includes(key[3][0])).includes(false) ? key[3][1] : key[3][0];
    key[4] = sixLen.map(a => a.split('').includes(key[4][0])).includes(false) ? key[4][0] : key[4][1];
    key[5] = sixLen.map(a => a.split('').includes(key[5][0])).includes(false) ? key[5][1] : key[5][0];
    key[6] = sixLen.map(a => a.split('').includes(key[6][0])).includes(false) ? key[6][1] : key[6][0];

    return key;
};

const generateOutputValue = (key, values) => {
    let dict = {
        [`${key[0]}${key[1]}${key[2]}${key[4]}${key[5]}${key[6]}`.split('').sort().join('')]: 0,
        [`${key[2]}${key[5]}`.split('').sort().join('')]: 1,
        [`${key[0]}${key[2]}${key[3]}${key[4]}${key[6]}`.split('').sort().join('')]: 2,
        [`${key[0]}${key[2]}${key[3]}${key[5]}${key[6]}`.split('').sort().join('')]: 3,
        [`${key[1]}${key[2]}${key[3]}${key[5]}`.split('').sort().join('')]: 4,
        [`${key[0]}${key[1]}${key[3]}${key[5]}${key[6]}`.split('').sort().join('')]: 5,
        [`${key[0]}${key[1]}${key[3]}${key[4]}${key[5]}${key[6]}`.split('').sort().join('')]: 6,
        [`${key[0]}${key[2]}${key[5]}`.split('').sort().join('')]: 7,
        [`${key[0]}${key[1]}${key[2]}${key[3]}${key[4]}${key[5]}${key[6]}`.split('').sort().join('')]: 8,
        [`${key[0]}${key[1]}${key[2]}${key[3]}${key[5]}${key[6]}`.split('').sort().join('')]: 9,
    };

    let outputNum = '';
    for (let i = 0; i < values.length; i++) {
        outputNum += dict[values[i]];
    }

    return parseInt(outputNum);
};

const p2 = (data) => {
    const input = parseData(data);
    const values = input.map(a => a[0].sort((a, b) => a.length - b.length).map(b => b.split('').sort().join('')));
    const outputValues = input.map(a => a[1].map(b => b.split('').sort().join('')));
    let sum = 0;

    for (let i = 0; i < values.length; i++) {
        const one = values[i][0];
        const four = values[i][2];
        const seven = values[i][1];
        const eight = values[i][9];

        let parts = firstPass(one, four, seven, eight);
        parts = secondPass(parts, values[i]);

        sum += generateOutputValue(parts, outputValues[i]);
    }

    return sum;
};

console.log(p2(input));