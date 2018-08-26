var clicks = 800;

// prevent double click text selection
document.addEventListener('mousedown', function (event) {
    if (event.detail > 1) {
      event.preventDefault(); // of course, you still do not know what you prevent here... You could also check event.ctrlKey/event.shiftKey/event.altKey to not prevent something useful.
    }
  }, false);

function preload() {
    buttonUpPink = loadImage('Buttons/button_up_pink.png');
    buttonDownPink = loadImage('Buttons/button_down_pink.png');
    
    buttonImages = {
        'pink': {'up': loadImage('Buttons/button_up_pink.png'),
                 'down': loadImage('Buttons/button_down_pink.png')},
        'aqua': {'up': loadImage('Buttons/button_up_aqua.png'),
                 'down': loadImage('Buttons/button_down_aqua.png')},
        'green': {'up': loadImage('Buttons/button_up_green.png'),
                  'down': loadImage('Buttons/button_down_green.png')},
        'orange': {'up': loadImage('Buttons/button_up_orange.png'),
                   'down': loadImage('Buttons/button_down_orange.png')}
    }
}

function setup() {
    clickString = createDiv('Clicks: 0')
    createCanvas(600, 400);
    clicky = new ClickButton(20, 20, 80, 40, 'clicky', buttonImages['pink']);

    bottomMenu = new MenuBar(0, height - 80, width, 80, 51);

}

function draw() {
    background(255);
    clicky.draw();
    bottomMenu.draw();
    for (let b of balls) {
        b.update();
        if (b.hasTouchedButton(clicky)) {   q
            clicks += b.value;
            b.respawn();
        }
        b.draw();
    }
    clickString.html('Clicks: ' + clicks);
    if (frameCount % 360 == 0) {
        checkForUpgrades();
    }
}



function mousePressed() {
    if (clicky.mouseIsOverSelf()) {
        clicks++;
    }

    for (let b of bottomMenu.buttons) {
        if (b['button'].mouseIsOverSelf()) {
            b['fn']();
        }
    }
}

function message(msg) {
    console.log(msg);
}
