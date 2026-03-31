class MovableObject extends DrawableObject {
  speed = 0.5;
  otherDirection = false;
  speedY = 0;
  acceleration = 1.5;
  energy = 100;
  lastHit = 0;
  coin = 0;
  bottle = 0;

  applyGravity() {
    setInterval(() => {
      if (!this.world || !this.world.gameRunning || this.world.gameOver) return;

      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 25);
  }

  isAboveGround() {
    if (this instanceof ThrowableObject) {
      //Throwable object should always fall
      return true;
    } else {
      return this.y < 140;
    }
  }

  //character.isColliding(chicken);
  isColliding(mo) {
    return (
      this.x + this.offset.left < mo.x + mo.width - mo.offset.right && // 1️⃣ Linke Seite von Pepe ist links von rechter Seite vom Gegner
      this.x + this.width - this.offset.right > mo.x + mo.offset.left && // 2️⃣ Rechte Seite von Pepe ist rechts von linker Seite vom Gegner
      this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom && // 3️⃣ Obere Seite von Pepe ist oberhalb der unteren Seite vom Gegner
      this.y + this.height - this.offset.bottom > mo.y + mo.offset.top
    ); // 4️⃣ Untere Seite von Pepe ist unterhalb der oberen Seite vom Gegner
  }

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

  collectCoin() {
    this.coin += 10;
    if (this.coin > 100) {
      this.coin = 100;
    }
  }

  collectBottle() {
    this.bottle += 10;
    if (this.bottle > 100) {
      this.bottle = 100;
    }
  }

  isHurt() {
    let timePassed = new Date().getTime() - this.lastHit; // Dfference in ms
    timePassed = timePassed / 1000; //Difference in s
    return timePassed < 1;
  }

  isDead() {
    return this.energy <= 0;
  }

  playAnimation(images) {
    let i = this.currentImage % images.length; // let i = 0 % 6; => 0, Rest 0
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  moveRight() {
    this.x += this.speed;
  }

  moveLeft() {
    this.x -= this.speed; //bewegen sich nach links, 60 mal pro sekunde wird 0.15pixel von x coordinate von wolke abgezogen
  }

  jump() {
    this.speedY = 30;
  }
}
