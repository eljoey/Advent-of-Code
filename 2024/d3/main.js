const { e1, inputs, e2 } = require('./intput')

const getSum = (val) => {
    const rep1 = val.replace('mul(', '')
    const rep2 = rep1.replace(')', '')
    const rep3 = rep2.split(',')

    let num1 = rep3[0]
    let num2 = rep3[1]

    if (num1 === undefined || num2 === undefined) {
        return 0
    }

    const sum = num1 * num2

    return sum
}

const p1 = (inputs) => {
    const regex = /mul\(*\d+,*\d+\)/g
    const match = inputs.match(regex)
    const rep1 = match.map(i => i.replace('mul(', ''))
    const rep2 = rep1.map(i => i.replace(')', ''))
    const rep3 = rep2.map(i => i.split(','))
    let res = 0

    for (let i = 0; i < rep3.length; i++) {
        let num1 = rep3[i][0]
        let num2 = rep3[i][1]

        if (num1 === undefined || num2 === undefined) {
            continue
        }

        const sum = num1 * num2

        res += sum
    }
    return res
}

const p2 = (inputs) => {
    const regex = /(mul\(\d+,\d+\)|do\(\)|don't\(\))/g
    const match = inputs.match(regex)

    let res = 0
    let action = true
    let doStr = 'do()'
    let dontStr = "don't()"

    for (let i = 0; i < match.length; i++) {
        if (match[i] === doStr) {
            action = true
            continue
        }
        if (match[i] === dontStr) {
            action = false
            continue
        }
        if (!action) continue

        res += getSum(match[i])

    }
    return res
}

console.log(p2(inputs));