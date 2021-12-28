class Boid{
    constructor(x,y,dx,dy){ 
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.speed = 3;
    }

    move(){
        this.limitSpeed();
        this.x +=this.dx;
        this.y += this.dy;
    }

    limitSpeed(){
        let vlim = 8;
        let velocityLength = Math.sqrt(this.dx*this.dx +this.dy*this.dy);

        if(velocityLength > vlim){
            this.dx = (this.dx/velocityLength)* vlim
            this.dy = (this.dy/velocityLength)* vlim
        }
    }
}