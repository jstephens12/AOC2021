const fs = require('fs')
// const readline = require('readline');


function convertBinaryToDecimal(bArr) {
    let value = 0;
    for (let x = bArr.length - 1; x > -1; x--) {
        const mult = 2 ** (bArr.length - x - 1);
        value = value + bArr[x] * mult;
    }
    return value;
}

function findPower() {
    const readings = fs.readFileSync('day3.txt', 'utf8').split("\n");
    const splitReadings = readings.map(reading => {
        return reading.split("");
    });
    const bitNum = splitReadings[0].length;
    const trueCounts = new Array(bitNum).fill(0);
    const falseCounts = new Array(bitNum).fill(0);

    for(let i = 0; i < bitNum; i++) {
        for(let j = 0; j < splitReadings.length; j++) {
            if (splitReadings[j][i] == 1) {
                trueCounts[i] = trueCounts[i] + 1;
            } else {
                falseCounts[i] = falseCounts[i] + 1;
            }
        }
    }

    const gCounts = new Array(bitNum).fill(0);
    const eCounts = new Array(bitNum).fill(0);
    for (let x = 0; x < bitNum; x ++) {
        if (trueCounts[x] > falseCounts[x]) {
            gCounts[x] = 1;
            eCounts[x] = 0;
        } else {
            gCounts[x] = 0;
            eCounts[x] = 1;
        }
    }
    const gamma = convertBinaryToDecimal(gCounts);
    const epsilon = convertBinaryToDecimal(eCounts);
    console.log(gamma);
    console.log(epsilon);
    console.log(gamma * epsilon);
    return;
}

function findLifeSupport() {
    const readings = fs.readFileSync('day3.txt', 'utf8').split("\n");
    const splitReadings = readings.map(reading => {
        return reading.split("");
    });
    const bitNum = splitReadings[0].length;
    let o2Values = splitReadings;
    let co2Values = splitReadings;
    // Filter through all bits
    for (let i = 0; i < bitNum; i++) {
        if (o2Values.length > 1) {
            o2Values = filterByBit(o2Values, i, false);
        }
        if (co2Values.length > 1) {
            co2Values = filterByBit(co2Values, i, true);
        }
    }
    const o2 = convertBinaryToDecimal(o2Values[0]);
    const co2 = convertBinaryToDecimal(co2Values[0]);
    console.log(o2);
    console.log(co2);
    console.log(o2 * co2);
    return;
}

// Takes an array and a bit and then filters the array based on mostcommon or least common value in that bit location
function filterByBit(values, bit, co2) {
    let tCount = 0;
    let fCount = 0;
    for (let i = 0; i < values.length; i++) {
        if (values[i][bit] == 1) {
            tCount = tCount + 1;
        } else {
            fCount = fCount + 1;
        }
    }

    let mostCommon = tCount >= fCount ? 1 : 0;
    if (co2) {
        mostCommon = fCount <= tCount ? 0 : 1;
    }
    const filterValues = [];
    for (let i = 0; i < values.length; i++) {
        if (values[i][bit] == mostCommon) {
            filterValues.push(values[i]);
        }
    }
    return filterValues;
}

findLifeSupport();