const fs = require('fs');

let dangerZones = 0;

const findDanger = () => {
    const inputs = fs.readFileSync('day5.txt', 'utf8').split("\n");
    const positions = [];
    let maxRow = 0;
    let maxCol = 0;
    console.log("inputs = " + inputs.length);
    for (let i = 0; i  < inputs.length; i++) {
        let position = inputs[i].split(' '); 
        position = position.filter(pos => pos != "->");
        if (position.length == 2) {
            position = position[0].split(',').concat(position[1].split(','));
            position = position.map(pos => parseInt(pos));
            if (position[0] > maxCol) {
                maxCol = position[0];
            }
            if (position[2] > maxCol) {
                maxCol = position[2];
            }
            if (position[1] > maxRow) {
                maxRow = position[1];
            }
            if (position[3] > maxRow) {
                maxRow = position[3];
            }
            positions.push(position);
        }
    }
    
    let grid = new Array(maxRow + 1).fill('.').map(x => new Array(maxCol + 1).fill('.'));
    // const testRes = getUpdatedGrid(positions[1][0], positions[1][2], positions[1][1], positions[1][3], grid);
    // console.log("here");
    // console.log(testRes[63][899]);

    // const testRes = getUpdatedGridWithDiagonal(positions[0][1], positions[0][3], positions[0][0], positions[0][2], grid);
    // console.log(testRes[103][959]);
    // console.log(testRes[104][958]);

    for (let i = 0; i < positions.length; i++) {
        const pos = positions[i];
        const col1 = pos[0];
        const col2 = pos[2];
        const row1 = pos[1];
        const row2 = pos[3];
        // console.log(row1 + " " + row2 + " " + col1 + " " + col2);
        grid = getUpdatedGrid(col1, col2, row1, row2, grid);
    }

    let badCheck = 0;
    for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[0].length; col++) {
            if (grid[row][col] > 1) {
                badCheck++;
            }
        }
    }
    console.log(badCheck);
    console.log("positions = " + positions.length);
    console.log("gridCols = " + grid[0].length);
    console.log("gridRows = " + grid.length);
    console.log(grid[0]);
    console.log(dangerZones);
}

const getUpdatedGrid = (col1, col2, row1, row2, grid) => {
    if (col1 == col2) {
        if (row1 > row2) {
            for (let row = row2; row <= row1; row++) {
                grid[row][col1] = updatePositions(row, col1, grid); //grid[row][col1] == '.' ? 1 : grid[row][col1] + 1; //updatePositions(row, col1, grid);
            }
        } else {
            for (let row = row1; row <= row2; row++) {
                grid[row][col1] = updatePositions(row, col1, grid); //grid[row][col1] == '.' ? 1 : grid[row][col1] + 1;
            }
        }
    } else if (row1 == row2) {
        if (col1 > col2) {
            for (let col = col2; col <= col1; col++) {
                grid[row1][col] = updatePositions(row1, col, grid); //grid[row1][col] == '.' ? 1 : grid[row1][col] + 1;
            }
        } else {
            for (let col = col1; col <= col2; col++) {
                grid[row1][col] = updatePositions(row1, col, grid); //grid[row1][col] == '.' ? 1 : grid[row1][col] + 1;
            }
        }
    } 
    else {
        grid = getUpdatedGridWithDiagonal(row1, row2, col1, col2, grid);
    }
    return grid;
}

const getUpdatedGridWithDiagonal = (row1, row2, col1, col2, grid) => {
    const rowChange = row1 < row2 ? 1 : -1;
    const colChange = col1 > col2 ? -1 : 1;
    let row = row1;
    let col = col1;
    while (row != row2) {
        grid[row][col] = updatePositions(row, col, grid);
        col = col + colChange;
        row = row + rowChange;
    }
    grid[row2][col2] = updatePositions(row2, col2, grid);
    return grid;
}

const updatePositions = (row, col, grid) => {
    if (grid[row][col] == '.') {
        return 1;
    } 
    if (grid[row][col] == 1) {
        dangerZones = dangerZones + 1;
        return 2;
    }
    return grid[row][col] + 1;
}

findDanger();