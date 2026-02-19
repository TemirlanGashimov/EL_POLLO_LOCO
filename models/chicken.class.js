class Chicken extends MovableObject{
  y = 370;      // platzierung auf y Achse // sobald die höche sich änder muss man auch die y Achse ändern damit die auf eine ebene sind +-
  height = 50; // höche von unsere chicken wie hoch/groß die sind 
  width = 85; //Breite von unseren chicken 
 
    constructor(){
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
    
    this.x = 200 + Math.random() * 500; //Zahl zwischen 200 und 700 
    
    }
  
}