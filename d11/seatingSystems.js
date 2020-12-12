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

const checkEqual = (first, second) => {
    return JSON.stringify(first) === JSON.stringify(second);
};

const whatShouldIBe = (arr, row, col) => {
    let curSeat = arr[row][col];

    if (curSeat === '.') {
        return '.';
    }
    let count = 0;

    count += checkIfOccupied(arr, row - 1, col - 1, 'NW');
    count += checkIfOccupied(arr, row, col - 1, 'W');
    count += checkIfOccupied(arr, row + 1, col - 1, 'SW');
    count += checkIfOccupied(arr, row + 1, col, 'S');
    count += checkIfOccupied(arr, row + 1, col + 1, 'SE');
    count += checkIfOccupied(arr, row, col + 1, 'E');
    count += checkIfOccupied(arr, row - 1, col + 1, 'NE');
    count += checkIfOccupied(arr, row - 1, col, 'N');

    if (count >= 5 && curSeat === '#') {
        return 'L';
    }
    if (count === 0 && curSeat === 'L') {
        return '#';
    }

    // seat is unchanged
    return curSeat;
};

const checkIfOccupied = (arr, row, col, direction) => {
    if (row < 0 || row >= arr.length || col < 0 || col > arr.length) {
        return 0;
    }

    let seat = arr[row][col];

    if (seat === '.') {
        seat = nextClosest(arr, row, col, direction);
    }

    if (seat === '#') {
        return 1;
    }

    return 0;
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

    let result = checkIfOccupied(arr, newRow, newCol, direction);

    if (result === 1) {
        return '#';
    }

    return 'L';
};

console.log(seatsOccupied(input));

