let canvas = document.getElementById('myCanvas');
let context = canvas.getContext('2d');

let x = canvas.width / 2;
let y = canvas.height - 30;
let dx = 2;
let dy = -2;

let colors = ["red", "green", "yellow", "teal", "pink", "magenta"];

let ballRadius = 10;
let ballColor = colors[getRandomInt(0, colors.length)];

let paddleHeight = 10;
let paddleWidth = 70;
let paddleX = (canvas.width - paddleWidth) / 2;

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
    drawPaddle();
    drawBall();
    
    x += dx;
    y += dy;

    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
        ballColor = colors[getRandomInt(0, colors.length)];

    }

    if (y + dy > canvas.height - ballRadius || y + dy < ballRadius) {
        dy = -dy;
        ballColor = colors[getRandomInt(0, colors.length)];
    }
}

/**
 * Returns a random integer between min (inclusive) and max (inclusive)
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

setInterval(draw, 10);