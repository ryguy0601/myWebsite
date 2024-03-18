class twenty48 {
    constructor(dimensions=4) {
        // default 4x4 grid
        this.dimensions = dimensions
        this.score = 0

        this.board = [
            [0,0,0,0],
            [0,0,0,0],
            [0,2,0,0],
            [0,0,0,0]];
        
        this.board = new Array(dimensions).fill(0).map(() => new Array(dimensions).fill(0));
        for (let x = 0; x < this.dimensions; x++) {
            for (let y = 0; y < this.dimensions; y++) {
                this.board[x][y] = new nums(this.board[x][y])
            }
        }
        // console.log(this.board)

        //initial numbers
        this.addNum()
        this.addNum()
        // console.log(this.board)
    }

    //accsesors
    getDimensions() {return this.dimensions}
    getBoard(){return this.board}
    getSpot(x,y){return this.board[x][y].getNum()}
    getScore(){return this.score}

    randomNum(min, max) {
        //max is exlusive
        return Math.floor(Math.random() * (max - min)) + min; 
    }

    isListZero(x){
        for(let i = 0; i < x.length; i++){
            if(x[i] !== 0){
                return false;
            }
        }
        return true;
    }

    addNum(){
        //TODO check if all squares are taken to end game
        let x = this.randomNum(0,this.dimensions)
        let y = this.randomNum(0,this.dimensions)
        while(this.board[x][y].getNum() != 0){//checks to not override another number
            x = this.randomNum(0,this.dimensions)
            y = this.randomNum(0,this.dimensions)           
        }
        this.board[x][y].setNum(2*this.randomNum(1,3))
    }

    resetNumState(){
        for (let x = 0; x < this.dimensions; x++) {
            for (let y = 0; y < this.dimensions; y++) {
                this.board[x][y].setState(false)
            }
        }
    }

//moving functions
    moveNum(temp,x,y,x1,y1){
        if(this.getSpot(x,y)!=0){
            if(this.getSpot(x+x1,y+y1)==0){
                temp = this.getSpot(x,y)
                this.board[x][y].setNum(0)
                this.board[x+x1][y+y1].setNum(temp)
            }else if(this.getSpot(x+x1,y+y1) == this.getSpot(x,y) && !this.board[x+x1][y+y1].getState()&& !this.board[x][y].getState()){
                this.board[x+x1][y+y1].dub()
                this.board[x+x1][y+y1].setState(true)
                this.board[x][y].setNum(0)
                temp = this.getSpot(x+x1,y+y1)//can be anything but null
                this.score += temp
            }
        }
        return temp
    }

    goLeft(){
        let temp = null
        for(let i = 0; i<this.dimensions; i++){
            for (let x = 0; x < this.dimensions; x++) {
                for (let y = 1; y < this.dimensions ; y++) {
                    temp = this.moveNum(temp,x,y,0,-1)
                }  
            }
        }
        if(temp!=null){this.addNum()}
    }
    
    goRight(){
        let temp = null
        for(let i = 0; i<this.dimensions; i++){
            for (let x = 0; x < this.dimensions; x++) {
                for (let y = 0; y < this.dimensions-1 ; y++) {
                    temp = this.moveNum(temp,x,y,0,1)
                }
            }
        }
        if(temp!=null){this.addNum()}
    }
    
    goUp(){
        let temp = null
        for(let i = 0; i<this.dimensions; i++){
            for (let x = this.dimensions-1; x >=1 ; x--) {
                for (let y = 0; y < this.dimensions ; y++) {
                    temp = this.moveNum(temp,x,y,-1,0)
                }
            }
        }
        if(temp!=null){this.addNum()}
    }
        
    goDown(){
        let temp = null
        for(let i = 0; i<this.dimensions; i++){
            for (let x = 0; x <this.dimensions-1 ; x++) {
                for (let y = 0; y < this.dimensions ; y++) {
                    temp = this.moveNum(temp,x,y,1,0)
                }
            }
        }
        if(temp!=null){this.addNum()}
    }
}
