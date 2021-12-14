const input = require('./input');

const binaryBoarding = (arr) => {
    let seats = {};
    let min = Infinity;
    let max = 0;
    for (let i = 0; i < arr.length; i++) {
        let binaryRow = arr[i].slice(0, 7).replace(/F/gi, '0').replace(/B/gi, '1');
        let binaryCol = arr[i].slice(7).replace(/L/gi, '0').replace(/R/gi, '1');
        let row = parseInt(binaryRow, 2);
        let col = parseInt(binaryCol, 2);

        let seatId = row * 8 + col;
        seats[seatId] = true;

        if (seatId < min) {
            min = seatId;
        }

        if (seatId > max) {
            max = seatId;
        }
    }
    for (let i = min; i < max; i++) {
        if (!seats[i]) {
            return i;
        }
    }
};

console.log(binaryBoarding(input.input));