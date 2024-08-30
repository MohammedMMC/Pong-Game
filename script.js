const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const paddleWidth = 10, paddleHeight = 100, ballSize = 10;
let leftPaddleY = canvas.height / 2 - paddleHeight / 2;
let rightPaddleY = canvas.height / 2 - paddleHeight / 2;
let ballX = canvas.width / 2, ballY = canvas.height / 2;
let ballSpeedX = 5, ballSpeedY = 3;
let leftPaddleSpeed = 0, rightPaddleSpeed = 0;
let leftScore = 0, rightScore = 0;
let gameInterval;
let isPaused = true;

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, leftPaddleY, paddleWidth, paddleHeight);
    ctx.fillRect(canvas.width - paddleWidth, rightPaddleY, paddleWidth, paddleHeight);
    ctx.fillRect(ballX, ballY, ballSize, ballSize);

    ctx.font = '30px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(leftScore, canvas.width / 4, 30);
    ctx.fillText(rightScore, canvas.width * 3 / 4, 30);
}

function update() {
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    if (ballY <= 0 || ballY + ballSize >= canvas.height) ballSpeedY = -ballSpeedY;

    if (ballX <= paddleWidth && ballY > leftPaddleY && ballY < leftPaddleY + paddleHeight) {
        ballSpeedX = -ballSpeedX;
        ballSpeedX *= 1.1;
        ballSpeedY *= 1.1;
    }
    if (ballX + ballSize >= canvas.width - paddleWidth && ballY > rightPaddleY && ballY < rightPaddleY + paddleHeight) {
        ballSpeedX = -ballSpeedX;
        ballSpeedX *= 1.1;
        ballSpeedY *= 1.1;
    }

    if (ballX < 0) {
        rightScore++;
        resetBall();
    }
    if (ballX + ballSize > canvas.width) {
        leftScore++;
        resetBall();
    }

    leftPaddleY += leftPaddleSpeed;
    rightPaddleY += rightPaddleSpeed;

    if (leftPaddleY < 0) leftPaddleY = 0;
    if (leftPaddleY + paddleHeight > canvas.height) leftPaddleY = canvas.height - paddleHeight;
    if (rightPaddleY < 0) rightPaddleY = 0;
    if (rightPaddleY + paddleHeight > canvas.height) rightPaddleY = canvas.height - paddleHeight;
}

function resetBall() {
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
    ballSpeedX = 5 * (Math.random() > 0.5 ? 1 : -1);
    ballSpeedY = 3 * (Math.random() > 0.5 ? 1 : -1);
}

function gameLoop() {
    draw();
    update();
}

function startGame() {
    if (isPaused) {
        isPaused = false;
        document.getElementById('startBtn').style.display = 'none';
        document.getElementById('pauseBtn').style.display = 'inline';
        gameInterval = setInterval(gameLoop, 1000 / 60);
    }
}

function pauseGame() {
    if (!isPaused) {
        isPaused = true;
        document.getElementById('pauseBtn').style.display = 'none';
        document.getElementById('resumeBtn').style.display = 'inline';
        clearInterval(gameInterval);
    }
}

function resumeGame() {
    if (isPaused) {
        isPaused = false;
        document.getElementById('resumeBtn').style.display = 'none';
        document.getElementById('pauseBtn').style.display = 'inline';
        gameInterval = setInterval(gameLoop, 1000 / 60);
    }
}

document.getElementById('startBtn').addEventListener('click', startGame);
document.getElementById('pauseBtn').addEventListener('click', pauseGame);
document.getElementById('resumeBtn').addEventListener('click', resumeGame);

document.addEventListener('keydown', (e) => {
    if (e.key === 'w') leftPaddleSpeed = -6;
    if (e.key === 's') leftPaddleSpeed = 6;
    if (e.key === 'ArrowUp') rightPaddleSpeed = -6;
    if (e.key === 'ArrowDown') rightPaddleSpeed = 6;
});

document.addEventListener('keyup', (e) => {
    if (e.key === 'w' || e.key === 's') leftPaddleSpeed = 0;
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') rightPaddleSpeed = 0;
});