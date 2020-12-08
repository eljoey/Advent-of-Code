const inputs = require('./input');
const input = inputs.input;
const example = inputs.example;

//p1
const handheldHalting = (arr) => {
    let count = 0;
    let index = 0;
    let cache = {};

    while (index < arr.length) {
        if (cache[index]) {
            return 0;
        }
        let [instruction, ammount] = arr[index].split(' ');
        let sign = ammount[0];
        ammount = ammount.slice(1);
        cache[index] = true;

        if (instruction === 'nop') {
            index++;
        } else if (instruction === 'jmp') {
            if (sign === '+') {
                index += Number(ammount);
            } else {
                index -= Number(ammount);
            }
        } else {
            if (sign === '+') {
                count += Number(ammount);
            } else {
                count -= Number(ammount);
            }
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

            if (!!doesntLoop) {
                return doesntLoop;
            }

            // change back
            arr[i] = `nop ${ammount}`;
        } else if (instruction === 'jmp') {
            instruction = 'nop';
            arr[i] = `${instruction} ${ammount}`;

            let doesntLoop = handheldHalting(arr);

            if (!!doesntLoop) {
                return doesntLoop;
            }

            //change back
            arr[i] = `jmp ${ammount}`;
        }

    }
    return false;
};

console.log(handleChanges(input));