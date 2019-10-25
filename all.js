/*
Create by Learn Web Developement
Youtube channel : https://www.youtube.com/channel/UC8n8ftV94ZU_DJLOLtrpORA
*/

const ctx = document.getElementById("snake").getContext("2d");

// create the unit
const box = 32;

// load images

const ground = new Image();
ground.src = "img/ground.png";

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

// create the snake

let snake = [];

snake[0] = {
    x: Math.floor(Math.random() * 15 + 2) * box,
    y: Math.floor(Math.random() * 13 + 4) * box
};

// create the food

let food = {
    x: Math.floor(Math.random() * 17 + 1) * box,
    y: Math.floor(Math.random() * 15 + 3) * box
}

// create the score var

let score = 100;

//control the snake

box_x = -1;
box_y = -1;

//control the food

document.addEventListener("keydown", direction);

function direction(event) {
    let key = event.keyCode;
    if ((key == 37 || key == 65) && food.x > box) food.x -= box
    if ((key == 38 || key == 87) && food.y > 3 * box) food.y -= box
    if ((key == 39 || key == 68) && food.x < 17 * box) food.x += box;
    if ((key == 40 || key == 83) && food.y < 17 * box) food.y += box;
}

// check eat function
function Eat_Food(food, array) {
    for (let i = 0; i < array.length; i++) {
        if (food.x == array[i].x && food.y == array[i].y) {
            return true;
        }
    }
    return false;
}

function firsttime(){
    ctx.drawImage(ground, 0, 0);
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = "green";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
        ctx.strokeStyle = "red";
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }
    // old head position
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    // add new Head

    let newHead = {
        x: snakeX,
        y: snakeY
    }

    // change direction

    if (snakeX < 2 * box){
        left.play();
        box_x *= -1;
    } if (snakeX > 16 * box){ 
        right.play();
        box_x *= -1;
    } if (snakeY < 4 * box){
        up.play();
        box_y *= -1;
    } if (snakeY > 16 * box){
        down.play();
        box_y *= -1;
    }
    
    // if the snake eats the food
    if (Eat_Food(food, snake)) {
        score -= 5;
        eat.play();
        food = {
            x: Math.floor(Math.random() * 17 + 1) * box,
            y: Math.floor(Math.random() * 15 + 3) * box
        }
        // we don't remove the tail
    }


    snake.unshift(newHead);

}

// draw everything to the canvas

function draw() {

    if (score == 0) {
        clearInterval(game);
        dead.play();
    }

    ctx.drawImage(ground, 0, 0);

    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = "green";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);

        ctx.strokeStyle = "red";
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, box, box);

    // old head position
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    // move
    snakeY += box * box_y
    snakeX += box * box_x;

    // add new Head

    let newHead = {
        x: snakeX,
        y: snakeY
    }

    // change direction

    if (snakeX < 2 * box){
        left.play();
        box_x *= -1;
    } if (snakeX > 16 * box){ 
        right.play();
        box_x *= -1;
    } if (snakeY < 4 * box){
        up.play();
        box_y *= -1;
    } if (snakeY > 16 * box){
        down.play();
        box_y *= -1;
    }
    
    // if the snake eats the food
    if (Eat_Food(food, snake)) {
        score -= 10;
        eat.play();
        food = {
            x: Math.floor(Math.random() * 17 + 1) * box,
            y: Math.floor(Math.random() * 15 + 3) * box
        }
        snake.pop();
    }
    snake.pop();
    snake.unshift(newHead);

    ctx.fillStyle = "white";
    ctx.font = "45px Changa one";
    ctx.fillText(score, 2 * box, 1.6 * box);
}

for (let i = 0; i <9; i++)
    firsttime()

// call draw function every 100 ms

let game = setInterval(draw, 100);
