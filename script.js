var cvs = document.getElementById("game");
var ctx = cvs.getContext("2d");

const keyLeft = 37;
const keyUp = 38;
const keyRight = 39;
const keyDown = 40;

var gravity = 0.05;
var velocity = 0;
var lift = 3;

var bottomOfCanvas = 462;

// amount to move on key down
const translate = 20;

var block = new Image();

// here because image wouldn't load and it confused me for a while
block.onload = draw;
block.onerror = function() { alert(block.src + ' failed'); }

block.src = "images/Solid_black.png";

var imgCount = 1;

var blockX = 10;
var blockY = 100;

var speed = 5;

document.onkeydown = moveDirection;

function moveDirection(e) {
    if (e.keyCode == keyLeft) {
        blockX -= translate;
    }
    if (e.keyCode == keyUp) {
        velocity -= lift;
    }
    if (e.keyCode == keyRight) {
        blockX += translate;
    }
}

window.onload = function() {
    setInterval(draw, 1);
}

function update() {
    velocity += gravity;
    blockY += velocity;

    if (blockY >= bottomOfCanvas) {
        blockY = bottomOfCanvas;
        velocity = 0;
    }
}


function draw() {
    if (--imgCount > 0) { return; }

    ctx.clearRect(0, 0, cvs.width, cvs.height) // clear canvas each redraw
    console.log(cvs.clientWidth);
    ctx.drawImage(block, blockX, blockY, 50, 50);
    update();
}

draw();