const { example, input } = require('./input');

const p1 = (arr) => {
    const leaveTime = arr[0];
    const busses = arr[1].replace(/x,/g, '').split(',');
    let minDist = Infinity;
    let minId;

    for (let i = 0; i < busses.length; i++) {
        let bus = busses[i];
        let distFromLeaveTime = bus - (leaveTime % bus);

        if (distFromLeaveTime < minDist) {
            minDist = distFromLeaveTime;
            minId = bus;
        }
    }

    return minId * minDist;
};

const p2 = (arr) => {
    const busses = arr[1].split(',');
    let count = 1;
    let leaveTime = Number(busses[0]);
    let gcd = leaveTime;

    while (count < busses.length) {
        let bus = Number(busses[count]) || 'x';

        if (bus === 'x') {
            count += 1;
            continue;
        }

        leaveTime += gcd;
        let newDepartTime = leaveTime + count;

        if (newDepartTime % bus === 0) {
            //offset back to first Bus leaveTime
            leaveTime = newDepartTime - count;
            gcd = gcd * bus;
            count += 1;
        }
    }
    return leaveTime;

};

// console.log(p1(input));
console.log(p2(example));