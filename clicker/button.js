class ClickButton{
    constructor(x, y, w, h, name, buttonColorDict) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.name = name;
        this.buttonUp = buttonColorDict['up'];
        this.buttonDown = buttonColorDict['down'];
    }

    draw() {
        var img = null;
        if (mouseIsPressed && this.mouseIsOverSelf()) {
            img = this.buttonDown;
        } else {
            img = this.buttonUp;
        }
        image(img, this.x, this.y, this.w, this.h);
        push();
        fill(0);
        textAlign(CENTER, CENTER);
        textStyle(BOLD);
        text(this.name, this.x + this.w*0.5, this.y + this.h/2);
        pop();
    }

    mouseIsOverSelf() {
        return (mouseX > this.x && mouseX < this.x + this.w
            && mouseY > this.y && mouseY < this.y + this.h)
    }
}