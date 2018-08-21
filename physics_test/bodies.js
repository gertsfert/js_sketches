class Boxey {

    constructor(x, y, w, h, world) { 
        this.body = Bodies.rectangle(x, y, w, h);
        this.w = w;
        this.h = h;
        World.add(world, this.body);
        this.world = world;
    }

    show() {
        var pos = this.body.position;
        var angle = this.body.angle;

        push();
        translate(pos.x, pos.y);
        rect(0, 0, this.w, this.h)
        pop();
    }
}

class Wall extends Boxey {
    constructor() {
        this.body
    }

}