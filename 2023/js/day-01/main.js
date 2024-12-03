const { real, e1, e2 } = require('./inputs')

const p1 = (input) => {
    let result = 0

    for (let i = 0; i < input.length; i++) {
        const value = input[i]
        let numbers = []

        for (let j = 0; j < value.length; j++) {
            const element = value[j];

            if (!isNaN(element)) {
                numbers.push(element)
            }

        }

        const lineValue = numbers[0] + numbers[numbers.length - 1]
        result += Number(lineValue)
    }

    return result
}

const p2 = (input) => {
    let result = 0

    for (let i = 0; i < input.length; i++) {
        const value = input[i];
        let numbers = []

        for (let j = 0; j < value.length; j++) {
            const element = value[j];
            let number = getNum(element)
            let end = j

            while (!number && end < value.length) {
                end++
                const str = value.slice(0, end)
                console.log(i, str);
                number = getNum(str)
                console.log(j, number);
            }

            // console.log(i, number);
            if (number) numbers.push(number)
        }

        const lineValue = numbers[0] + numbers[numbers.length - 1]
        result += Number(lineValue)

    }
}

const getNum = (str) => {
    const dict = {
        one: 1,
        two: 2,
        three: 3,
        four: 4,
        five: 5,
        six: 6,
        seven: 7,
        eight: 8,
        nine: 9,
    }

    if (!Number(str) && dict[str]) {
        return dict[str]
    } else if (!!Number(str)) {
        return str
    }

    return null
}

console.log(p2(e2))