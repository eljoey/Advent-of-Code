const { test, input } = require('./input');

const isBingo = (board) => {
    // row check
    for (let i = 0; i < board.length; i++) {
        if (horizontalCheck(board[i])) {
            return true;
        }
    }
    // col check
    for (let i = 0; i < board[0].length; i++) {
        if (verticalCheck(board, i)) {
            return true;
        }
    }
    // diagonal check
    // if (diagonalCheck(board)) {
    //     return true;
    // }

    return false;
};

const horizontalCheck = (row) => {
    let result = true;

    for (let i = 0; i < row.length; i++) {
        if (row[i] !== 'X') {
            result = false;
        }
    }

    return result;
};

const verticalCheck = (card, index) => {
    let result = true;

    for (let i = 0; i < card[0].length; i++) {
        if (card[i][index] !== 'X') {
            result = false;
        }
    }

    return result;
};

const diagonalCheck = (card) => {
    // top left start
    let topLeftResult = true;
    let topLeftIndex = 0;
    for (let i = 0; i < card[0].length; i++) {
        if (card[i][topLeftIndex] !== 'X') {
            topLeftResult = false;
        }
        topLeftIndex++;
    }

    // bot left start
    let botLeftResult = true;
    let botLeftIndex = 0;
    for (let i = card[0].length - 1; i >= 0; i--) {
        if (card[i][botLeftIndex] !== 'X') {
            botLeftResult = false;
        }
        botLeftIndex++;
    }

    return topLeftResult || botLeftResult;
};

const parseData = (data) => {
    let numbers = data[0].split(',');
    let cards = [];
    let curCard = [];

    for (let i = 2; i < data.length; i++) {
        if (data[i] === '') {
            cards.push(curCard);
            curCard = [];
            continue;
        }

        let line = data[i].split(' ').filter(a => a !== '');
        curCard.push(line);
    }

    cards.push(curCard);

    return [numbers, cards];
};

const markNumber = (card, number) => {
    for (let i = 0; i < card.length; i++) {
        for (let j = 0; j < card[0].length; j++) {
            if (card[i][j] === number) {
                card[i][j] = 'X';
                break;
            }
        }
    }

    return card;
};

const getScore = (card, number) => {
    let sum = 0;
    for (let i = 0; i < card.length; i++) {
        for (let j = 0; j < card[0].length; j++) {
            if (card[i][j] !== 'X') {
                sum += Number(card[i][j]);
            }
        }
    }

    return sum * number;
};


const p1 = (data) => {
    let [numbers, cards] = parseData(data);
    let bingoCard = null;

    for (let i = 0; i < numbers.length; i++) {
        const number = numbers[i];

        for (let j = 0; j < cards.length; j++) {
            cards[j] = markNumber(cards[j], number);

            if (isBingo(cards[j])) {
                bingoCard = cards[j];
                return getScore(cards[j], number);
            }
        }
    }
};

const p2 = (data) => {
    let [numbers, cards] = parseData(data);
    let bingos = new Set();

    for (let i = 0; i < numbers.length; i++) {
        const number = numbers[i];


        for (let j = 0; j < cards.length; j++) {
            cards[j] = markNumber(cards[j], number);
            if (isBingo(cards[j])) {
                bingos.add(j);
            }

            if (bingos.size === cards.length) {
                let lastBingoCard = Array.from(bingos).pop();
                return getScore(cards[lastBingoCard], number);
            }
        }
    }

};

console.log(p2(input));