let { example, input } = require('./input');

const p1 = (arr) => {
    let ship = {
        x: 0,
        y: 0
    };
    let shipFacing = 0;


    for (let i = 0; i < arr.length; i++) {
        let instruction = arr[i].slice(0, 1);
        let value = Number(arr[i].slice(1));

        switch (instruction) {
            case 'L':
                shipFacing = (shipFacing + value) % 360;
                break;
            case 'R':
                shipFacing += 360;
                shipFacing = (shipFacing - value) % 360;
                break;
            case 'F':
            case 'N':
            case 'E':
            case 'S':
            case 'W':
                ship = moveShip(ship, shipFacing, instruction, value);
                break;
            default:
                break;
        }
    }
    let x = Math.abs(ship['x']);
    let y = Math.abs(ship['y']);
    let manhattanDis = x + y;

    return manhattanDis;
};

const moveShip = (ship, shipFacing, instruction, value) => {
    let directions = {
        0: 'E',
        90: 'N',
        180: 'W',
        270: 'S',

    };
    let move = instruction;

    if (instruction === 'F') {
        move = directions[shipFacing];
    }

    switch (move) {
        case 'N':
            ship['y'] += value;
            break;
        case 'E':
            ship['x'] += value;
            break;
        case 'S':
            ship['y'] -= value;
            break;
        case 'W':
            ship['x'] -= value;
            break;
        default:
            break;
    }
    return ship;
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
            case 'E':
                wp['x'] += value;
                break;
            case 'S':
                wp['y'] -= value;
                break;
            case 'W':
                wp['x'] -= value;
                break;

            default:
                break;
        }
    }

    let x = Math.abs(ship['x']);
    let y = Math.abs(ship['y']);
    let manhattanDis = x + y;

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

console.log(p1(input));
console.log(p2(input));