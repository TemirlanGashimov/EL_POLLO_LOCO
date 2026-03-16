let canvas;
let world;
let keyboard = new Keyboard();
let gameRunning = true;
let paused = false;
let soundOn = true;
let soundEnabled = true;

function init() {
  canvas = document.getElementById("canvas");
  document.getElementById("start-btn").addEventListener("click", startGame);

  let savedSound = localStorage.getItem("sound");

  if (savedSound !== null) {
    soundEnabled = savedSound === "true";
  }

  let pauseBtn = document.getElementById("sound-btn");
  let mobileBtn = document.getElementById("sound-toggle-btn");

  if (pauseBtn) {
    pauseBtn.innerText = soundEnabled ? "Sound: ON" : "Sound: OFF";
  }

  if (mobileBtn) {
    mobileBtn.innerText = soundEnabled ? "🔊" : "🔇";
  }
}

function toggleFullscreen() {
  let game = document.getElementById("game-wrapper");
  if (!document.fullscreenElement) {
    game.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
}

function startGame() {
  document.getElementById("start-screen").style.display = "none";
  document.getElementById("canvas").style.display = "block";

  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);

  setupMobileControls();
}

function showGameOver() {
  document.getElementById("canvas").style.display = "none";
  document.getElementById("game-over-screen").style.display = "block";
}

function showVictory() {
  document.getElementById("canvas").style.display = "none";
  document.getElementById("victory-screen").style.display = "block";
}

function restartGame() {
  document.getElementById("victory-screen").style.display = "none";
  document.getElementById("game-over-screen").style.display = "none";
  document.getElementById("pause-screen").style.display = "none";
  document.getElementById("canvas").style.display = "block";

  paused = false;

  world = new World(canvas, keyboard);
  world.gameRunning = true;
}

function resumeGame() {
  document.getElementById("pause-screen").style.display = "none";

  world.gameRunning = true;
  world.draw();

  paused = false;
}

function togglePause() {
  if (!paused) {
    document.getElementById("pause-screen").style.display = "flex";

    world.gameRunning = false;

    if (world && world.character) {
      world.character.walking_sound.pause();
      world.character.sleeping_sound.pause();
      world.character.jumping_sound.pause();
      world.character.hurts_sound.pause();
    }

    paused = true;
  } else {
    resumeGame();
  }
}

function openSettings() {
  document.getElementById("settings-window").style.display = "flex";
}

function closeSettings() {
  document.getElementById("settings-window").style.display = "none";
}

window.addEventListener("keydown", (e) => {
  if (e.keyCode == 39) {
    keyboard.RIGHT = true;
  }

  if (e.keyCode == 37) {
    keyboard.LEFT = true;
  }

  if (e.keyCode == 38) {
    keyboard.UP = true;
  }

  if (e.keyCode == 40) {
    keyboard.DOWN = true;
  }

  if (e.keyCode == 32) {
    keyboard.SPACE = true;
  }

  if (e.keyCode == 68) {
    keyboard.D = true;
  }
  if (e.keyCode == 70) {
    // F
    keyboard.F = true;
  }
});

window.addEventListener("keyup", (e) => {
  if (e.keyCode == 39) {
    keyboard.RIGHT = false;
  }

  if (e.keyCode == 37) {
    keyboard.LEFT = false;
  }

  if (e.keyCode == 38) {
    keyboard.UP = false;
  }

  if (e.keyCode == 40) {
    keyboard.DOWN = false;
  }

  if (e.keyCode == 32) {
    keyboard.SPACE = false;
  }
  if (e.keyCode == 68) {
    keyboard.D = false;
  }
  if (e.keyCode == 70) {
    keyboard.F = false;
  }
});

window.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    let settings = document.getElementById("settings-window");

    if (settings.style.display === "flex") {
      closeSettings();
      return;
    }

    if (world) {
      togglePause();
    }
  }
});

function setupMobileControls() {
  document.getElementById("btn-left").addEventListener("touchstart", () => {
    keyboard.LEFT = true;
  });

  document.getElementById("btn-left").addEventListener("touchend", () => {
    keyboard.LEFT = false;
  });

  document.getElementById("btn-right").addEventListener("touchstart", () => {
    keyboard.RIGHT = true;
  });

  document.getElementById("btn-right").addEventListener("touchend", () => {
    keyboard.RIGHT = false;
  });

  document.getElementById("btn-jump").addEventListener("touchstart", () => {
    keyboard.SPACE = true;
  });

  document.getElementById("btn-jump").addEventListener("touchend", () => {
    keyboard.SPACE = false;
  });

  document.getElementById("btn-throw").addEventListener("touchstart", () => {
    keyboard.D = true;
  });

  document.getElementById("btn-throw").addEventListener("touchend", () => {
    keyboard.D = false;
  });

  document.getElementById("btn-buy").addEventListener("touchstart", () => {
    keyboard.F = true;
  });

  document.getElementById("btn-buy").addEventListener("touchend", () => {
    keyboard.F = false;
  });
}

function stopAllSounds() {
  if (world && world.character) {
    let sounds = [
      world.character.walking_sound,
      world.character.sleeping_sound,
      world.character.jumping_sound,
      world.character.hurts_sound,
      world.character.deads_sound,
      world.character.coinCollect_sound,
      world.character.bottleCollect_sound,
    ];

    sounds.forEach((sound) => {
      sound.pause();
      sound.currentTime = 0;
    });
  }
}

function toggleSound() {
  soundEnabled = !soundEnabled;

  localStorage.setItem("sound", soundEnabled);

  let pauseBtn = document.getElementById("sound-btn");
  let mobileBtn = document.getElementById("sound-toggle-btn");

  if (soundEnabled) {

    if (pauseBtn) pauseBtn.innerText = "Sound: ON";
    if (mobileBtn) mobileBtn.innerText = "🔊";

  } else {

    if (pauseBtn) pauseBtn.innerText = "Sound: OFF";
    if (mobileBtn) mobileBtn.innerText = "🔇";

    stopAllSounds();
  }
}

function setGameVolume(value) {
  document.querySelectorAll("audio").forEach((sound) => {
    sound.volume = value * 0.05;
  });
}
