const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

const game = new twenty48();//default dimentions 4x4
const dim = game.getDimensions();
console.log(game.getBoard())
// let board = game.getBoard()
const width = canvas.width
const height = canvas.height

ctx.strokeStyle = "#ff00ffaa";



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
            // ctx.font = "9px Comic Sans MS";
            // ctx.fillStyle = "#ffffff";
            // ctx.fillText(x, (width*y/dim)+45, (height*x/dim)+20);
            // ctx.fillText(y, (width*y/dim)+55, (height*x/dim)+20);
            if(num.getNum()!=0){
                ctx.font = "15px Comic Sans MS";
                ctx.fillStyle = "red";
                ctx.fillText(num.getNum(), (width*y/dim)+25, (height*x/dim)+25);
                ctx.font = "15px Comic Sans MS";
                // ctx.fillText(num.getState(), (width*y/dim)+25, (height*x/dim)+35) 
            }
        }        
    }
}

window.onload = function() {
    drawBoard()
    drawNums()
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
  });


