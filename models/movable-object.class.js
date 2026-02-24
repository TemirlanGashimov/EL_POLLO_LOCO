class MovableObject {
  x = 120;
  y = 280;
  img;
  height = 150; // höhe von objecten wie Charakter Chicken
  width = 100; // breite von objecten wie Character und Chicken
  imageCache = {};
  currentImage = 0;
  speed = 0.15;
  otherDirection = false;
  0;
  speedY = 0;
  acceleration = 2.5;

  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 25);
  }

  isAboveGround() {
    return this.y < 140;
  }

  //loadImage('img/test.png);
  loadImage(path) {
    this.img = new Image(); //this.img = document.getElementById('image') <img id="image" src>
    this.img.src = path;
  }

  //**
  //    * @param {Array} arr - ['img/image1.png', 'img/image2.png', ...]
  //
  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  playAnimation(images) {
    let i = this.currentImage % this.IMAGES_WALKING.length; // let i = 0 % 6; => 0, Rest 0
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  moveRight() {
    this.x += this.speed;
    this.otherDirection = false;
  }

  moveLeft() {
    
      this.x -= this.speed; //bewegen sich nach links, 60 mal pro sekunde wird 0.15pixel von x coordinate von wolke abgezogen
            this.otherDirection = true; // wenn ich linke taste drücke bild gespiegelt quasi Charakter dreht sich zurück 
  }

  jump() {
    this.speedY = 30;
  }
}
