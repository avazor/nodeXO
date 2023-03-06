const Board = require('./board');

class GameState {
	constructor(board = null, currentPlayer = null, player = null, ai = null) {
		this.board = board ? board : new Board();
		this.currentPlayer = currentPlayer ? currentPlayer : 'X';
		this.player = player ? player : '';
		this.ai = ai ? ai : '';
		this.winner = '';
	}

	setPlayer(player) {
		this.player = player;
		this.ai = player === 'X' ? 'O' : 'X';
	}

	checkWinner() {
		const winner = this.board.checkWinner();
		if (winner) {
			this.winner = winner;
			return winner;
		} else if (this.board.isFull()) {
			return true;
		} else {
			return false;
		}
	}

	switchPlayer() {
		if (this.currentPlayer === this.player) {
			this.currentPlayer = this.ai;
		} else {
			this.currentPlayer = this.player;
		}
	}

}

module.exports = GameState;
