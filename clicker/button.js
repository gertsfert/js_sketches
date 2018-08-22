class ClickButton{
    constructor(x, y, w, h, name) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.name = name;
    }

    draw() {
        var img = null;
        if (mouseIsPressed && this.mouseIsOverSelf()) {
            img = buttonDown;
        } else {
            img = buttonUp;
        }
        image(img, this.x, this.y, this.w, this.h);
    }

    mouseIsOverSelf() {
        return (mouseX > this.x && mouseX < this.x + this.w
            && mouseY > this.y && mouseY < this.y + this.h)
    }
}