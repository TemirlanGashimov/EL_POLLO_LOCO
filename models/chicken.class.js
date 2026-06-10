/**
 * Represents a standard walking chicken enemy.
 * @extends MovableObject
 */
class Chicken extends MovableObject {
  y = 355; // platzierung auf y Achse // sobald die höche sich änder muss man auch die y Achse ändern damit die auf eine ebene sind +-
  height = 70; // höche von unsere chicken wie hoch/groß die sind
  width = 85; //Breite von unseren chicken
  isDeadChicken = false;

  offset = {
    top: 5,
    left: 5,
    right: 5,
    bottom: 5,
  };

  IMAGES_WALKING = [
    "img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];

  IMAGES_DEAD = ["img/3_enemies_chicken/chicken_normal/2_dead/dead.png"];

  chickenDead_sound = new Audio("sounds/chicken/chickenDead.mp3");

  constructor() {
    super().loadImage("img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
    this.loadImages(this.IMAGES_WALKING);

    this.loadImages(this.IMAGES_DEAD);
    this.chickenDead_sound.volume = 0.5;

    this.x = 200 + Math.random() * 2300; //Zahl zwischen 200 und 700
    this.speed = 0.15 + Math.random() * 0.25; // jeder Hünnchen bekommt verschiedene geschwindidkeit
    this.animate();
  }

  die() {
    if (this.isDeadChicken) return;

    this.isDeadChicken = true;
    this.speed = 0;

    if (soundEnabled) {
      this.chickenDead_sound.currentTime = 0;
      this.chickenDead_sound.play();
    }
  }

  animate() {
    this.handleMovement();
    this.handleAnimation();
  }

  handleMovement() {
    setInterval(() => {
      if (!this.world || !this.world.gameRunning || this.world.gameOver) return;

      if (!this.isDeadChicken) {
        this.moveLeft();
      }
    }, 1000 / 60);
  }

  handleAnimation() {
    setInterval(() => {
      if (!this.world || !this.world.gameRunning || this.world.gameOver) return;

      if (this.isDeadChicken) {
        this.playAnimation(this.IMAGES_DEAD);
      } else {
        this.playAnimation(this.IMAGES_WALKING);
      }
    }, 200);
  }
}
