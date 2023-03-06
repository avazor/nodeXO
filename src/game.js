const Board = require('./board');
const GameState = require('./state');
const AI = require('./ai');
const UI = require('./ui');

class Game {
    constructor() {
        this.ui = new UI();
        this.gameState = new GameState();
    }

    start() {
        this.ui.getPlayerSelectXorO((player) => {
            this.gameState.setPlayer(player);
            this.ui.printBoard(this.gameState.board.cells, true);
            this.makeNextMove();
        });
    }

    makeNextMove() {
        const currentPlayer = this.gameState.currentPlayer;
        const isHumanPlayer = currentPlayer === this.gameState.player;
        if (isHumanPlayer) {
            this.ui.getInput((input) => {
                this.handleInput(input);
            });
        } else {
            this.makeAIMove();
        }
    }

    handleInput(input) {
        const index = parseInt(input);
        if (!isNaN(index) && index >= 0 && index <= 8) {
            if (this.gameState.board.isValidMove(index)) {
                this.gameState.board.makeMove(index, this.gameState.currentPlayer);
                this.ui.printBoard(this.gameState.board.cells, true);
                if (this.gameState.checkWinner()) {
                    this.handleEndGame();
                } else {
                    this.gameState.switchPlayer();
                    this.makeNextMove();
                }
            } else {
                this.ui.printError(`Invalid move. Please choose an empty cell.`);
                this.makeNextMove();
            }
        } else {
            this.ui.printError(`Invalid input. Please choose a number from 0 to 8.`);
            this.makeNextMove();
        }
    }

    makeAIMove() {
        const ai = new AI(this.gameState.currentPlayer, this.gameState);
        ai.makeMove();
        this.ui.printAIMove(ai.move);
        this.ui.printBoard(this.gameState.board.cells, true);
        if (this.gameState.checkWinner()) {
            this.handleEndGame();
        } else {
            this.gameState.switchPlayer();
            this.makeNextMove();
        }
    }

    handleEndGame() {
        if (this.gameState.winner == "X" || this.gameState.winner == "O") {
            this.ui.printMessage(`Player ${this.gameState.currentPlayer} wins!`);
        } else {
            this.ui.printMessage(`It's a tie!`);
        }
        this.ui.close();
    }
}

module.exports = Game