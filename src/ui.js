const readline = require('readline');
const { Console } = require('console');

class UI {
    constructor() {
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        this.console = new Console(process.stdout, process.stderr);
        this.board = [];
    }

    getPlayerSelectXorO(callback) {
        this.rl.question('Which player would you like to be, X or O? ', (answer) => {
            if (answer === 'X' || answer === 'O') {
                this.console.log(`You are player ${answer}. Let's start the game!`);
                callback(answer);
            } else {
                this.console.log(`Invalid input. Please enter X or O.`);
                this.getPlayerSelectXorO(callback);
            }
        });
    }

    getInput(callback) {
        this.rl.question('Enter the index of the cell you want to play (0-8): ', (input) => {
            callback(input);
        });
    }

    printBoard(board, showIndexes) {
        this.board = board;
        const marks = showIndexes ? this.board.map((cell, index) => cell === 0 ? index : cell) : this.board;
        const [a, b, c, d, e, f, g, h, i] = marks;
        this.console.log(`
            ${a} | ${b} | ${c}
            ---------
            ${d} | ${e} | ${f}
            ---------
            ${g} | ${h} | ${i}
        `);
    }

    printAIMove(index) {
        this.console.log(`AI played on cell ${index}.`);
    }

    printMessage(message) {
        this.console.log(message);
    }

    printError(message) {
        this.console.error(message);
    }

    close() {
        this.rl.close();
    }
}

module.exports = UI;
