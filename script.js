var cvs = document.getElementById("game");
var score = document.getElementById("score");
var ctx = cvs.getContext("2d");

const keyUp = 38;
const space = 32;

var gravity = 0.05;
var velocity = 0;
var lift = 3.5;
var bottomOfCanvas = 462;
var block = new Image();
var imgCount = 1;
var blockX = 10;
var blockY = 100;
var speed = 1;
var topPipeCoordinates = [];
var botPipeCoordinates = [];
var pipeWidth = 30;
var pipeLength = 500;
var blockWidth = 50;
var blockHeight = 50;
var nextPipeSpawnDistance = 300;
var scoreCount = 0;

// here because image wouldn't load and it confused me for a while
block.onload = draw;
block.onerror = function() { alert(block.src + ' failed'); }

block.src = "images/Solid_black.png";

topPipeCoordinates[0] = {
    x: cvs.clientWidth - 50,
    y: getRndInteger(-500, -100)
};

botPipeCoordinates[0] = {
    x: cvs.clientWidth - 50,
    y: topPipeCoordinates[0].y + 700
};


document.onkeydown = moveDirection;

function moveDirection(e) {
    if (e.keyCode == keyUp || e.keyCode == space) {
        velocity -= lift;
    }
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
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
    console.log(botPipeCoordinates[0].y);
    ctx.drawImage(block, blockX, blockY, blockWidth, blockHeight);

    for (var i = 0; i < topPipeCoordinates.length; i++) {
        ctx.fillRect(topPipeCoordinates[i].x, topPipeCoordinates[i].y, pipeWidth, pipeLength);
        ctx.fillRect(botPipeCoordinates[i].x, botPipeCoordinates[i].y, pipeWidth, pipeLength);
        topPipeCoordinates[i].x -= speed;
        botPipeCoordinates[i].x -= speed;

        if (topPipeCoordinates[i].x == (cvs.clientWidth - nextPipeSpawnDistance)) {
            topPipeCoordinates.push({
                x: cvs.clientWidth,
                y: getRndInteger(-500, -100)
            });
            botPipeCoordinates.push({
                x: cvs.clientWidth,
                y: topPipeCoordinates[i + 1].y + 700
            });
        }

        if (topPipeCoordinates[i].x == 10) {
            scoreCount += 1;
            score.textContent = scoreCount;
        }

        /*
         * collision detection (long disgusting if-statement)
         * maybe a better way to do this but this does the job
         */
        if ((blockX < botPipeCoordinates[i].x && (blockX + blockWidth) >= botPipeCoordinates[i].x &&
                (blockY + blockHeight) >= botPipeCoordinates[i].y) ||
            (blockX >= botPipeCoordinates[i].x && (blockX < (botPipeCoordinates[i].x + pipeWidth) &&
                (blockY + blockHeight) >= botPipeCoordinates[i].y)) ||
            (blockX < topPipeCoordinates[i].x && (blockX + blockWidth) >= topPipeCoordinates[i].x &&
                blockY <= (topPipeCoordinates[i].y + pipeLength)) ||
            (blockX >= topPipeCoordinates[i].x && blockX < (topPipeCoordinates[i].x + pipeWidth) &&
                blockY <= (topPipeCoordinates[i].y + pipeLength))
        ) {
            speed = 0;
            ctx.font = "bold 40px Arial";
            ctx.strokeText("DEATH", (cvs.width / 2) - 60, (cvs.height / 2));
            setTimeout(function() { location.reload(); }, 500); // pause for 0.5 seconds to display death screen
        }
    }
    update();
}

draw();