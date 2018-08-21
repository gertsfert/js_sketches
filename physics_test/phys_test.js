// matter-js aliases
var Engine = Matter.Engine,
    World = Matter.World,
    Bodies = Matter.Bodies;

var engine;
var world;
var boxes = [];
var obstacles = [];

const RECT_WIDTH = 80;
const RECT_HEIGHT = 80;

function setup() {
    createCanvas(400, 400);
    engine = Engine.create();
    world = engine.world;
    createObstacles();
    boxes.push(new Boxey(width/2, height/2, RECT_WIDTH, RECT_HEIGHT, world));
    Engine.run(engine);
}

function createObstacles() {
    obstacles.push(new Obstacle(width/2, height, width, 40, world))
}

function draw() {
    background(0);

    for (let i of boxes) {
        i.show();
    }

    for (let i of obstacles) {
        i.show();
    }
}

function mousePressed() {
    boxes.push(new Boxey(mouseX, mouseY, 20, 20, world))
}