class nums {
	constructor(num = 0) {
		this.number = num;
		this.mergered = false;
	}

	setNum(x) {
		this.number = x;
	}
	setState(x) {
		this.mergered = x;
	}
	dub() {
		this.number *= 2;
	}

	getNum() {
		return this.number;
	}
	getState() {
		return this.mergered;
	}
}
