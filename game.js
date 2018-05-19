let canvas = document.getElementById('myCanvas'),
    context = canvas.getContext('2d');

let x = canvas.width / 2,
    y = canvas.height - 30,
    dx = 2,
    dy = -2;

let colors = ["red", "green", "yellow", "teal", "pink", "magenta"];

let ballRadius = 10,
    ballColor = colors[getRandomInt(0, colors.length)];

let paddleHeight = 10,
    paddleWidth = 80,
    paddleX = (canvas.width - paddleWidth) / 2;

let leftPressed = false,
    rightPressed = false;

let brickRowCount = 5,
    brickColumnCount = 8,
    brickWidth = 45,
    brickHeight = 15,
    brickPadding = 11,
    brickOffsetTop = 20,
    brickOffsetLeft = 20;

let bricks = [];

for (let c=0; c < brickColumnCount; c++) {
    bricks[c] = [];
    for (let r=0; r < brickRowCount; r++) {
        bricks[c][r] = { x:0, y:0 };
    }
}

function drawBricks() {
    console.log(bricks);
    for (let c = 0; c<brickColumnCount; c++) {
        for (let r = 0; r<brickRowCount; r++) {
            let brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft,
                brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
            bricks[c][r].x = brickX;
            bricks[c][r].y = brickY;
            context.beginPath();
            context.rect(brickX, brickY, brickWidth, brickHeight);
            context.fillStyle = "#DD4A68";
            context.fill(); 
            context.closePath();    
        }
    }
    console.log(bricks);
}

function drawBall() {
    context.beginPath();
    context.arc(x, y, ballRadius, 0, Math.PI * 2);
    context.fillStyle = ballColor;
    context.fill();
    context.closePath();
}

function drawPaddle() {
    context.beginPath();
    context.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    context.fillStyle = "magenta";
    context.fill();
    context.closePath();
}

function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawBricks();
    drawPaddle();
    drawBall();
    console.log(rightPressed);
    console.log(leftPressed);

    if (rightPressed && paddleX < canvas.width - paddleWidth) {
        paddleX += 5;
    }

    if (leftPressed && paddleX > 0) {
        paddleX -= 5;
    }

    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
        ballColor = colors[getRandomInt(0, colors.length)];

    }

    if (y + dy < ballRadius) {
        dy = -dy;
        ballColor = colors[getRandomInt(0, colors.length)];
    } else if (y + dy > canvas.height - ballRadius) {
        if (x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy - 1;
        } else {
            // alert("game over");
            document.location.reload();
        }
    }

    x += dx;
    y += dy;
}

/**
 * Returns a random integer between min (inclusive) and max (inclusive)
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function keyDownHandler(event) {
    if (event.keyCode === 37) {
        leftPressed = true;
    } else if (event.keyCode === 39) {
        rightPressed = true;
    }
}

function keyUpHandler(event) {
    if (event.keyCode === 37) {
        leftPressed = false;
    } else if (event.keyCode === 39) {
        rightPressed = false;
    }
}

document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);

setInterval(draw, 10);