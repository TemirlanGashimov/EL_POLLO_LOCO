let canvas;
let world;
let keyboard = new Keyboard();
let gameRunning = true;

function init(){
    canvas = document.getElementById('canvas');

    document.getElementById("start-btn").addEventListener("click", startGame);
}

function startGame(){
    document.getElementById("start-screen").style.display = "none";
    document.getElementById("canvas").style.display = "block";

    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
}

function showGameOver(){
    document.getElementById("canvas").style.display = "none";
    document.getElementById("game-over-screen").style.display = "block";
}

function showVictory(){
    document.getElementById("canvas").style.display = "none";
    document.getElementById("victory-screen").style.display = "block";
}

function restartGame(){
    document.getElementById("victory-screen").style.display = "none";
    document.getElementById("game-over-screen").style.display = "none";
    document.getElementById("canvas").style.display = "block";

    world = new World(canvas,keyboard);
}

window.addEventListener("keydown", (e) => {
    
    if(e.keyCode == 39){
        keyboard.RIGHT = true;
    }

    if(e.keyCode == 37) {
        keyboard.LEFT = true;
    }

    if(e.keyCode == 38) {
        keyboard.UP = true;
    }

    if(e.keyCode == 40) {
        keyboard.DOWN = true;
    }

    if(e.keyCode == 32) {
        keyboard.SPACE = true;
    }

    if(e.keyCode == 68) {
        keyboard.D = true;
    }
    if(e.keyCode == 70) { // F
    keyboard.F = true;
}
    
});

window.addEventListener("keyup", (e) => {
    if(e.keyCode == 39){
        keyboard.RIGHT = false;
    }

    if(e.keyCode == 37) {
        keyboard.LEFT = false;
    }

    if(e.keyCode == 38) {
        keyboard.UP = false;
    }

    if(e.keyCode == 40) {
        keyboard.DOWN = false;
    }

    if(e.keyCode == 32) {
        keyboard.SPACE = false;
    }
    if(e.keyCode == 68) {
        keyboard.D = false;
    }
    if(e.keyCode == 70) {
    keyboard.F = false;
}
    
});