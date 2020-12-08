const inputs = require('./input');
const input = inputs.input;
const example = inputs.example;

//p1
const handheldHalting = (arr) => {
    let count = 0;
    let index = 0;
    let cache = {};

    while (index < arr.length) {
        if (cache[index]) return false;

        let [instruction, ammount] = arr[index].split(' ');
        cache[index] = true;

        if (instruction === 'nop') {
            index++;
        }
        if (instruction === 'jmp') {
            index += Number(ammount);
        }
        if (instruction === 'acc') {
            count += Number(ammount);
            index++;
        }
    }
    return count;
};

//p2
const handleChanges = (arr) => {
    for (let i = 0; i < arr.length; i++) {
        let [instruction, ammount] = arr[i].split(' ');

        if (instruction === 'nop') {
            instruction = 'jmp';
            arr[i] = `${instruction} ${ammount}`;

            let doesntLoop = handheldHalting(arr);

            if (!!doesntLoop) return doesntLoop;

            // change back
            arr[i] = `nop ${ammount}`;
        } else if (instruction === 'jmp') {
            instruction = 'nop';
            arr[i] = `${instruction} ${ammount}`;

            let doesntLoop = handheldHalting(arr);

            if (!!doesntLoop) return doesntLoop;

            //change back
            arr[i] = `jmp ${ammount}`;
        }
    }
    return 'YOU DONE MESSED UP A ARON';
};

console.log(handleChanges(input));