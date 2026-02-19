class MovableObject {
  x = 120;
  y = 280;
  height = 150; // höhe von objecten wie Charakter Chicken
  width = 100;  // breite von objecten wie Character und Chicken
  img;


//loadImage('img/test.png);
  loadImage(path){
    this.img = new Image(); //this.img = document.getElementById('image') <img id="image" src>
    this.img.src = path;
  }

  moveRight() {
    console.log("Moving right");
  }

  moveLeft() {}
}
