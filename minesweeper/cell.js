
function Cell(i, j, w) {
    this.i = i;
    this.j = j
    this.x = i*w;
    this.y = j*w;
    this.w = w;
    this.neighborCount = 0;
    this.bee = false;
    this.revealed = false;
    this.flagged = false;
}

Cell.prototype.show = function() {
    
    stroke(0);
    noFill();
    rect(this.x, this.y, this.w, this.w)

    if (this.revealed) {
        if (this.bee) {
            fill(255,255,0);
            ellipse(this.x + this.w*0.5, this.y+this.w*0.5, this.w * 0.5)
        } else {
            this.countBees();
            fill(32,200,21);
            rect(this.x, this.y, this.w, this.w);
            if (this.neighborCount > 0) {
                textAlign(CENTER, CENTER);
                fill(0);
                textSize(floor(this.w*0.5))
                text(this.neighborCount, this.x + this.w*0.5, this.y+this.w *0.5)
            } else {
                this.revealNeighbors();
            }
        }
    } else if (this.flagged) {
        fill(255);
        rect(this.x, this.y, this.w, this.w);
        push();
        stroke(0);
        strokeWeight(2);
        let flagX = this.x + this.w/2;
        let flagBottomY = this.y + this.w * 0.9;
        let flagTopY = this.y + this.w/2 * 0.9;
        line(flagX, flagBottomY, flagX, flagTopY);
        fill(255, 0, 0);
        let triBottomY = (flagTopY + flagBottomY)/ 2;
        let triMidY = (flagTopY + triBottomY) / 2;
        let triMidX = flagX + this.w * 0.2;
        triangle(flagX, flagTopY, flagX, triBottomY, triMidX, triMidY);
        pop();
    }
}

Cell.prototype.countBees = function() {
    if (this.bee) {
        return -1;
    }
    
    var total = 0; 

    for (var i = -1; i <= 1; i++) {
        for (var j = -1; j <= 1; j++) {
            if (this.i + i >= 0 && this.j + j >= 0 && this.i + i < cols && this.j + j < rows) {
                var neighbor = grid[this.i + i][this.j + j];
                if (neighbor.bee) {
                    total++;
                }
            }
        }
    }
    this.neighborCount = total;
}

Cell.prototype.contains = function(x, y) {
    return (x > this.x && x < this.x + this.w && y > this.y && y < this.y + this.w);
}

Cell.prototype.reveal = function() {
    console.log('revealing grid[' + str(this.i) + '][' + str(this.j) + ']')
    this.revealed = true;
}

Cell.prototype.revealNeighbors = function() {
    for (var i = -1; i <= 1; i++) {
        for (var j = -1; j <= 1; j++) {
            if (this.i + i >= 0 && this.j + j >= 0 && this.i + i < cols && this.j + j < rows) {
                var neighbor = grid[this.i + i][this.j + j];
                if (!neighbor.revealed) {
                    neighbor.reveal()
                }
            }
        }
    }
}

Cell.prototype.toggleFlag = function () {
    console.log('FLAG')
    this.flagged = !this.flagged;
}