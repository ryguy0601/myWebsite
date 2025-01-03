class twenty48 {
	constructor(dimensions = 4) {
		// default 4x4 grid
		this.dimensions = dimensions;
		this.score = 0;
		this.didLose = false;

		// this.board = [
		//     [0,0,2,0],
		//     [0,0,2,0],
		//     [2,2,2,0],
		//     [0,0,0,0]];

		this.board = new Array(dimensions)
			.fill(0)
			.map(() => new Array(dimensions).fill(0));
		for (let x = 0; x < this.dimensions; x++) {
			for (let y = 0; y < this.dimensions; y++) {
				this.board[x][y] = new nums(this.board[x][y]);
			}
		}
		// console.log(this.board)

		//initial numbers
		this.addNum();
		this.addNum();
		// console.log(this.board)
	}

	//accsesors
	getDimensions() {
		return this.dimensions;
	}
	getBoard() {
		return this.board;
	}
	getSpot(x, y) {
		return this.board[x][y].getNum();
	}
	getScore() {
		return this.score;
	}
	getDidLose() {
		return this.didLose;
	}

	randomNum(min, max) {
		//max is exlusive
		return Math.floor(Math.random() * (max - min)) + min;
	}

	loseCheck() {
		//
		//checks if there are any zeros on the board
		for (let x = 0; x < this.dimensions; x++) {
			for (let y = 0; y < this.dimensions; y++) {
				if (this.getSpot(x, y) == 0) {
					return false;
				}
			}
		}
		return this.lose();
	}
	lose() {
		//checks if any moves can be made
		for (let x = 0; x < this.dimensions; x++) {
			for (let y = 0; y < this.dimensions; y++) {
				if (x != 0 && this.getSpot(x - 1, y) == this.getSpot(x, y)) {
					return false;
				}
				if (
					x <= this.dimensions - 2 &&
					this.getSpot(x + 1, y) == this.getSpot(x, y)
				) {
					return false;
				}
				if (
					y <= this.dimensions - 2 &&
					this.getSpot(x, y + 1) == this.getSpot(x, y)
				) {
					return false;
				}
				if (y != 0 && this.getSpot(x, y - 1) == this.getSpot(x, y)) {
					return false;
				}
			}
		}
		console.log("You lose");
		this.didLose = true;
		return true;
	}

	addNum() {
		if (this.loseCheck) {
			let x = this.randomNum(0, this.dimensions);
			let y = this.randomNum(0, this.dimensions);
			while (this.board[x][y].getNum() != 0) {
				//checks to not override another number
				x = this.randomNum(0, this.dimensions);
				y = this.randomNum(0, this.dimensions);
			}
			this.board[x][y].setNum(2 * this.randomNum(1, 3));
		}
	}

	resetNumState() {
		for (let x = 0; x < this.dimensions; x++) {
			for (let y = 0; y < this.dimensions; y++) {
				this.board[x][y].setState(false);
			}
		}
	}

	//moving functions
	moveNum(temp, x, y, x1, y1) {
		if (this.getSpot(x, y) != 0) {
			if (this.getSpot(x + x1, y + y1) == 0) {
				temp = this.getSpot(x, y);
				this.board[x][y].setNum(0);
				this.board[x + x1][y + y1].setNum(temp);
			} else if (
				this.getSpot(x + x1, y + y1) == this.getSpot(x, y) &&
				!this.board[x + x1][y + y1].getState() &&
				!this.board[x][y].getState()
			) {
				this.board[x + x1][y + y1].dub();
				this.board[x + x1][y + y1].setState(true);
				this.board[x][y].setNum(0);
				temp = this.getSpot(x + x1, y + y1); //can be anything but null
				this.score += temp;
			}
		}
		return temp;
	}

	goLeft() {
		// console.log("L")
		let temp = null;
		for (let i = 0; i < this.dimensions; i++) {
			for (let x = 0; x < this.dimensions; x++) {
				for (let y = 1; y < this.dimensions; y++) {
					temp = this.moveNum(temp, x, y, 0, -1);
				}
			}
		}
		if (temp != null) {
			this.addNum();
		}
	}

	goRight() {
		// console.log("R")
		let temp = null;
		for (let i = 0; i < this.dimensions; i++) {
			for (let x = 0; x < this.dimensions; x++) {
				for (let y = this.dimensions - 2; y > -1; y--) {
					temp = this.moveNum(temp, x, y, 0, 1);
				}
			}
		}
		if (temp != null) {
			this.addNum();
		}
	}

	goUp() {
		// console.log("U")
		let temp = null;
		for (let i = 0; i < this.dimensions; i++) {
			for (let x = 1; x < this.dimensions; x++) {
				for (let y = 0; y < this.dimensions; y++) {
					temp = this.moveNum(temp, x, y, -1, 0);
				}
			}
		}
		if (temp != null) {
			this.addNum();
		}
	}

	goDown() {
		// console.log("D")
		let temp = null;
		for (let i = 0; i < this.dimensions; i++) {
			for (let x = this.dimensions - 2; x > -1; x--) {
				for (let y = 0; y < this.dimensions; y++) {
					temp = this.moveNum(temp, x, y, 1, 0);
				}
			}
		}
		if (temp != null) {
			this.addNum();
		}
	}
}
