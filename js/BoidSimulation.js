
let canvas = document.getElementById('gameCanvas');
let canvasContext = canvas.getContext('2d');
let boidCount = 40;
let boids = [];
let height = 400;
let width = 400;
let min = 0;
let boidLength = 15;
let boidWidth = 5;

function getRandomInt(min,max){
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }

function InitBoids(){
    for(let i=0; i<boidCount;i++){
        let randX = getRandomInt(min,width);
        let randY = getRandomInt(min,width);
        let randDx = getRandomArbitrary(-3,3.1);
        let randDy = getRandomArbitrary(-3,3.1);
        let tempBoid = new Boid(randX,randY,randDx,randDy);
        boids.push(tempBoid);
    }
}

function drawBoid(boid){
    canvasContext.save();
    let angle = Math.atan2(boid.dy,boid.dx);
    canvasContext.translate(boid.x, boid.y);
    canvasContext.rotate(angle);
    canvasContext.translate(-boid.x,-boid.y);
    canvasContext.beginPath();
    canvasContext.moveTo(boid.x, boid.y);
    canvasContext.lineTo(boid.x-boidLength, boid.y-boidWidth);
    canvasContext.lineTo(boid.x-boidLength, boid.y+boidWidth);
    canvasContext.fill();
    canvasContext.restore();
}



function drawAllBoids(){
    canvasContext.clearRect(0, 0, canvas.width, canvas.height) 
    for(let i=0; i<boids.length;i++){
        let tempBoid = boids[i];
        bounds(tempBoid)
        drawBoid(tempBoid);
        moveBoidToNewPosition(tempBoid)
    }
    
    window.requestAnimationFrame(drawAllBoids);
}

function bounds(boid){
    if(boid.x > width+boidLength-1){
        boid.x = -boidLength;
    }
    else if(boid.x < -boidLength){
        boid.x = width+boidLength;
    }
    else if (boid.y > height+boidLength){
        boid.y = -boidLength;
    }else if (boid.y < -boidLength){
        boid.y = height+15;
    }
}

function moveBoidToNewPosition(boid){
    boid.move();
}

window.onload = function(){
    InitBoids();
    
    window.requestAnimationFrame(drawAllBoids);

}