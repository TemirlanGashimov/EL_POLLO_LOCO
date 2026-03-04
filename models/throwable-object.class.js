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
    super().loadImage(
      "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    );
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
      if (!this.isBroken) {
        this.playAnimation(this.IMAGES_BOTTLE);
      }
    }, 80);
  }

  throw() {
    this.speedY = 25;
    this.applyGravity();
    this.throwInterval = setInterval(() => {
      //das hier nur die bewegund von flasche
      if (!this.isBroken) {
        this.x += this.otherDirection ? -8 : 8;

        if (this.y >= 360) {
          this.break();
        }
      }
    }, 16);
  }

  break() {
    if (this.isBroken) return;

    this.isBroken = true;

    clearInterval(this.throwInterval);

    this.speedY = 0;
    this.speedX = 0;

    this.bottleBreak_sound.currentTime = 0;
    this.bottleBreak_sound.play().catch(() => {});

    let i = 0;

    let splashInterval = setInterval(() => {
      this.img = this.imageCache[this.SPLASH_IMAGES[i]];
      i++;

      if (i >= this.SPLASH_IMAGES.length) {
        clearInterval(splashInterval);

        //  HIER entfernen wir die Flasche aus der World
        setTimeout(() => {
          this.markedForDeletion = true;
        }, 200);
      }
    }, 60);
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
