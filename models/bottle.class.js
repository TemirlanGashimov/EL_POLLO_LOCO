class Bottle extends MovableObject {
  height = 80;
  y = 350;

  offset = {
    top: 15,
    left: 45,
    right: 20,
    bottom: 10,
  };

  IMAGES_BOTTLE = [
    "img/6_salsa_bottle/1_salsa_bottle_on_ground.png",
  ];

  constructor() {
    super().loadImage("img/6_salsa_bottle/1_salsa_bottle_on_ground.png");
    this.loadImages(this.IMAGES_BOTTLE);

    this.x = 200 + Math.random() * 600 * 3;
  }
}
