class DrawableObject {
  img;
  imageCache = {};
  currentImage = 0;
  x = 120;
  y = 280;
  height = 150; // höhe von objecten wie Charakter Chicken
  width = 100; // breite von objecten wie Character und Chicken


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




