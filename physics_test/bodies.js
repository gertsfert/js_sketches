class Boxey {

    constructor(x, y, w, h, world) { 
        this.body = Bodies.rectangle(x, y, w, h);
        this.w = w;
        this.h = h;
        World.add(world, this.body);
        this.world = world;
    }

    show() {
        rectMode(CENTER);
        var pos = this.body.position;
        var angle = this.body.angle;

        push();
        translate(pos.x, pos.y);
        rotate(this.body.angle)
        rect(0, 0, this.w, this.h)
        pop();
    }
}

class Obstacle {
    constructor(x, y, w, h, world) {
        const options = {
            'isStatic': true
        }
        this.body = Bodies.rectangle(x, y, w, h, options);
        this.w = w;
        this.h = h;
        World.add(world, this.body);
        this.world = world;
    }

    show() {``
        rectMode(CENTER)
        var pos = this.body.position;

        push();
        rotate(this.body.angle)
        translate(pos.x, pos.y);
        rect(0, 0, this.w, this.h);
        pop();
    }
}