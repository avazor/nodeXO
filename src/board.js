class Board {
    constructor(cells = null) {
        this.cells = cells ? cells : Array(9).fill(0);
    }

    isValidMove(index) {
        return this.cells[index] === 0;
    }

    makeMove(index, player) {
        this.cells[index] = player;
    }

    undoMove(index) {
        this.cells[index] = 0;
    }

    isFull() {
        return !this.cells.includes(0);
    }

    checkWinner() {
        const winConditions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        for (let i = 0; i < winConditions.length; i++) {
            const [a, b, c] = winConditions[i];
            if (this.cells[a] && this.cells[a] === this.cells[b] && this.cells[a] === this.cells[c]) {
                return this.cells[a];
            }
        }

        return false;
    }

    getEmptyCells() {
        const emptyCells = [];
        for (let i = 0; i < this.cells.length; i++) {
            if (this.cells[i] === 0) {
                emptyCells.push(i);
            }
        }
        return emptyCells;
    }

    getCells() {
        return [...this.cells];
    }
}

module.exports = Board;
