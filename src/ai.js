const Board = require('./board');
const GameState = require('./state');

class AI {
	constructor(player, gameState) {
		this.player = player;
		this.opponent = player === 'X' ? 'O' : 'X';
		this.gameState = gameState;
		this.move = -1;
		this.memo = new Map();
	}

	makeMove() {
		const depth = 0;
		const alpha = -Infinity;
		const beta = Infinity;
		const score = this.minimax(depth, this.player);
		this.gameState.board.makeMove(this.move, this.player);
		this.gameState.winner = '';
	}

	minimax(depth, player) {
		if (this.gameState.checkWinner()) {
			const score = this.getScore(depth);
			return score;
		}

		let bestScore = player === this.player ? -Infinity : Infinity;
		let bestMove = -1;

		for (let i = 0; i < 9; i++) {
			if (this.gameState.board.isValidMove(i)) {
				this.gameState.board.makeMove(i, player);
				let score = this.minimax(depth + 1, player === this.player ? this.opponent : this.player);

				if (player === this.player) {
					bestScore = Math.max(bestScore, score);
					if (bestScore === score) {
						bestMove = i;
					}
				} else {
					bestScore = Math.min(bestScore, score);
					if (bestScore === score) {
						bestMove = i;
					}
				}
				this.gameState.board.undoMove(i);
			}
		}

		if (depth === 0) {
			this.move = bestMove;
		}

		return bestScore;
	}

	getScore(depth) {
		const winner = this.gameState.checkWinner();
		if (winner === this.player) {
			const score = 10 - depth;
			return score;
		} else if (winner === this.opponent) {
			const score = depth - 10;
			return score;
		} else {
			return 0;
		}
	}
}

module.exports = AI;
