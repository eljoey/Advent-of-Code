const { e1, inputs } = require('./inputs')

const safeCheck = (input) => {
    let dir
    let p1 = 0
    let p2 = 1

    while (p2 < input.length) {
        let prev = input[p1]
        let cur = input[p2]
        const curDir = (cur - prev) > 0 ? 'pos' : 'neg'
        const diff = Math.abs(cur - prev)

        if (diff > 3 || diff <= 0) {
            return false
        }
        if (!dir) dir = curDir
        if (dir !== curDir) {
            return false
        }
        p1++
        p2++
    }

    return true

}

const p1 = (inputs) => {
    const splitInput = inputs.map(i => i.split(' '));
    let result = 0

    for (let i = 0; i < splitInput.length; i++) {
        const input = splitInput[i];
        let safe = safeCheck(input)

        if (safe) result++

    }

    return result
}

const p2 = (inputs) => {
    const splitInput = inputs.map(i => i.split(' '));
    let result = 0

    for (let i = 0; i < splitInput.length; i++) {
        const input = splitInput[i];
        let safe = false

        for (let i = 0; i < input.length; i++) {
            const removed = [...input.slice(0, i), ...input.slice(i + 1, input.length)]

            if (safeCheck(input)) {
                safe = true
                break
            }

            if (safeCheck(removed)) {
                safe = true
                break
            }
        }

        if (safe) result++

    }

    return result
}

console.log(p2(inputs));