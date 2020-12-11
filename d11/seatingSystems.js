let { example, input } = require('./input');

const seatsOccupied = (input) => {
    let current = getMatrix(input);
    let prev = [];
    let occupied = 0;

    while (!checkEqual(current, prev)) {
        prev = current;
        current = [];

        for (let i = 0; i < prev.length; i++) {
            let row = [];
            for (let j = 0; j < prev[0].length; j++) {
                let occupiedBefore = false;
                if (prev[i][j] === '#') {
                    occupiedBefore = true;
                }

                let seat = whatShouldIBe(prev, i, j);
                row.push(seat);

                if (occupiedBefore && seat === 'L') {
                    occupied--;
                }
                if (!occupiedBefore && seat === '#') {
                    occupied++;
                }
            }

            current.push(row);
        }
    }

    return occupied;
};

const getMatrix = (arr) => {
    let matrix = [];
    for (let i = 0; i < arr.length; i++) {
        let split = arr[i].split('');
        matrix.push(split);
    }
    return matrix;
};

const whatShouldIBe = (arr, row, col) => {
    let curSeat = arr[row][col];

    if (curSeat === '.') {
        return '.';
    }
    let count = 0;
    let resultObj = {};

    resultObj['NW'] = checkSeat(arr, row - 1, col - 1, 'NW');
    resultObj['W'] = checkSeat(arr, row, col - 1, 'W');
    resultObj['SW'] = checkSeat(arr, row + 1, col - 1, 'SW');
    resultObj['S'] = checkSeat(arr, row + 1, col, 'S');
    resultObj['SE'] = checkSeat(arr, row + 1, col + 1, 'SE');
    resultObj['E'] = checkSeat(arr, row, col + 1, 'E');
    resultObj['NE'] = checkSeat(arr, row - 1, col + 1, 'NE');
    resultObj['N'] = checkSeat(arr, row - 1, col, 'N');

    for (const key in resultObj) {
        if (resultObj[key]) {
            count++;
        }
    }

    if (count >= 5 && curSeat === '#') {
        return 'L';
    }
    if (count === 0 && curSeat === 'L') {
        return '#';
    }

    return curSeat;
};

const checkSeat = (arr, row, col, direction) => {
    if (row < 0 || row >= arr.length || col < 0 || col > arr.length) {
        return false;
    }

    let seat = arr[row][col];

    if (seat === '.') {
        seat = nextClosest(arr, row, col, direction);
    }

    if (seat === '#') {
        return true;
    }

    return false;
};

const checkEqual = (first, second) => {
    return JSON.stringify(first) === JSON.stringify(second);
};

const nextClosest = (arr, row, col, direction) => {
    let directions = {
        'NW': [-1, -1],
        'W': [0, -1],
        'SW': [1, -1],
        'S': [1, 0],
        'SE': [1, 1],
        'E': [0, 1],
        'NE': [-1, 1],
        'N': [-1, 0]
    };
    let newRow = row + directions[direction][0];
    let newCol = col + directions[direction][1];

    let result = checkSeat(arr, newRow, newCol, direction);

    if (result) {
        return '#';
    }

    return 'L';
};


console.log(seatsOccupied(input));

