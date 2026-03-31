class ThrowableObject extends MovableObject {
  isBroken = false;
  throwInterval;

  IMAGES_BOTTLE = [
    "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
  ];

  SPLASH_IMAGES = [
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
  ];

  bottleBreak_sound = new Audio("sounds/throwable/bottleBreak.mp3");

  constructor(x, y, otherDirection) {
    super();
    this.loadImage("img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png");
    this.loadImages(this.IMAGES_BOTTLE);
    this.loadImages(this.SPLASH_IMAGES);
    this.x = x;
    this.y = y;
    this.height = 70;
    this.width = 70;
    this.otherDirection = otherDirection;
    this.throw();
    this.animate();
  }

  animate() {
  setInterval(() => {

    if (!this.world?.gameRunning && !this.world?.gameOver) return;

    if (!this.isBroken) {
      this.playAnimation(this.IMAGES_BOTTLE);
    }

  }, 80);
}

  throw() {
    this.speedY = 25;
    this.applyGravity();
    this.handleThrowMovement();
  }

  handleThrowMovement() {
  this.throwInterval = setInterval(() => {

    if (this.isBroken) return;

    // 🔥 DAS HINZUFÜGEN
    if (!this.world?.gameRunning && !this.world?.gameOver) return;

    this.moveBottle();
    this.checkGroundHit();

  }, 16);
}

  moveBottle() {
    this.x += this.otherDirection ? -8 : 8;
  }

  checkGroundHit() {
    if (this.y >= 360) {
      this.break();
    }
  }

  break() {
    if (this.isBroken) return;

    this.isBroken = true;
    this.stopThrow();
    this.playBreakSound();
    this.startSplashAnimation();
  }

  stopThrow() {
    clearInterval(this.throwInterval);
    this.speedY = 0;
    this.speedX = 0;
  }

  playBreakSound() {
    if (soundEnabled) {
      this.bottleBreak_sound.currentTime = 0;
      this.bottleBreak_sound.play().catch(() => {});
    }
  }

  startSplashAnimation() {
    let i = 0;

    let splashInterval = setInterval(() => {
      this.img = this.imageCache[this.SPLASH_IMAGES[i]];
      i++;

      if (i >= this.SPLASH_IMAGES.length) {
        clearInterval(splashInterval);
        this.removeBottle();
      }
    }, 60);
  }

  removeBottle() {
    setTimeout(() => {
      this.markedForDeletion = true;
    }, 200);
  }

  splash() {
    this.speedX = 0;
    this.speedY = 0;

    this.playAnimation(this.SPLASH_IMAGES);

    setTimeout(() => {
      this.isBroken = true;
    }, 150);
  }
}
