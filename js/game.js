/**
 * @file game.js
 * @description Global entry point and control logic for the El Pollo Loco game.
 */

/** @type {HTMLCanvasElement} The main game canvas */
let canvas;

/** @type {World} The active game world instance */
let world;

/** @type {Keyboard} Keyboard handler instance */
let keyboard = new Keyboard();

/** @type {boolean} Indicates if the game loop is running */
let gameRunning = true;

/** @type {boolean} Indicates if the game is currently paused */
let paused = false;

/** @type {boolean} Legacy sound state indicator */
let soundOn = true;

/** @type {boolean} Indicates if sound effects and music are enabled */
let soundEnabled = true;

/**
 * Initializes the game layout, preloads settings, and binds basic UI event listeners.
 */
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
    pauseBtn.innerText = soundEnabled ? "Sound: AN" : "Sound: AUS";
  }

  if (mobileBtn) {
    mobileBtn.innerText = soundEnabled ? "🔊" : "🔇";
  }
}

/**
 * Toggles the fullscreen mode of the game wrapper.
 */
function toggleFullscreen() {
  let game = document.getElementById("game-wrapper");
  if (!document.fullscreenElement) {
    game.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
}

/**
 * Detects if the current device has touch capabilities.
 * @returns {boolean} True if the device supports touch interaction.
 */
function isTouchDevice() {
  return (
    window.matchMedia("(pointer: coarse)").matches ||
    navigator.maxTouchPoints > 0
  );
}

/**
 * Toggles the display state of mobile touch controls based on device capabilities.
 */
function showMobileControls() {
  const controls = document.getElementById("mobile-controls");

  if (!controls) return;

  controls.style.display = isTouchDevice() ? "flex" : "none";
}

/**
 * Hides the start screen, displays the canvas and controls, and instantiates the game world.
 */
function startGame() {
  document.getElementById("start-screen").style.display = "none";
  document.getElementById("canvas").style.display = "block";

  document.getElementById("pause-btn").style.display = "block";
  document.getElementById("fullscreen-btn").style.display = "block";
  document.getElementById("sound-toggle-btn").style.display = "block";

  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);

  setupMobileControls();
  showMobileControls();

  if (soundEnabled) {
    let startSound = new Audio("sounds/game/gameStart.mp3");
    startSound.volume = 0.3;
    startSound.currentTime = 0;
    startSound.play();
  }
}

/**
 * Hides the canvas and displays the game over screen.
 */
function showGameOver() {
  document.getElementById("canvas").style.display = "none";
  document.getElementById("game-over-screen").style.display = "block";
}

/**
 * Hides the canvas and displays the victory screen.
 */
function showVictory() {
  document.getElementById("canvas").style.display = "none";
  document.getElementById("victory-screen").style.display = "block";
}

/**
 * Reloads the browser page to completely restart the game and clear intervals.
 */
function restartGame() {
  location.reload();
}

/**
 * Closes the pause screen, resumes the game loop, and resumes the boss sound if active.
 */
function resumeGame() {
  document.getElementById("pause-screen").style.display = "none";

  world.gameRunning = true;
  world.draw();

  if (soundEnabled && world.bossFightStarted && world.boss && !world.boss.isDead) {
    world.boss.endbossApproach_sound.play().catch(() => {});
  }

  paused = false;
}

/**
 * Pauses or resumes the game, updating UI displays and pausing character/boss audio.
 */
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

    if (world && world.boss && world.boss.endbossApproach_sound) {
      world.boss.endbossApproach_sound.pause();
    }

    paused = true;
  } else {
    resumeGame();
  }
}

/**
 * Opens the Impressum overlay window and pauses the game running state.
 */
function openImpressum() {
  document.getElementById("impressum-window").style.display = "flex";

  if (world) {
    world.gameRunning = false;
  }
}

/**
 * Closes the Impressum overlay window.
 */
function closeImpressum() {
  document.getElementById("impressum-window").style.display = "none";
}

/**
 * Opens the settings overlay window.
 */
function openSettings() {
  document.getElementById("settings-window").style.display = "flex";
}

/**
 * Closes the settings overlay window.
 */
function closeSettings() {
  document.getElementById("settings-window").style.display = "none";
}

/**
 * Event listener for keydown events to update the keyboard input states.
 */
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
    keyboard.F = true;
  }
});

/**
 * Event listener for keyup events to reset the keyboard input states.
 */
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

/**
 * Event listener for keydown events to handle Escape key (close settings or toggle pause).
 */
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

/**
 * Sets up touch event listeners on mobile UI buttons to update keyboard state.
 */
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

/**
 * Stops all active loops and sounds for character and endboss.
 */
function stopAllSounds() {
  if (world && world.character) {
    let sounds = [
      world.character.walking_sound,
      world.character.sleeping_sound,
      world.character.jumping_sound,
      world.character.hurts_sound,
      world.character.coinCollect_sound,
      world.character.bottleCollect_sound,
    ];

    sounds.forEach((sound) => {
      sound.pause();
      sound.currentTime = 0;
    });
  }

  if (world && world.boss && world.boss.endbossApproach_sound) {
    world.boss.endbossApproach_sound.pause();
    world.boss.endbossApproach_sound.currentTime = 0;
  }
}

/**
 * Toggles soundEnabled boolean, saves setting to localStorage, and updates UI labels.
 */
function toggleSound() {
  soundEnabled = !soundEnabled;

  localStorage.setItem("sound", soundEnabled);

  let pauseBtn = document.getElementById("sound-btn");
  let mobileBtn = document.getElementById("sound-toggle-btn");

  if (soundEnabled) {
    if (pauseBtn) pauseBtn.innerText = "Sound: AN";
    if (mobileBtn) mobileBtn.innerText = "🔊";
  } else {
    if (pauseBtn) pauseBtn.innerText = "Sound: AUS";
    if (mobileBtn) mobileBtn.innerText = "🔇";

    stopAllSounds();
  }
}

/**
 * Adjusts volume level for all audio elements.
 * @param {number} value - Volume scale factor.
 */
function setGameVolume(value) {
  document.querySelectorAll("audio").forEach((sound) => {
    sound.volume = value * 0.05;
  });
}
