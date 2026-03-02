let canvas;
let world;
let keyboard = new Keyboard();

// const startScreen = document.getElementById('start-screen');
// const startButton = document.getElementById('start-btn');
// startButton.addEventListener('click', () =>{
//     startScreen.style.display ='none';
//     startGame();
// });



function init(){
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    
    console.log('My Character is', world.character);  
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