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
            yourTicket = input[i + 1].split(',');
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
fields = {
  class: [ 1, 2, 3, 5, 6, 7 ],
  row: [
     6,  7,  8,  9, 10, 11, 33,
    34, 35, 36, 37, 38, 39, 40,
    41, 42, 43, 44
  ],
  seat: [
    13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30,
    31, 32, 33, 34, 35, 36, 37, 38, 39,
    40, 45, 46, 47, 48, 49, 50
  ]
} 
yourTicket = [ '7', '1', '14' ]
nearbyTicket =  [ '7,3,47', '40,4,50', '55,2,20', '38,6,12' ]
*/

const p1 = (input) => {
    const [fields, yourTicket, nearbyTicket] = formatInput(input);
    let errorRate = 0;
    for (let i = 0; i < nearbyTicket.length; i++) {
        let ticket = nearbyTicket[i].split(',');

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
    const [fields, yourTicket, nearbyTicket] = formatInput(input);
    let validTickets = findValidTickets(fields, nearbyTicket);
    let fieldsHash = createFieldsHash(validTickets);
    let fieldsArr = findFieldsOrder(fields, fieldsHash);

    let sum = 1;
    for (let i = 0; i < yourTicket.length; i++) {
        const value = yourTicket[i];
        const field = fieldsArr[i];

        if (field.includes('departure')) {
            sum *= value;
        }
    }

    return sum;

};

const findValidTickets = (fields, ticketsArr) => {
    let validTickets = [];
    for (let i = 0; i < ticketsArr.length; i++) {
        let ticket = ticketsArr[i].split(',');
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

    return validTickets;
};

const createFieldsHash = (tickets) => {
    let fieldsHash = {};
    for (let i = 0; i < tickets.length; i++) {
        let ticketFields = tickets[i];

        for (let j = 0; j < ticketFields.length; j++) {
            if (fieldsHash[j]) {
                fieldsHash[j].push(ticketFields[j]);
            } else {
                fieldsHash[j] = [ticketFields[j]];
            }
        }
    }

    return fieldsHash;
};

const findFieldsOrder = (fields, hash) => {
    let fieldsArr = [];
    while (Object.keys(hash).length > 0) {
        for (const key in hash) {
            let matchingFields = [];
            matchingFields = [...findValidFields(fields, hash[key])];
            if (matchingFields.length === 1) {
                delete hash[key];
                delete fields[matchingFields[0]];
                fieldsArr[key] = matchingFields[0];
            }
        }
    }

    return fieldsArr;
};

const findValidFields = (fields, arr) => {
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