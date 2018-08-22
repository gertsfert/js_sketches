class MenuBar{
    constructor(x, y, w, h, bgColor) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.bgColor = 51;

        this.buttons = [];
    }

    draw() {
        push();
        fill(this.bgColor);
        noStroke();
        rect(this.x, this.y, this.w, this.h);
        pop();
        for (let b of this.buttons) {
            b['button'].draw();
        }
    }

    addButton(x, y, w, h, name, buttonColorDict, fn) {
        this.buttons.push({
            'button': new ClickButton(x, y, w, h, name, buttonColorDict),
            'fn': fn});
    }
}