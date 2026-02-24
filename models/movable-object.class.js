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
  speedY = 0;
  acceleration = 2.5;
  energy = 100; 

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

  draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  drawFrame(ctx){
    if(this instanceof Character || this instanceof Chicken){ // damit übergeben wird die unten definierte code das der nur die Chicken und Character in Käschen nimmt 
    ctx.beginPath();
    ctx.lineWidth = '5';
    ctx.strokeStyle = 'blue';
    ctx.rect (this.x, this.y, this.width, this.height);
    ctx.stroke()
  }
  }

  //character.isColliding(chicken);
  isColliding(mo){
    return this.x + this.width > mo.x &&
    this.y + this.height > mo.y &&
    this.x < mo.x &&
    this.y < mo.y + mo.height;

  }

  hit(){
    this.energy -= 5;
    if(this.energy < 0) {
        this.energy = 0 ;
    }
  }
  
  isDead() {
    return this.energy == 0;
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
    
  }

  moveLeft() {
    
      this.x -= this.speed; //bewegen sich nach links, 60 mal pro sekunde wird 0.15pixel von x coordinate von wolke abgezogen
            
  }

  jump() {
    this.speedY = 30;
  }
}
