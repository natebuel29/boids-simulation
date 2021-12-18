class Boid{
    constructor(x,y,dx,dy){ 
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.speed = 3;
    }

    move(){
        // let velocity = this.normalizeVelocity();
        // //this.x = this.x + velocity[0]*this.speed;
        // this.y = this.y + velocity[1]*this.speed;
        this.limitSpeed();
        this.x +=this.dx;
        this.y += this.dy;
    }

    limitSpeed(){
        let vlim = 12;
        let velocityLength = Math.sqrt(this.dx*this.dx +this.dy*this.dy);

        if(velocityLength > vlim){
            this.dx = (this.dx/velocityLength)* vlim
            this.dy = (this.dy/velocityLength)* vlim
        }
    }

    // //todo remove normalizeVelocity and add maxSpeed function

    // normalizeVelocity(){
    //     let length = Math.sqrt(this.dx*this.dx +this.dy*this.dy);
    //     return [this.dx/length,this.dy/length];
    // }
}