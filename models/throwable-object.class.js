class ThrowableObject extends MovableObject {
  IMAGES_BOTTLE = [
    "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
  ];

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
    setInterval(() => {
      //das hier nur die bewegund von flasche
      this.x += 8; // kleinere schritte am fliegen
    }, 16);
  }
}
