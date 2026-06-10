class SmallChicken extends MovableObject {
  height = 60;
  width = 60;
  y = 365;
  isDeadChicken = false;

  offset = {
    top: 5,
    left: 6,
    right: 6,
    bottom: 5,
  };

  IMAGES_WALKING = [
    "img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
  ];

  IMAGE_DEAD = [
    "img/3_enemies_chicken/chicken_small/2_dead/dead.png"
];

  chickenDead_sound = new Audio ("sounds/chicken/chickenDead.mp3");

  constructor() {
    super();
    this.loadImage(this.IMAGES_WALKING[0]);
    this.loadImages(this.IMAGES_WALKING);

    this.x = 300 + Math.random() * 2000;
    this.speed = 0.20 + Math.random() * 0.5;

    this.animate();
  }

  animate() {
  this.handleMovement();
  this.handleAnimation();
}

handleMovement() {
  setInterval(() => {
    if (!this.world || !this.world.gameRunning || this.world.gameOver) return;
    if (!this.isDeadChicken) this.moveLeft();
  }, 1000 / 60);
}

handleAnimation() {
  setInterval(() => {
    if (!this.world || !this.world.gameRunning || this.world.gameOver) return;
    if (!this.isDeadChicken) this.playAnimation(this.IMAGES_WALKING);
  }, 200);
}

  die(){
  if(this.isDeadChicken) return;

  this.isDeadChicken = true;
  this.speed = 0;

  this.loadImage(this.IMAGE_DEAD[0]);

  if(soundEnabled){
    this.chickenDead_sound.play();
  }
}
}
