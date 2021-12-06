const fs = require('fs');

let finalValue = 0;
let recentWinningBoard = [];
let recentWinningNumber = null;

function getBoards(input) {
    let boardNum = 0;
    const boards = [];
    for (let i = 0; i < input.length; i++) {
        if (input[i].length == 0) {
            boardNum = boardNum + 1;
        } else {
            let row = input[i].split(" ");
            row = row.filter(val => {
                if (val == "") {
                    return false;
                }
                return true;
            });
            row = row.map(val => {
                return [val, 0];
            });
            row[5] = 0;
            if (boards[boardNum] == null) {
                boards[boardNum] = [];
                boards[boardNum].push([0,0,0,0,0, 0]);
            }
            boards[boardNum].push(row);
        }
    }
    return boards;
}

const checkBoard = (board, number) => {
    if (board == undefined) {
        return;
    }
    if (board[0][5] == 1) {
        return;
    }
    for (let row = 1; row < board.length; row++) {
        for (let col = 0; col < 5; col++) {
            if (board[row][col][0] == number) {
                board[row][col][1] = 1;
                board[row][5] = board[row][5] + 1;
                board[0][col] = board[0][col] + 1;
                if (board[row][5] == 5 ||  board[0][col] == 5) {
                    // If the board is a winner mark down that it has won and then set it as the most recent win
                    if (board[0][5] == 0) {
                        recentWinningBoard = board;
                        recentWinningNumber = number;
                        board[0][5] = 1;
                    }
                } 
            }
        }
    }
    return board;
}

const getFinalSolution = (board, calledNum) => {
    if (finalValue == 1) {
        return;
    }
    let missedNums = 0;
    for (let row = 1; row < board.length; row++) {
        for (let col = 0; col < 5; col++) {
            if (board[row][col][1] == 0) {
                missedNums = missedNums + parseInt(board[row][col][0]);
            }
        }
    }
    console.log(board);
    console.log(missedNums);
    console.log(missedNums * calledNum);
    finalValue = 1;
}



function solveBingo() {
    const inputs = fs.readFileSync('day4.txt', 'utf8').split("\n");
    const numbers = inputs[0].split(",");
    let boards = getBoards(inputs.slice(2, inputs.length));

    // const flatBoards = flattenBoards(inputs.slice(2, inputs.length));
    for (let i = 0; i < numbers.length; i++) {
        for (let j = 0; j < boards.length; j++) {
            boards[j] = checkBoard(boards[j], numbers[i]);
        }
    }
    getFinalSolution(recentWinningBoard, recentWinningNumber);
}

const flattenBoards = (boards) => {
    let flatBoards = [];
    for (let i = 0; i < boards.length; i++) {
        if (boards[i].length > 0) {
            let row = boards[i].split(" ");
            row = row.filter(val => {
                if (val == "") {
                    return false;
                }
                return true;
            });
            for (let j = 0; j < row.length; j++) {
                if (flatBoards[parseInt(row[j])] == null) {
                    flatBoards[parseInt(row[j])] = [];
                }
                flatBoards[parseInt(row[j])].push(i * 5 + j);
            }
        }
    }
    return flatBoards;
}

const findBoardPosition = (pos) => {
    const board = pos / 25;
    const boardPos = pos % 25;
    console.log(board);
    console.log(boardPos);
}

solveBingo();