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

class DrawnPolygon {
    constructor(coordinateList, world) {
        const options = {
            'density': 0.0001
        }
        
        // coordinate list needs to be normalised
        let minValue = null;
        
        // need sums to get average coordinates (for center point)
        for (let c of coordinateList) {
            if (!minValue || c.x < minValue) {
                minValue = c.x;
            }
            if (c.y < minValue) {
                minValue = c.y
            }
        }

        let vertList = [];
        for (let c of coordinateList) {
            vertList.push({x: c.x, y: c.y})
        }
        
        let vertices = Matter.Vertices.clockwiseSort(vertList);
        vertices = Matter.Vertices.create(vertices);
        let centre = Matter.Vertices.centre(vertices)
        
        for (let v of vertices) {
            v.x -= minValue;
            v.y -=minValue;
        }
        console.log(vertices);

        this.body = Bodies.fromVertices(centre.x, centre.y, vertices, options);
        World.add(world, this.body);
        this.world = world;
        console.log(this.body.position);
    }

    show() {
        push();
        stroke(180);
        strokeWeight(3);
        beginShape();
        for (let p of this.body.vertices) {
            vertex(p.x, p.y);
        }
        endShape(CLOSE);
        pop();
    }
}