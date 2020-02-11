const contSnake = document.getElementById('cont-snake');
const childSnake = document.getElementById('child-snake');
const levelOneBtn = document.getElementById('level-1-btn');
const levelTwoBtn = document.getElementById('level-2-btn');
const levelThreeBtn = document.getElementById('level-3-btn');
var img = document.createElement('img');
var step = 2; // to  Change speed change this step value
var runOnBtnClick = false;
const cvs = document.getElementById("snake");
cvs.style.display = 'none';
const ctx = cvs.getContext("2d");

levelOneBtn.addEventListener('click', function () {
    cvs.style.display = 'block';
});


var dir_h = 'right';
var dir_v = 'down';
var dir_h2 = 'up2';
var dir_v2 = 'down2';

// create the unit
const box = 32;

// load images
const ground = new Image();
ground.src = "img/ground.png";

const foodImg = new Image();
foodImg.src = "img/food.png";

const childImg = new Image();
childImg.src = "img/snake.jpg";

// load audio files
let dead = new Audio();
let eat = new Audio();
let up = new Audio();
let right = new Audio();
let left = new Audio();
let down = new Audio();

dead.src = "audio/dead.mp3";
eat.src = "audio/eat.mp3";
up.src = "audio/up.mp3";
right.src = "audio/right.mp3";
left.src = "audio/left.mp3";
down.src = "audio/down.mp3";

levelTwoBtn.addEventListener('click', function () {
    childSnake.style.display = 'block';
    cvs.style.display = 'block';
    runOnBtnClick2 = true;
});

// create the snake
let snake = [];

snake[0] = {
    x: 10 * box,
    y: 3 * box
};

// old head position
let snakeX = snake[0].x;
let snakeY = snake[0].y;

// create the food

let food = {
    x: Math.floor(Math.random() * 17 + 1) * box,
    y: Math.floor(Math.random() * 15 + 3) * box
}

// create the score var

let score = 0;

//control the snake

let d;

document.addEventListener("keydown", direction);

function direction(event) {
    let key = event.keyCode;
    if (key == 37 && d != "RIGHT") {
        left.play();
        d = "LEFT";
    } else if (key == 38 && d != "DOWN") {
        d = "UP";
        up.play();
    } else if (key == 39 && d != "LEFT") {
        d = "RIGHT";
        right.play();
    } else if (key == 40 && d != "UP") {
        d = "DOWN";
        down.play();
    }
}

// cheack collision function
function collision(head, array) {
    for (let i = 0; i < array.length; i++) {
        if (head.x == array[i].x && head.y == array[i].y) {
            return true;
        }
    }
    return false;
}


// draw everything to the canvas

function draw() {

    ctx.drawImage(ground, 0, 0);

    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = (i == 0) ? "white" : "white";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
        ctx.strokeStyle = "red";
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }

    ctx.drawImage(foodImg, food.x, food.y);

    // which direction
    if (d == "LEFT") snakeX -= box;
    if (d == "UP") snakeY -= box;
    if (d == "RIGHT") snakeX += box;
    if (d == "DOWN") snakeY += box;

    // if the snake eats the food
    if (snakeX == food.x && snakeY == food.y) {
        img.setAttribute('src', 'img/snake.jpg');
        img.style.width = '33px';
        img.style.height = '33px';
        img.style.paddingRight = '4px';
        contSnake.appendChild(img);
        img.style.display = 'none';
        if (runOnBtnClick) {
            startLevelThree();
        }
        if (childSnake.style.display === 'block' || childSnake.style.display === 'inline-block'
            && img.style.display == 'block' || img.style.display == 'inline-block') {
            img.style.display = 'block';
            levelOneBtn.addEventListener('click', function () {
                window.location.reload();
                if (childSnake.style.display === 'block') {
                    img.style.display = 'none';
                    childSnake.style.display = 'none';
                }
            });
        }
        score++;
        eat.play();
        food = {
            x: Math.floor(Math.random() * 17 + 1) * box,
            y: Math.floor(Math.random() * 15 + 3) * box
        }
        // we don't remove the tail
    } else {
        // remove the tail
        snake.pop();
    }

    // add new Head

    let newHead = {
        x: snakeX,
        y: snakeY
    }

    // game over

    if (snakeX < box || snakeX > 16 * box || snakeY < 3 * box || snakeY > 17 * box || collision(newHead, snake)) {
        clearInterval(game);
        dead.play();
        h = contSnake.offsetTop;
        w = contSnake.offsetLeft;
    }

    snake.unshift(newHead);
    ctx.fillStyle = "white";
    ctx.font = "45px Changa one";
    ctx.fillText(score, 2 * box, 1.6 * box);

}

// Level third

function levelThree() {
    runOnBtnClick = true;
    var h = contSnake.offsetTop;
    var w = contSnake.offsetLeft;
    if (w >= 890) {
        dir_h = 'left'
    }
    if (w <= 445) {
        dir_h = 'right';
    }
    if (dir_h == 'right') {
        w = w + step;
        h = h - step;
    }
    else {
        w = w - step;
        h = h + step;
    }

    if (h >= 520) {
        dir_v = 'up';
    }
    if (h <= 105) {
        dir_v = 'down';
    }

    if (dir_v == 'down') {
        h = h + step;
        w = w + step;
    }
    else {
        h = h - step;
        w = w - step;
    }
    if (h <= 105 && w <= 445) {
        img.style.display = 'inline-block';
        childSnake.style.display = 'inline-block';
    } else if (h <= 105 && w >= 870) {
        img.style.display = 'block';
        childSnake.style.display = 'block';
        clearInterval(game);
        dead.play();
        h = contSnake.offsetTop;
        w = contSnake.offsetLeft;
        window.location.reload();
    }
    else if (w >= 870 && h >= 520) {
        img.style.display = 'inline-block';
        childSnake.style.display = 'inline-block';
    }
    else if (w <= 450 && h >= 520) {
        img.style.display = 'block';
        childSnake.style.display = 'block';
    }

    contSnake.style.top = h + 'px'; // vertical movment
    contSnake.style.left = w + 'px'; // horizontal  movment

    //////////////////////
}

function startLevelThree() {
    cvs.style.display = 'block';
    levelThree();
    setTimeout(startLevelThree, 20);
}

levelThreeBtn.addEventListener('click', startLevelThree);

// call draw function every 100 ms

let game = setInterval(draw, 150);


