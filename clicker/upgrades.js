var balls = [];
var ballSpeed = 0.5;
var upgradeLastClicked = 0;

class Ball{
    constructor(x, y, r, xDir, yDir, color) {
        this.spawnX = x;
        this.spawnY = y;
        this.x = x;
        this.xDir = xDir;
        this.yDir = yDir;

        this.y = y;
        this.r = r;
        this.color = color;
        this.value = 1;
    }

    draw() {
        push();
        fill(this.color);
        strokeWeight(2);
        stroke(0);
        ellipse(this.x, this.y, this.r * 2);
        fill(0);
        textAlign(CENTER, CENTER);
        text(this.value, this.x, this.y);
        pop();
        
    }

    update() {
        this.y += ballSpeed * this.yDir;
        this.x += ballSpeed * this.xDir;

        // horizontal boundaries
        if ((this.x - this.r <= 0) || (this.x + this.r >= width)) {
            this.xDir = -this.xDir;
        }
        // vertical boundaries
        if ((this.y - this.r <= 0) || (this.y + this.r >= height)) {
            this.yDir = -this.yDir;
        }

    }

    hasTouchedButton(button) {
        return (button.x <= this.x + this.r && 
            button.x + button.w >= this.x - this.r && 
            button.y <= this.y + this.r && 
            button.y + button.h >= this.y - this.r);
    }

    respawn() {
        this.x = this.spawnX;
        this.y = this.spawnY;
    }
}


function checkForUpgrades() {
    if (clicks > 10 && !bottomMenu[0]) {
        bottomMenu.addButton(10, bottomMenu.y + 5, 80, 30, '(10) Ball++', 
        buttonImages['green'], addBall);
    }

    if (clicks > 100 && !bottomMenu[1]) {
        bottomMenu.addButton(100, bottomMenu.y + 5, 120, 30, '(100) BallSpeed++',
        buttonImages['aqua'], incBallSpeed);
    }

    if (balls.length > 20) {
        message('The Balls Combine!');
        balls.splice(0, 20);
        // want to push a new ball somewhere random on RHS
        balls.push(new Ball(width - 20 - 2, random(height - bottomMenu.y) + 20, 
            20, -1, random([0, 1]), [255, 180, 90]));
        balls[balls.length - 1].value = 20;
    }
}

function addBall() {
    if (clicks >= 10 && frameCount > upgradeLastClicked + 10) {
        clicks -= 10;
        balls.push(new Ball(clicky.x + clicky.w/2, height - bottomMenu.h, 10, 0, -1, [200, 60, 255, 60]));
        upgradeLastClicked = frameCount;
    }
}

function incBallSpeed() {
    if (clicks >= 100 && frameCount > upgradeLastClicked + 10) {
        clicks -= 100;
        ballSpeed += 0.2;
        upgradeLastClicked = frameCount;
    }
}