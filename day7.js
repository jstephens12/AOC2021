const fs = require('fs');

const getFuel = (xOrds, targetX) => {
    let fuel = 0;
    for (const [x, count] of Object.entries(xOrds)) {
        const d = Math.abs(x - targetX);
        const singleFuel = (d * (d+1)) / 2;
        if (targetX == 5) {
            console.log(singleFuel)
        }
        fuel = fuel + singleFuel * count
    }
    return fuel;
}

const getMinFuel = () => {
    let inputs = fs.readFileSync('day7Test.txt', 'utf8').split(',');
    let maxX = 0;
    inputs = inputs.map(x => {
        newX = parseInt(x);
        if (x > maxX) {
            maxX = x;
        }
        return parseInt(x);
    });
    const xOrds = new Array(maxX).fill(0);
    for (let i = 0; i < inputs.length; i++) {
        xOrds[inputs[i]]++;
    }
    console.log(maxX);


    let minFuel = Number.MAX_SAFE_INTEGER
    for (const [x, count] of Object.entries(xOrds)) {
        let fuel = getFuel(xOrds, x);
        if (fuel < minFuel) {
            minFuel = fuel;
        }
    }
    console.log(minFuel);
}

getMinFuel()