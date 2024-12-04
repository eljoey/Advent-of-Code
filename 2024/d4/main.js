const { e1, inputs } = require('./inputs')


const p1 = (input) => {
    const word = 'XMAS'
    const rowLen = input[0].length
    const colLen = input.length

    const findWordRecursively = (row, col, curWord, curIndex, dir) => {
        if (curIndex >= word.length && curWord === word) {
            return 1
        }
        if (curIndex >= word.length && curWord !== word) return 0
        if (row >= rowLen) return 0
        if (col >= colLen) return 0
        if (row < 0) return 0
        if (col < 0) return 0
        if (input[row][col] !== word[curIndex]) return 0

        return findWordRecursively(row + dir[0], col + dir[1], curWord + input[row][col], curIndex + 1, dir)
    }

    let count = 0
    for (let i = 0; i < input.length; i++) {
        const row = input[i];

        for (let j = 0; j < row.length; j++) {
            const letter = row[j];
            const horizontal = findWordRecursively(i, j + 1, letter, 1, [0, 1])
            const verticalUp = findWordRecursively(i - 1, j, letter, 1, [-1, 0])
            const verticaldown = findWordRecursively(i + 1, j, letter, 1, [1, 0])
            const diagRightDown = findWordRecursively(i + 1, j + 1, letter, 1, [1, 1])
            const diagRightUp = findWordRecursively(i + 1, j - 1, letter, 1, [1, -1])
            const diagLeftUp = findWordRecursively(i - 1, j - 1, letter, 1, [-1, -1])
            const diagLeftDown = findWordRecursively(i - 1, j + 1, letter, 1, [-1, 1])
            const backwards = findWordRecursively(i, j - 1, letter, 1, [0, -1])
            count = count + horizontal + verticalUp + verticaldown + diagRightDown + diagRightUp + diagLeftUp + diagLeftDown + backwards

        }
    }
    return count
}

const p2 = (input) => {
    const rowLen = input[0].length
    const colLen = input.length
    let count = 0

    const isXmas = (row, col) => {
        if (row - 1 < 0 || col - 1 < 0) return 0
        if (row + 1 >= rowLen) return 0
        if (col + 1 >= colLen) return 0

        const diagLeftMAS = input[row - 1][col - 1] === 'M' && input[row + 1][col + 1] === 'S'
        const diagLeftSAM = input[row - 1][col - 1] === 'S' && input[row + 1][col + 1] === 'M'
        const diagRightMAS = input[row + 1][col - 1] === 'M' && input[row - 1][col + 1] === 'S'
        const diagRightSAM = input[row + 1][col - 1] === 'S' && input[row - 1][col + 1] === 'M'
        const diagLeftCheck = diagLeftMAS || diagLeftSAM
        const diagRightCheck = diagRightMAS || diagRightSAM

        if (diagLeftCheck && diagRightCheck) {
            return 1
        }

        return 0

    }

    for (let i = 0; i < input.length; i++) {
        const row = input[i]

        for (let j = 0; j < row.length; j++) {
            const letter = row[j]

            if (letter === 'A') {
                count += isXmas(i, j)
            }
        }
    }
    return count
}

console.log(p2(inputs));