const { example, example2, input } = require('./input');

const formatInput = (input) => {
    let fields = {};
    let yourTicket;
    let nearby = [];

    let current = 'fields';
    for (let i = 0; i < input.length; i++) {
        if (input[i] === '') {
            continue;
        }

        if (input[i] === 'your ticket:') {
            yourTicket = input[i + 1];
            i += 2;
            continue;
        }

        if (input[i] === 'nearby tickets:') {
            current = 'nearby';
            continue;
        }

        if (current === 'fields') {
            let inputArr = input[i].replace(' or', '').split(': ');
            let highLows = inputArr[1].split(' ').map(x => x.split('-'));
            fields[inputArr[0]] = [];
            for (let i = 0; i < highLows.length; i++) {
                let low = Number(highLows[i][0]);
                let high = Number(highLows[i][1]);
                for (let i = low; i <= high; i++) {
                    fields[inputArr[0]].push(i);
                }
            }
        }

        if (current === 'nearby') {
            nearby.push(input[i]);
        }
    }

    return [fields, yourTicket, nearby];
};
/*
{
  fields: {
    class: [ '1-3', '5-7' ],
    row: [ '6-11', '33-44' ],
    seat: [ '13-40', '45-50' ]
  },
  yourTicket: '7,1,14',
  nearby: [ '7,3,47', '40,4,50', '55,2,20', '38,6,12' ]
}
*/

const p1 = (input) => {
    const [fields, yourTicket, nearby] = formatInput(input);
    let errorRate = 0;
    for (let i = 0; i < nearby.length; i++) {
        let ticket = nearby[i].split(',');

        for (let j = 0; j < ticket.length; j++) {
            let value = Number(ticket[j]);
            let found = false;

            for (const key in fields) {
                if (fields[key].includes(value)) {
                    found = true;
                    break;
                }
            }
            if (!found) {
                errorRate += value;
            }
        }
    }
    return errorRate;
};

const p2 = (input) => {
    const [fields, yourTicket, nearby] = formatInput(input);
    let validTickets = [];
    for (let i = 0; i < nearby.length; i++) {
        let ticket = nearby[i].split(',');
        let valid = true;

        for (let j = 0; j < ticket.length; j++) {
            let value = Number(ticket[j]);
            let found = false;

            for (const key in fields) {
                if (fields[key].includes(value)) {
                    found = true;
                    break;
                }
            }
            if (!found) {
                valid = false;
            }
        }

        if (valid) {
            validTickets.push(ticket);
        }
    }

    let fieldsHash = {};
    for (let i = 0; i < validTickets.length; i++) {
        let ticketFields = validTickets[i];

        for (let j = 0; j < ticketFields.length; j++) {
            if (fieldsHash[j]) {
                fieldsHash[j].push(ticketFields[j]);
            } else {
                fieldsHash[j] = [ticketFields[j]];
            }
        }
    }
    let fieldsArr = [];
    while (Object.keys(fieldsHash).length > 0) {
        for (const key in fieldsHash) {
            let matchingFields = [];
            matchingFields = [...findField(fields, fieldsHash[key])];
            if (matchingFields.length === 1) {
                delete fieldsHash[key];
                delete fields[matchingFields[0]];
                fieldsArr[key] = matchingFields[0];
            }
        }
    }

    const yourTicketArr = yourTicket.split(',');
    let sum = 1;
    for (let i = 0; i < yourTicketArr.length; i++) {
        const value = Number(yourTicketArr[i]);
        const field = fieldsArr[i];

        if (field.includes('departure')) {
            sum *= value;
        }
    }

    return sum;

};

const findField = (fields, arr) => {
    let possible = [];
    for (const key in fields) {
        let isField = false;
        for (let i = 0; i < arr.length; i++) {
            const value = Number(arr[i]);
            if (!fields[key].includes(value)) {
                isField = false;
                break;
            }
            isField = true;
        }
        if (isField) {
            possible.push(key);
        }
    }
    return possible;

};


console.log(p2(input));