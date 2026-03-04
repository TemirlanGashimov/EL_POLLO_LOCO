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

  constructor(x, y) {
    super().loadImage(
      "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    );
    this.loadImages(this.IMAGES_BOTTLE);
    this.x = x;
    this.y = y;
    this.height = 70;
    this.width = 70;
    this.throw();
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.playAnimation(this.IMAGES_BOTTLE);
    }, 80);
  }

  throw() {
    this.speedY = 30;
    this.applyGravity();
    this.throwInterval = setInterval(() => {
      //das hier nur die bewegund von flasche
      if (!this.isBroken) {
        this.x += 8; // kleinere schritte am fliegen

        if (this.y >= 140) {
          this.y = 140;
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

    this.bottleBreak_sound.currentTime = 0;
    this.bottleBreak_sound.play();
  }
}
