class MovableObject {
  x = 120;
  y = 280;
  img;
  height = 150; // höhe von objecten wie Charakter Chicken
  width = 100;  // breite von objecten wie Character und Chicken
  imageCache = {};
  currentImage = 0;
  speed = 0.15;
  otherDirection = false;

//loadImage('img/test.png);
  loadImage(path){
    this.img = new Image(); //this.img = document.getElementById('image') <img id="image" src>
    this.img.src = path;
  }

  //**
//    * @param {Array} arr - ['img/image1.png', 'img/image2.png', ...] 
//  

  loadImages(arr){
    arr.forEach((path) => {
        let img = new Image();
        img.src = path;
        this.imageCache[path] = img;
    });
  }

  moveRight() {
    console.log("Moving right");
  }

   moveLeft(){
        setInterval(() =>{
            this.x -= this.speed; //bewegen sich nach links, 60 mal pro sekunde wird 0.15pixel von x coordinate von wolke abgezogen
        }, 1000 / 60); // 60 mal pro sekunde 
    }
}
