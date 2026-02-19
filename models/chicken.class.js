class Chicken extends MovableObject{

  y = 370;      // platzierung auf y Achse // sobald die höche sich änder muss man auch die y Achse ändern damit die auf eine ebene sind +-
  height = 50; // höche von unsere chicken wie hoch/groß die sind 
  width = 85; //Breite von unseren chicken 

  IMAGES_WALKING = [
    'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
    'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
    'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'

  ];
 
    constructor(){
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
    
    this.x = 200 + Math.random() * 500; //Zahl zwischen 200 und 700 
    this.speed = 0.15 + Math.random() * 0.25; // jeder Hünnchen bekommt verschiedene geschwindidkeit 
    this.animate();
    }

    animate() {
        this.moveLeft();

        setInterval(() => {
        let i = this.currentImage % this.IMAGES_WALKING.length; // let i = 0 % 6; => 0, Rest 0
        // i = 0, 1, 2, 3, 4, 5, 6, 0
        let path = this.IMAGES_WALKING[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }, 200);
}
  
}