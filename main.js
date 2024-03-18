const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

const game = new twenty48();//default dimentions 4x4
const dim = game.getDimensions();
console.log(game.getBoard())
// let board = game.getBoard()
const width = canvas.width
const height = canvas.height

ctx.strokeStyle = "#ff00ffaa";
ctx.textBaseline = "middle";
ctx.textAlign = "center"; 



function drawBoard(){
    for(let i=1; i<dim;i++){
        //vertical lines
        ctx.beginPath();
        ctx.moveTo((width/dim)*i,0 ); // starting point of the line
        ctx.lineTo((width/dim)*i, height); // ending point of the line
        ctx.stroke();
        //horizontal lines
        ctx.beginPath();
        ctx.moveTo(0, (height/dim)*i); // starting point of the line
        ctx.lineTo(width, (height/dim)*i); // ending point of the line
        ctx.stroke();
    }
}

function drawNums(){
    for(let x=0; x<dim; x++){
        for (let y=0; y<dim; y++){
            let num = game.getBoard()[x][y]
            if(num.getNum()!=0){
                ctx.font = "15px Verdana";
                ctx.fillStyle = "#ff0000";
                ctx.fillText(num.getNum(), (width*y/dim+35), (height*x/dim+20));
            }
        }        
    }
}

function updateScore(){
    let element = document.getElementById("score")
    element.innerHTML = "Score: "+game.getScore()
}

window.onload = function() {
    drawBoard()
    drawNums()
    updateScore()
}

//keyboard detection
document.addEventListener("keyup", function(event) {
    // console.log(`Key pressed: ${event.key}`);
    switch (event.key) {
    case "ArrowLeft":
        game.goLeft();
        break;
    case "ArrowRight":
        game.goRight();
        break;
    case "ArrowUp":
        game.goUp();
        break;
    case "ArrowDown":
        game.goDown();
        break;
    default:
        break;
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBoard()
    drawNums()
    game.resetNumState()
    updateScore()
  });


