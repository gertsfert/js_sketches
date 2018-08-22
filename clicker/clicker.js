var clicks = 0;

// prevent double click text selection
document.addEventListener('mousedown', function (event) {
    if (event.detail > 1) {
      event.preventDefault(); // of course, you still do not know what you prevent here... You could also check event.ctrlKey/event.shiftKey/event.altKey to not prevent something useful.
    }
  }, false);

function preload() {
    buttonUp = loadImage('Buttons/button_up.png');
    buttonDown = loadImage('Buttons/button_down.png');
}

function setup() {
    clickString = createDiv('Clicks: 0')
    createCanvas(600, 400);
    clicky = new ClickButton(20, 20, buttonUp.width/2, buttonUp.height/2, 'clicky');
}

function draw() {
    background(255);
    clicky.draw();
}

function mousePressed() {
    if (clicky.mouseIsOverSelf()) {
        clicks++;
        clickString.html('Clicks: ' + clicks);
    }
}