//resource: https://stackoverflow.com/questions/58554114/rotate-triangle-in-plain-javascript


//TODO: rotate triangle towards direction. Link above will help
let canvas;
let canvasContext;
let x = 100;
let y =100;
let dx = 3
let dy = 3
let speed = 5;

window.onload = function(){
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');
    
    setInterval(drawEverything,500);

}

function drawEverything(){
    canvasContext.clearRect(0, 0, canvas.width, canvas.height) 
    console.log(dx);
    console.log(dy);

    bounce();
    x = x + dx;
    y = y + dy

    canvasContext.beginPath();
    canvasContext.moveTo(x, y);
    canvasContext.lineTo(x-15, y -5);
    canvasContext.lineTo(x-15, y+5);
    
    canvasContext.fill();


  
}

//if boid goes out of bounds, then move to other side of screen
//TODO: finish this function
function bounds(){
    if(x > 400 ){
        increment = 0;
    }

}