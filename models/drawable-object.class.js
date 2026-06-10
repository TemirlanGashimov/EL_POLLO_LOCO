/**
 * Represents a basic object that can be drawn on the canvas.
 */
class DrawableObject {
  /** @type {HTMLImageElement} The image element of the object */
  img;

  /** @type {Object<string, HTMLImageElement>} Cache containing preloaded images */
  imageCache = {};

  /** @type {number} Index of the current animation image */
  currentImage = 0;

  /** @type {number} The X coordinate of the object */
  x = 120;

  /** @type {number} The Y coordinate of the object */
  y = 280;

  /** @type {number} Height of the object */
  height = 150;

  /** @type {number} Width of the object */
  width = 100;

  /**
   * Collision offset values for accurate hit detection.
   * @type {{top: number, left: number, right: number, bottom: number}}
   */
  offset = {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  };

  /**
   * Loads a single image from the given path.
   * @param {string} path - The path to the image file.
   */
  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  /**
   * Draws the object on the canvas.
   * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
   */
  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  /**
   * Optional helper to draw debug frames around collision boxes.
   * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
   */
  drawFrame(ctx) {}

  /**
   * Preloads multiple images into the image cache.
   * @param {string[]} arr - Array of image paths.
   */
  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }
}
