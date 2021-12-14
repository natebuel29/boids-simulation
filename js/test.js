let canvas;
let canvasContext;
let x = 100;
let y =100;
let dx = 0;
let dy = 3;
let speed = 10;
let height = 400;
let width = 400;
let boidLength = 15;
let boidWidth = 5;

window.onload = function(){
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');
    
    setInterval(drawEverything,25);

}

function drawEverything(){
    canvasContext.clearRect(0, 0, canvas.width, canvas.height) 
    console.log(y);
    bounds();
    drawBoid()
}

function drawBoid(){
    canvasContext.save();
    targetX = x + dx;
    targetY = y + dy
    let angle = Math.atan2(targetY-y,targetX-x);
    canvasContext.translate(targetX, targetY);
    canvasContext.rotate(angle);
    x = targetX;
    y= targetY;
    canvasContext.translate(-targetX,-targetY);
    canvasContext.beginPath();
    canvasContext.moveTo(x, y);
    canvasContext.lineTo(x-boidLength, y-boidWidth);
    canvasContext.lineTo(x-boidLength, y+boidWidth);
    canvasContext.fill();
    canvasContext.restore();
}
 

function bounds(){
    if(x > width+boidLength-1){
        x = -boidLength;
    }
    else if(x < -boidLength){
        x = width+boidLength;
    }
    else if (y > height+boidLength){
        y = -boidLength;
    }else if (y < -boidLength){
        y = height+15;
    }

}