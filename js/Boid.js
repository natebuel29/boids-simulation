class Boid{
    constructor(x,y,dx,dy){ 
        console.log("here2");
        this.x = x;
        this.y = y;
        console.log("here3");
        this.dx = dx;
        this.dy = dy;
        this.speed = 3;
    }

    move(){
        let velocity = this.normalizeVelocity();
        this.x = this.x + velocity[0];
        this.y = this.y + velocity[1];
        
    }

    normalizeVelocity(){
        let length = Math.sqrt(this.dx*this.dx +this.dy*this.dy);
        return [this.dx/length,this.dy/length];
    }
}