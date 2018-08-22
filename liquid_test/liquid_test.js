// matter-js aliases
var Engine = Matter.Engine,
    World = Matter.World,
    Bodies = Matter.Bodies;

var engine;
var world;
var boxes = [];
var drawnPolygons = [];
var obstacles = [];
var polygonDrawMode = false;
var drawnPolygon = [];

const RECT_WIDTH = 80;
const RECT_HEIGHT = 80;

const CURSOR_SIZE = 20;


// prevent right click
document.addEventListener('contextmenu', event => event.preventDefault());

function setup() {
    createCanvas(500, 500);
    engine = Engine.create();
    world = engine.world;
    createObstacles();
    boxes.push(new Boxey(width/2, height/2, RECT_WIDTH, RECT_HEIGHT, world));
    Engine.run(engine);
}

function createObstacles() {
    obstacles.push(new Obstacle(width/2, height+190, width, 400, world))
}

function draw() {
    background(0);

    for (let i of boxes) {
        i.show();
    }

    for (let i of obstacles) {
        i.show();
    }

    for (let i of drawnPolygons) {
        i.show();
    }

    if (polygonDrawMode) {
        // draw cursor
        push();
        stroke([0, 210, 20]);
        strokeWeight(4);
        line(mouseX, mouseY - CURSOR_SIZE/2, mouseX, mouseY + CURSOR_SIZE/2);
        line(mouseX - CURSOR_SIZE/2, mouseY, mouseX + CURSOR_SIZE/2, mouseY);
        pop();

        // draw polygon
        for (let i=0; i < drawnPolygon.length; i++) {
            push();
            stroke([0, 210, 20]);
            strokeWeight(8);
            point(drawnPolygon[i].x, drawnPolygon[i].y);
            pop();
            push();
            stroke(255);
            strokeWeight(4);
            if (i != 0) {
                line(drawnPolygon[i].x, drawnPolygon[i].y, drawnPolygon[i-1].x, drawnPolygon[i-1].y)
            }
            pop();
        }
    }
}

function mousePressed() {
    if (mouseButton == LEFT) {
        if (!polygonDrawMode) {
            // spawn new box
            boxes.push(new Boxey(mouseX, mouseY, 20, 20, world));
        } else {
            // place new point in drawnPolygon
            drawnPolygon.push(new Coordinate(mouseX, mouseY));
        }
    } else if (mouseButton == RIGHT) {
        // enter polygon draw mode
        if (polygonDrawMode) {

            if (drawnPolygon.length > 2) {
                // finish drawing polygon
                drawnPolygon.push(new Coordinate(mouseX, mouseY));
        
                // create custom polygon
                drawnPolygons.push(new DrawnPolygon(drawnPolygon, world));
            }
            drawnPolygon = [];
        }
        polygonDrawMode = !polygonDrawMode;
    }
}

class Coordinate{
    constructor(x, y) {
    this.x = x;
    this.y = y;
    }
}