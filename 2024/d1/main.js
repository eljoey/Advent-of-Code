const { e1, input } = require('./inputs')

const p1 = (inputs) => {
    const l1 = []
    const l2 = []

    const splitInput = inputs.map(i => i.split('   '));
    for (let i = 0; i < splitInput.length; i++) {
        const input = splitInput[i];

        l1.push(input[0])
        l2.push(input[1])
    }

    l1.sort()
    l2.sort()

    let result = 0
    for (let i = 0; i < l1.length; i++) {
        result += Math.abs(l1[i] - l2[i])
    }

    return result
}

const p2 = (inputs) => {
    const l1 = []
    const dict2 = {}

    const splitInput = inputs.map(i => i.split('   '));

    for (let i = 0; i < splitInput.length; i++) {
        const [input1, input2] = splitInput[i];

        l1.push(input1)

        if (!dict2[input2]) {
            dict2[input2] = 1
        } else {
            dict2[input2] = dict2[input2] + 1
        }

    }
    console.log(l1, dict2);
    let result = 0
    for (let i = 0; i < l1.length; i++) {
        const input = l1[i];
        const seen = dict2[input] || 0

        result += seen * input
    }

    return result
}

console.log(p2(input));