let { example, input } = require('./input');

const p1 = (arr) => {
    let x = 0;
    let y = 0;
    let shipFacing = 0;
    let directions = {
        0: 'E',
        270: 'S',
        180: 'W',
        90: 'N'
    };

    for (let i = 0; i < arr.length; i++) {
        let instruction = arr[i].slice(0, 1);
        let value = Number(arr[i].slice(1));
        let turned = false;

        if (instruction === 'L') {
            shipFacing = (shipFacing + value) % 360;

            turned = true;
        }
        if (instruction === 'R') {
            shipFacing = (shipFacing - value) % 360;
            while (shipFacing < 0) {
                shipFacing += 360;
            }
            turned = true;
        }

        if (!turned) {
            let move = instruction;
            if (instruction === 'F') {
                move = directions[shipFacing];
            }

            switch (move) {
                case 'N':
                    y += value;
                    break;
                case 'S':
                    y -= value;
                    break;
                case 'E':
                    x += value;
                    break;
                case 'W':
                    x -= value;
                    break;
                default:
                    break;
            }
        }

    }
    let manhattanDis = Math.abs(x) + Math.abs(y);

    return manhattanDis;
};


const p2 = (arr) => {
    let ship = {
        x: 0,
        y: 0
    };

    // Relative to ship.
    let wp = {
        x: 10,
        y: 1
    };

    for (let i = 0; i < arr.length; i++) {
        let instruction = arr[i].slice(0, 1);
        let value = Number(arr[i].slice(1));

        switch (instruction) {
            case 'F':
                ship['x'] += wp['x'] * value;
                ship['y'] += wp['y'] * value;
                break;
            case 'L':
            case 'R':
                wp = rotateWp(wp, instruction, value);
                break;
            case 'N':
                wp['y'] += value;
                break;
            case 'S':
                wp['y'] -= value;
                break;
            case 'E':
                wp['x'] += value;
                break;
            case 'W':
                wp['x'] -= value;
                break;

            default:
                break;
        }
    }
    let manhattanDis = Math.abs(ship['x']) + Math.abs(ship['y']);
    return manhattanDis;
};

const rotateWp = (wp, instruction, value) => {
    let clockwise = {
        0: wp,
        90: {
            x: wp['y'],
            y: -wp['x']
        },
        180: {
            x: -wp['x'],
            y: -wp['y']
        },
        270: {
            x: -wp['y'],
            y: wp['x']
        }

    };
    let counterClockwise = {
        0: wp,
        90: {
            x: -wp['y'],
            y: wp['x']
        },
        180: {
            x: -wp['x'],
            y: -wp['y']
        },
        270: {
            x: wp['y'],
            y: -wp['x']
        }
    };

    if (instruction === 'L') {
        wp = counterClockwise[value];
    }
    if (instruction === 'R') {
        wp = clockwise[value];
    }

    return wp;

};

// console.log(p1(input));
console.log(p2(input));