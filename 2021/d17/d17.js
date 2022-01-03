const { test, input } = require('./input');

const parseData = (data) => {
    const cords = data.split(',').map(a => a.split('='));
    const xCords = cords[0][1].split('..').map(a => Number(a));
    const yCords = cords[1][1].split('..').map(a => Number(a));

    return [xCords, yCords];
};

const keepChecking = (positions, targetCords) => {
    const [x, y] = positions;
    const [xTar, yTar] = targetCords;
    let result = false;

    if (x < xTar[1] && y > yTar[0]) {
        result = true;
    }
    return result;
};

const isSuccessful = (positions, targetCords) => {
    const [x, y] = positions;
    const [xTar, yTar] = targetCords;
    let result = false;

    if (x >= xTar[0] && x <= xTar[1]) {
        if (y <= yTar[1] && y >= yTar[0]) {
            result = true;
        }
    }

    return result;
};

const higestPos = (arr) => {
    let highest = Number.NEGATIVE_INFINITY;

    for (let i = 0; i < arr.length; i++) {
        let yVel = arr[i][1];

        if (yVel > highest) {
            highest = yVel;
        }
    }

    let result = 0;
    for (let i = 1; i <= highest; i++) {
        result += i;
    }

    return result;
};

const p1 = (input) => {
    const targetCords = parseData(input);
    const success = [];
    const yFloor = Math.min(targetCords[1][0], targetCords[1][1]);
    const xCeil = Math.max(targetCords[0][0], targetCords[0][1]);

    for (let i = 1; i <= xCeil; i++) {
        let xVel = i;

        for (let j = yFloor; j <= 1000; j++) {
            let yVel = j;
            let pos = [0, 0];
            while (true) {
                pos = [pos[0] + xVel, pos[1] + yVel];

                if (isSuccessful(pos, targetCords)) {
                    success.push([i, j]);
                } else if (!keepChecking(pos, targetCords)) {
                    break;
                }

                xVel = xVel > 0 ? xVel - 1 : 0;
                yVel -= 1;
            }
            xVel = i;
        }
    }


    return higestPos(success);
};

const p2 = (input) => {
    const targetCords = parseData(input);
    const success = [];
    const unique = new Set();
    const yFloor = Math.min(targetCords[1][0], targetCords[1][1]);
    const xCeil = Math.max(targetCords[0][0], targetCords[0][1]);

    for (let i = 1; i <= xCeil; i++) {
        let xVel = i;
        for (let j = yFloor; j <= 1000; j++) {
            let yVel = j;
            let pos = [0, 0];
            while (true) {
                pos = [pos[0] + xVel, pos[1] + yVel];

                if (isSuccessful(pos, targetCords)) {
                    if (!unique.has(`${i} - ${j}`)) {
                        success.push([i, j]);
                    }
                    unique.add(`${i} - ${j}`);


                } else if (!keepChecking(pos, targetCords)) {
                    break;
                }

                xVel = xVel > 0 ? xVel - 1 : 0;
                yVel -= 1;
            }
            xVel = i;
        }
    }


    return success.length;
};

console.log(p1(test));
