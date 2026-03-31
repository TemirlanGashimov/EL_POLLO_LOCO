class DrawableObject {
  img;
  imageCache = {};
  currentImage = 0;

  x = 120;
  y = 280;
  height = 150; // höhe von objecten wie Charakter Chicken
  width = 100; // breite von objecten wie Character und Chicken

  offset = {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  };

  //loadImage('img/test.png);
  loadImage(path) {
    this.img = new Image(); //this.img = document.getElementById('image') <img id="image" src>
    this.img.src = path;
  }

  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  drawFrame(ctx) {}

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
}
