const { input, test } = require('./input');

const p1 = (data) => {
    let gama = '';
    let epsilon = '';

    for (let i = 0; i < data[0].length; i++) {
        let count = commonValue(data, i);

        if (count > 0) {
            gama += '1';
            epsilon += '0';
        } else {
            gama += '0';
            epsilon += '1';
        }

    }

    return parseInt(gama, 2) * parseInt(epsilon, 2);
};

const commonValue = (data, index) => {
    let count = 0;
    for (let i = 0; i < data.length; i++) {
        let num = data[i][index];

        if (num === '0') {
            count -= 1;
        } else {
            count += 1;
        }
    }

    return count;
};


const p2 = (data) => {
    const oxygenFilter = (data, index) => {
        if (data.length === 1) return parseInt(data[0], 2);

        const mostCommon = commonValue(data, index) >= 0 ? '1' : '0';

        const filtered = data.filter(input => input[index] === mostCommon);

        return oxygenFilter(filtered, index + 1);
    };
    const c02Filter = (data, index) => {
        if (data.length === 1) return parseInt(data[0], 2);

        const mostCommon = commonValue(data, index) >= 0 ? '0' : '1';

        const filtered = data.filter(input => input[index] === mostCommon);

        return c02Filter(filtered, index + 1);
    };

    return c02Filter(data, 0) * oxygenFilter(data, 0);
};
console.log(p2(input));