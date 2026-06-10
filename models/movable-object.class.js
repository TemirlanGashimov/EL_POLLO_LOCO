/**
 * Represents a movable game object that supports movement, gravity, collisions, and stats.
 * @extends DrawableObject
 */
class MovableObject extends DrawableObject {
  /** @type {number} Horizontal speed of the object */
  speed = 0.5;

  /** @type {boolean} Indicates if the object is facing left */
  otherDirection = false;

  /** @type {number} Vertical speed for gravity calculations */
  speedY = 0;

  /** @type {number} Downward acceleration rate for gravity */
  acceleration = 1.5;

  /** @type {number} Health/Energy level of the object (0-100) */
  energy = 100;

  /** @type {number} Timestamp of the last hit taken */
  lastHit = 0;

  /** @type {number} Percentage/count of collected coins */
  coin = 0;

  /** @type {number} Percentage/count of collected bottles */
  bottle = 0;

  /** @type {number} The ground Y level where the object lands */
  groundY = 140;

  /**
   * Applies continuous gravity to the object if it is above ground or moving upwards.
   * Also snaps characters to the ground when they land.
   */
  applyGravity() {
    setInterval(() => {
      if (!this.world || !this.world.gameRunning || this.world.gameOver) return;

      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      } else {
        if (this instanceof Character) {
          this.y = this.groundY;
          this.speedY = 0;
        }
      }
    }, 1000 / 25);
  }

  /**
   * Checks if the object is currently above ground level.
   * ThrowableObjects are always considered above ground until they hit the target.
   * @returns {boolean} True if the object is in the air.
   */
  isAboveGround() {
    if (this instanceof ThrowableObject) {
      return true;
    } else {
      return this.y < this.groundY;
    }
  }

  /**
   * Checks if this object is colliding with another movable object.
   * @param {MovableObject} mo - The other movable object.
   * @returns {boolean} True if a collision is detected.
   */
  isColliding(mo) {
    return (
      this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
      this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
      this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom &&
      this.y + this.height - this.offset.bottom > mo.y + mo.offset.top
    );
  }

  /**
   * Deals damage to the object if the invincibility window has passed.
   */
  hit() {
    let now = Date.now();

    if (now - this.lastHit > 500) {
      this.energy -= 5;

      if (this.energy < 0) {
        this.energy = 0;
      }

      this.lastHit = now;
    }
  }

  /**
   * Increments the collected coin count up to a maximum of 100.
   */
  collectCoin() {
    this.coin += 10;
    if (this.coin > 100) {
      this.coin = 100;
    }
  }

  /**
   * Increments the collected bottle count up to a maximum of 100.
   */
  collectBottle() {
    this.bottle += 10;
    if (this.bottle > 100) {
      this.bottle = 100;
    }
  }

  /**
   * Checks if the object is currently in a hurt state (within 1 second of last hit).
   * @returns {boolean} True if currently hurt.
   */
  isHurt() {
    let timePassed = new Date().getTime() - this.lastHit;
    timePassed = timePassed / 1000;
    return timePassed < 1;
  }

  /**
   * Checks if the object is dead (energy is 0).
   * @returns {boolean} True if energy is <= 0.
   */
  isDead() {
    return this.energy <= 0;
  }

  /**
   * Cycles through and plays an animation using the provided image array.
   * @param {string[]} images - Array of image paths.
   */
  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  /**
   * Moves the object to the right by its speed value.
   */
  moveRight() {
    this.x += this.speed;
  }

  /**
   * Moves the object to the left by its speed value.
   */
  moveLeft() {
    this.x -= this.speed;
  }

  /**
   * Triggers a vertical jump by setting positive vertical speed.
   */
  jump() {
    this.speedY = 30;
  }
}
