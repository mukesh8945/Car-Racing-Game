const score = document.querySelector('.score');
const startScreen = document.querySelector('.startScreen');
const gameArea = document.querySelector('.gameArea');

let player = { speed: 5, score: 0 };


let keys = { ArrowDown: false, ArrowUp: false, ArrowRight: false, ArrowLeft: false }

//keyDown
function keyDown(e) {
    e.preventDefault();
    keys[e.key] = true;
    // console.log(e.key);
    // console.log(keys);
}
//keyUp
function keyUp(e) {
    e.preventDefault();
    keys[e.key] = false;
    // console.log(e.key);
    // console.log(keys);
}

function isCollision(a, b) {
    aRect = a.getBoundingClientRect();
    bRect = b.getBoundingClientRect();
    return !((aRect.bottom < bRect.top) || (aRect.top > bRect.bottom) || (aRect.right < bRect.left) || (aRect.left > bRect.right))
}


function gamePlay() {
    // console.log("hello ");
    let car = document.querySelector('.car')
    let road = gameArea.getBoundingClientRect()
    player.score++;
    let ps = player.score-1
    score.innerHTML = " SCORE IS : " + ps;
    // console.log(road);
    if (player.start) {
        movelines()
        moveCar(car)
        if (keys.ArrowUp && player.y > road.top + 70) { player.y -= player.speed }
        if (keys.ArrowDown && player.y < road.bottom - 70) { player.y += player.speed }
        if (keys.ArrowLeft && player.x > 0) { player.x -= player.speed }
        if (keys.ArrowRight && player.x < (road.width - 50)) { player.x += player.speed }

        car.style.top = player.y + "px";
        car.style.left = player.x + "px";
        window.requestAnimationFrame(gamePlay)
        // console.log(player.score++);

    }
}
function movelines() {
    let lines = document.querySelectorAll('.lines')
    lines.forEach(function (items) {

        if (items.y >= 750) {
            items.y -= 750
        }
        items.y += player.speed;
        items.style.top = items.y + "px";
    })
}
function moveCar(car) {
    let animeCar = document.querySelectorAll('.animeCar')
    animeCar.forEach(function (items) {
        if (isCollision(car, items)) {
            // console.log("tauched");
            player.start = false;
            startScreen.classList.remove('hide');
            startScreen.innerHTML = " GAME OVER <br/> Your SCORE IS  " + player.score +"<br> Press Here to start "
        }
        if (items.y >= 700) {
            items.y = -300
            items.style.left = Math.floor(Math.random() * 350) + "px"
        }
        items.y += player.speed;
        items.style.top = items.y + "px";
    })
}

function start() {
    // gameArea.classList.remove('hide');
    startScreen.classList.add('hide');
    gameArea.innerHTML = "";
    player.start = true;
    player.score = 0;
    window.requestAnimationFrame(gamePlay)

    for (x = 0; x <= 6; x++) {
        // creating lines..
        let roadline = document.createElement('div');
        roadline.setAttribute('class', 'lines')
        roadline.y = (x * 150)
        roadline.style.top = roadline.y + "px";
        gameArea.appendChild(roadline)
    }
    // creating car
    let car = document.createElement('div');
    car.setAttribute('class', 'car');
    gameArea.appendChild(car)

    player.x = car.offsetLeft;
    player.y = car.offsetTop;

    for (x = 0; x < 3; x++) {
        // creating lines..
        let animeCar = document.createElement('div');
        animeCar.setAttribute('class', 'animeCar')
        animeCar.y = ((x + 1) * 350) * -1;
        animeCar.style.top = animeCar.y + "px";
        animeCar.style.backgroundColor = randomColor();
        animeCar.style.left = Math.floor(Math.random() * 350) + "px"
        gameArea.appendChild(animeCar)
    }
}

function randomColor() {
    function c() {
        let color = Math.floor(Math.random() * 256).toString(16);
        return ("0" + String(color)).substr(-2);
        // console.log(color);
    }
    return "#" + c() + c() + c();
}





document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp)
startScreen.addEventListener('click', start)
