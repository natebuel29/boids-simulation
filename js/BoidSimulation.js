
let canvas = document.getElementById('gameCanvas');
let canvasContext = canvas.getContext('2d');
let boidCount = 200;
let boids = [];
let height = 800;
let width = 800;
let min = 0;
let boidLength = 15;
let boidWidth = 5;

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

function InitBoids() {
    for (let i = 0; i < boidCount; i++) {
        let randX = getRandomInt(min, width);
        let randY = getRandomInt(min, width);
        let randDx = getRandomArbitrary(-3, 3.1);
        let randDy = getRandomArbitrary(-3, 3.1);
        let tempBoid = new Boid(randX, randY, randDx, randDy);
        boids.push(tempBoid);
    }
}

function drawBoid(boid) {
    canvasContext.save();
    let angle = Math.atan2(boid.dy, boid.dx);
    canvasContext.translate(boid.x, boid.y);
    canvasContext.rotate(angle);
    canvasContext.translate(-boid.x, -boid.y);
    canvasContext.beginPath();
    canvasContext.moveTo(boid.x, boid.y);
    canvasContext.lineTo(boid.x - boidLength, boid.y - boidWidth);
    canvasContext.lineTo(boid.x - boidLength, boid.y + boidWidth);
    canvasContext.fill();
    canvasContext.restore();
}



function drawAllBoids() {
    canvasContext.clearRect(0, 0, canvas.width, canvas.height)
    for (let i = 0; i < boids.length; i++) {
        let tempBoid = boids[i];
        bounds(tempBoid)
        drawBoid(tempBoid);
        moveBoidToNewPosition(tempBoid)
    }

    window.requestAnimationFrame(drawAllBoids);
}

function bounds(boid) {
    if (boid.x > width + boidLength - 1) {
        boid.x = -boidLength;
    }
    else if (boid.x < -boidLength) {
        boid.x = width + boidLength;
    }
    else if (boid.y > height + boidLength) {
        boid.y = -boidLength;
    } else if (boid.y < -boidLength) {
        boid.y = height + 15;
    }
}

function avoidBoids(boid) {
    let avoidDx = 0;
    let avoidDy = 0;

    for (let i = 0; i < boids.length; i++) {
        let tempBoid = boids[i];
        if (boid !== tempBoid) {
            let a = tempBoid.x - boid.x;
            let b = tempBoid.y - boid.y;
            let c = Math.sqrt(a * a + b * b);
            if (c < 25) {
                avoidDx += (boid.x - tempBoid.x)/c;
                avoidDy += (boid.y - tempBoid.y)/c
            }
        }
    }

    boid.dx += avoidDx;
    boid.dy += avoidDy;
}

function matchVelocity(boid) {
    let matchDx = 0;
    let matchDy = 0;

    for (let i = 0; i < boids.length; i++) {
        let tempBoid = boids[i];

        if (boid !== tempBoid) {
            matchDx += tempBoid.dx;
            matchDy += tempBoid.dy;
        }
    }

    matchDx = matchDx / (boidCount - 1);
    matchDy = matchDy / (boidCount - 1);

    boid.dx += matchDx * 0.15;
    boid.dy += matchDy * 0.15;
}

function flyTowardsCenter(boid) {
    let centerDx = 0;
    let centerDy = 0;

    for (let i = 0; i < boids.length; i++) {
        let tempBoid = boids[i];

        if (boid !== tempBoid) {
            centerDx += tempBoid.x;
            centerDy += tempBoid.y;
        }
    }

    centerDx = centerDx / (boidCount - 1);
    centerDy = centerDy / (boidCount - 1);

    boid.dx += (centerDx - boid.x) * .005;
    boid.dy += (centerDy - boid.y) * .005;
}

function moveBoidToNewPosition(boid) {
    flyTowardsCenter(boid);
    avoidBoids(boid)
    matchVelocity(boid)
    boid.move();
}

function resizeCanvasWindow(){
    height = window.innerHeight-100;
    width = window.innerWidth-100;
    canvas.height = window.innerHeight-100;
    canvas.width = window.innerWidth-100;
}

window.onload = function () {
    InitBoids();
    resizeCanvasWindow();
    window.addEventListener('resize', resizeCanvasWindow);
    window.requestAnimationFrame(drawAllBoids);

}