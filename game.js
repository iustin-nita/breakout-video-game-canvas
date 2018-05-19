let canvas = document.getElementById('myCanvas'),
    context = canvas.getContext('2d');

let x = canvas.width / 2,
    y = canvas.height - 30,
    dx = 2,
    dy = -2;

let colors = ["red", "green", "yellow", "teal", "pink", "magenta"];

let ballRadius = 8,
    ballColor = colors[getRandomInt(0, colors.length)];

let paddleHeight = 10,
    paddleWidth = 90,
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
let score = 0;
let lives = 3;

for (let c=0; c < brickColumnCount; c++) {
    bricks[c] = [];
    for (let r=0; r < brickRowCount; r++) {
        bricks[c][r] = { x:0, y:0, status: 1 };
    }
}

function drawBricks() {
    for (let c = 0; c<brickColumnCount; c++) {
        for (let r = 0; r<brickRowCount; r++) {
            if (bricks[c][r].status === 1) {
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
    }
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

function drawLives() {
  context.font = "16px Arial";
  context.fillStyle = "#0095DD";
  context.fillText("Lives: " + lives, canvas.width - 65, 20);
}

function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawBricks();
    drawPaddle();
    drawScore();
    drawBall();
    drawLives();
    collisionDetection();

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
            dy = -dy - 0.1;
        } else {
            lives--;
            if (!lives) {
              console.log(`Game over! You have ${score} points`);
              document.location.reload();
            } else {
              x = canvas.width / 2;
              y = canvas.height - 30;
              dx = 2;
              dy = -2;
              paddleX = (canvas.width - paddleWidth) / 2;
            }
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

function mouseMoveHandler(e) {
  var relativeX = e.clientX - canvas.offsetLeft;
  if (relativeX > 0 && relativeX < canvas.width) {
    paddleX = relativeX - paddleWidth / 2;
  }
}

function collisionDetection() {
  for (let c = 0; c < brickColumnCount; c++) {
    for (let r = 0; r < brickRowCount; r++) {
      let b = bricks[c][r];
      // calculations
      if (b.status === 1) {
          if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
              console.log('COLLISION');
              b.status = 0;
              ballColor = colors[getRandomInt(0, colors.length)];
              dy = -dy;
              score += 12;
              if (score == brickRowCount * brickColumnCount * 12) {
                alert(`YOU WIN, CONGRATULATIONS! You have ${score} points`);
                document.location.reload();
              }
          }
      }
    }
  }
}

function drawScore() {
  context.font = "16px Arial";
  context.fillStyle = "#0095DD";
  context.fillText("Score: " + score, 8, 20);
}

document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);

setInterval(draw, 10);