var x = 0;
var y = 0;
let ball_arr = [];
const MAX_BALLS = 300;

function setup() {
    createCanvas(600, 400);
    ball_arr.push(new Ball(width/2, height/2, 50, 1, 1, 0))
}

function draw() {
    background(0);
    
    for (let i = 0; i < ball_arr.length; i++) {
        ball_arr[i].move();
        ball_arr[i].draw();
    }
}

function randColour() {
    colorMode(HSB, 360)
    return [random(360), 360, 360]
}

class Ball {
    constructor(x, y, r, x_vel, y_vel, i) {
        this.x = x;
        this.y = y;
        this.x_vel = x_vel;
        this.y_vel = y_vel;
        this.r = r;
        this.fillColour = randColour();
        this.i = i;
    }

    draw() {
        stroke(51);
        strokeWeight(4);
        fill(this.fillColour);
        ellipse(this.x, this.y, this.r * 2);
    }

    move() {
        // check ball collisions/boundaries first
        
        // horizontal boundaries
        if ((this.x - this.r <= 0) || (this.x + this.r >= width)) {
            this.genNewBall();
            this.x_vel = -this.x_vel;
        }
        // vertical boundaries
        if ((this.y - this.r <= 0) || (this.y + this.r >= height)) {
            this.genNewBall();
            this.y_vel = -this.y_vel;
        }
        
        this.x += this.x_vel;
        this.y += this.y_vel;
    }

    genNewBall() {
        //hit a vertical barrier
        var new_x_vel = -(this.x_vel)
        var new_y_vel = -(this.y_vel)
        var new_x = this.x + new_x_vel;
        var new_y = this.y + new_y_vel;

        if (ball_arr.length < MAX_BALLS) {
            ball_arr.push(new Ball(new_x, new_y, this.r * 0.9, new_x_vel, new_y_vel, ball_arr.length));
        } else {
            new Ball(new_x, new_y, this.r * 0.9, new_x_vel, new_y_vel, ball_arr.length);
        }
    }
}