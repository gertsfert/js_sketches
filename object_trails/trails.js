var bubbles = [];
var counter = 0;
const changeRate = 100;
const maxHistory = 200;
const maxBubbles = 5;
const historyRecordRate = 3;

const headings = ['Oooo', 'Ahhhhh', 'Oh yeah', 'Wow ee', 'Super!', 'That\'s Great', 'Faaaaantastic',
    'Ooo My', 'Goodness Me', 'I felt that', 'Makes me feel young again', 'My my my...', 'Hello there!',
    'Afternoon Delight', 'Boom goes the dynamite', 'Netflix and chill', 'Giddy-up', 'Get on up', 'Take on me',
    'Oh what a feeling!', 'When I get that feeling...', 'Only you.', 'Oh hello there!', 'I <b> really </b> felt that']

class Position {
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
}

class Bubble {
    constructor(x, y, size, color) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
        this.velX = 0;
        this.velY = -random() * 0.1;
        this.accX = 0;
        this.accY = 0;
        this.recordHistory = 0;
        this.popped = false;
        
        this.historyPosition = [new Position(x, y)];
        this.historyColor = [color];
    }

    draw() {
        colorMode(HSB, 360);
        stroke(this.color);
        strokeWeight(4);
        fill(this.color)
        ellipse(this.x, this.y, this.size, this.size);

        for (var i = 1; i < this.historyPosition.length; i++) {
            let trailX = this.historyPosition[i].x;
            let trailY = this.historyPosition[i].y;
            let trailColor = this.historyColor[i].slice();
            trailColor.push(map(i, 1, this.historyPosition.length, 0, 255))

            if (dist(trailX, trailY, this.historyPosition[i-1].x, this.historyPosition[i-1].y) < 50){
                stroke(trailColor);
                strokeWeight(map(i, 1, this.historyPosition.length, 0, this.size/3));
                line(trailX, trailY, this.historyPosition[i-1].x, this.historyPosition[i-1].y);
            }
        }
    }

    randVelocity() {
        this.accX = (random() * 4 - 2 - this.velX) / changeRate;
        this.accY = -(random() * 0.1 - this.velY) / changeRate;
    }

    update() {
        this.velX += this.accX;
        this.velY += this.accY;

        this.x += this.velX;
        this.y += this.velY;

        if (this.y > height || this.y < 0){
            heading.html(random(headings));
            this.y = height;
            this.color = [floor(random(360)), 360, 360];
            this.velY = -random() * 0.1;
        }
        if (this.x > width) {
            this.x = 0;
        } else if (this.x < 0) {
            this.x = width;
        }
        if (this.recordHistory % historyRecordRate == 0) {
            this.historyPosition.push(new Position(this.x, this.y));
            this.historyColor.push(this.color.slice());
            this.recordHistory = 0;
        }
        this.recordHistory++;

        if (this.historyPosition.length >= maxHistory) {
            this.historyPosition.shift();
            this.historyColor.shift();
        }
    }
}



function setup() {
    heading = createElement('h2','Object Trails');

    createCanvas(600, 400);
}

colorMode(HSB, 360);


function draw() {
    if (counter % changeRate == 0) {
        for (let box of bubbles) {
            box.randVelocity();
        }
        counter = 0;
    }
    background(360);
    for (let box of bubbles) {
        box.draw();
        box.update();
    }
    counter ++;
}


function mousePressed() {
    bubbles.push(new Bubble(mouseX, height, 30, [floor(random(360)), 360, 360]))

    if (bubbles.length > maxBubbles) {
        bubbles.shift();
    }
}