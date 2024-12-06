const { e1, inputs } = require('./inputs')

const formatInput = (input) => {
    const rules = {}
    const pages = []

    let isRules = true
    for (let i = 0; i < input.length; i++) {
        if (input[i] === '') {
            isRules = false
        } else if (isRules) {
            const rule = input[i].split('|')

            if (!rules[rule[0]]) rules[rule[0]] = {}

            rules[rule[0]][rule[1]] = true
        } else {
            pages.push(input[i].split(','))
        }
    }

    return { rules, pages }
}

const getMiddleNumber = (arr) => {
    let middle = Math.floor(arr.length / 2)
    return Number(arr[middle])
}

const ruleCheck = (order, rules) => {
    let pass = true
    for (let j = 1; j < order.length; j++) {
        let number = order[j]

        for (let k = j - 1; k >= 0; k--) {
            let numToCheck = order[k]

            if (rules[number] && rules[number][numToCheck]) {
                pass = false
            }
        }
    }

    return pass
}

const p1 = (input) => {
    const { rules, pages } = formatInput(input)
    let result = 0
    for (let i = 0; i < pages.length; i++) {
        let order = pages[i]
        let pass = ruleCheck(order, rules)

        if (pass) {
            result += getMiddleNumber(order)
        }

        pass = true
    }

    return result
}

const reorder = (order, rules) => {
    do {
        for (let i = 1; i < order.length; i++) {
            let number = order[i]

            for (let j = i - 1; j >= 0; j--) {
                let numToCheck = order[j]

                if (rules[number] && rules[number][numToCheck]) {
                    const temp = order[i]
                    order[i] = numToCheck
                    order[j] = temp
                }
            }
        }
    } while (!ruleCheck(order, rules))

    return order
}

const p2 = (input) => {
    const { rules, pages } = formatInput(input)
    let result = 0
    for (let i = 0; i < pages.length; i++) {
        let order = pages[i]
        let pass = ruleCheck(order, rules)

        if (!pass) {
            const reordered = reorder(order, rules)
            result += getMiddleNumber(reordered)
        }

        pass = true
    }

    return result

}

console.log(p2(inputs));