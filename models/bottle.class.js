/**
 * Represents a bottle object in the game.
 * Extends the MovableObject class.
 * @extends MovableObject
 */
class Bottle extends MovableObject {

  /** @type {number} Height of the bottle */
  height = 80;

  /** @type {number} Vertical position of the bottle */
  y = 350;

  /**
   * Collision offset values for more accurate hit detection.
   * @type {{top: number, left: number, right: number, bottom: number}}
   */
  offset = {
    top: 15,
    left: 45,
    right: 20,
    bottom: 10,
  };

  /**
   * Array of image paths representing the bottle.
   * @type {string[]}
   */
  IMAGES_BOTTLE = [
    "img/6_salsa_bottle/1_salsa_bottle_on_ground.png",
  ];

  /**
   * Creates a new Bottle instance.
   * Initializes position and loads images.
   */
  constructor() {
    super().loadImage("img/6_salsa_bottle/1_salsa_bottle_on_ground.png");
    this.loadImages(this.IMAGES_BOTTLE);

    this.x = 200 + Math.random() * 600 * 3;
  }
}