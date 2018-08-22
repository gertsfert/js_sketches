// matter-js aliases
var Engine = Matter.Engine,
    World = Matter.World,
    Bodies = Matter.Bodies;

var engine;
var world;
var droplets = [];
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
    Engine.run(engine);
}

function createObstacles() {
    obstacles.push(new Obstacle(width/2, height+190, width, 400, world))
}

function draw() {
    background(0);

    for (let i = 0; i<3; i++) {
        spawnDroplet();
    }

    renderObjectList(drawnPolygons);
    renderObjectList(droplets);
    renderObjectList(obstacles);

    if (polygonDrawMode) {
        drawCursor();
        renderPolygonDrawMode();
    }
}

function spawnDroplet(){
    droplets.push(new Droplet(random(width/4, width*0.75), 0, 3, world));
}

function renderObjectList(objectList) {
    for (let i = objectList.length - 1; i >= 0; i--) {
        if (objectList[i].toDelete) {
            objectList.splice(i, 1);
        } else {
            objectList[i].show();
        }
    }
}

function renderPolygonDrawMode() {
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

function drawCursor() {
    push();
    stroke([0, 210, 20]);
    strokeWeight(4);
    line(mouseX, mouseY - CURSOR_SIZE/2, mouseX, mouseY + CURSOR_SIZE/2);
    line(mouseX - CURSOR_SIZE/2, mouseY, mouseX + CURSOR_SIZE/2, mouseY);
    pop();
}

function mousePressed() {
    if (mouseButton == LEFT) {
        if (!polygonDrawMode) {
            // delete any polygon that the mouse is touching
            for (let i of drawnPolygons){
                if (i.isInside(mouseX, mouseY)) {
                    i.toDelete = true;
                }
            }
        } else {
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