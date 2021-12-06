const fs = require('fs')
const readline = require('readline');

function howDeep() {
    const readings = fs.readFileSync('day1.txt', 'utf8').split("\n");
    if (readings.length === 0) {
        return 0;
    }
    if (readings.length === 1) {
        if (parseInt(readings[0]) < parseInt(readings[1])) {
            return 1;
        }
    }
    let currentDepth = readings[0];
    let count = 0;
    for(let x = 1; x < readings.length - 1; x++) {
        if(parseInt(readings[x - 1]) < parseInt(readings[x])) {
            count++;
        }
        currentDepth = readings[x];
    }
    console.log(count);
    return count;
}

function getWindowSum(start, readings) {
    return parseInt(readings[start]) + parseInt(readings[start + 1]) + parseInt(readings[start + 2]);
}

function newDeep() {
    const readings = fs.readFileSync('day1.txt', 'utf8').split("\n");
    let currentWindow = getWindowSum(0, readings);
    let count = 0;
    for(let x = 1; x < readings.length - 3; x++) {
        let newWindow = getWindowSum(x, readings);
        if(currentWindow < newWindow) {
            count++;
        }
        currentWindow = newWindow;
    }
    console.log(count);
    return count;
}

async function getData() {
    const filestream = fs.createReadStream('day1.txt');

    const rl = readline.createInterface({
        input:filestream,
        crlfDelay: Infinity
    });

    for await (const line of rl) {
        // Each line in input.txt will be successively available here as `line`.
        console.log(`Line from file: ${line}`);
      }
}

newDeep();