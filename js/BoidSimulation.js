
let canvas = document.getElementById('gameCanvas');
let canvasContext = canvas.getContext('2d');
let boidCount = 1;
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
        console.log("here");
        let randX = getRandomInt(min,width);
        let randY = getRandomInt(min,width);
        let randDx = getRandomArbitrary(-3,3.1);
        let randDy = getRandomArbitrary(-3,3.1);
        let tempBoid = new Boid(randX,randY,randDx,randDy);
        boids.push(tempBoid);
    }
}

function drawBoid(boid){
    console.log("yo")
    canvasContext.save();
    let prevX = boid.x;
    let prevY = boid.y;
    boid.move();
    let newX = boid.x;
    let newY = boid.y;
    let angle = Math.atan2(newY-prevY,newX-prevX);
    canvasContext.translate(newX, newY);
    canvasContext.rotate(angle);
    canvasContext.translate(-newX,-newY);
    canvasContext.beginPath();
    canvasContext.moveTo(newX, newY);
    canvasContext.lineTo(newX-boidLength, newY-boidWidth);
    canvasContext.lineTo(newX-boidLength, newY+boidWidth);
    canvasContext.fill();
    canvasContext.restore();
}

function DrawAllBoids(){
    canvasContext.clearRect(0, 0, canvas.width, canvas.height) 
    for(let i=0; i<boids.length;i++){
        console.log("here");
        let tempBoid = boids[i];
        drawBoid(tempBoid);
    }
    
    window.requestAnimationFrame(DrawAllBoids);
}

window.onload = function(){
    InitBoids();

    console.log("here");
    
    window.requestAnimationFrame(DrawAllBoids);

}