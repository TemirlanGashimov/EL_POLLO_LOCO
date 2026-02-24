class World {
  character = new Character();
  level = level1;
  canvas;
  ctx;
  keyboard;
  camera_x = 0;

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.checkCollisions();
  }

  setWorld() {
    this.character.world = this;
  }

  checkCollisions(){
    setInterval(() => {
        this.level.enemies.forEach( (enemy) => {
            if(this.character.isColliding(enemy) ) {
                this.character.hit();
            }
        });
    }, 200);
  }

  // Draw() wird immer wieder aufgerufen
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // canvas wird gelöscht

    this.ctx.translate(this.camera_x, 0); // dadurch bewegt sich die kamera nach rechts

    this.addObjectsToMap(this.level.backgroundObjects); // das hintergrund soll als erste dargestellt werden damit die objecte auf der hintergrund zu sehen/befinden sind

    this.addToMap(this.character); //unsere caracter
    this.addObjectsToMap(this.level.clouds); // unsere wolken
    this.addObjectsToMap(this.level.enemies); // unsere genger, Chicken

    this.ctx.translate(-this.camera_x, 0); // dadurch unsere kamear bewegt sich nach links

    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

  addToMap(mo) {
    if (mo.otherDirection) {
      this.flipImage(mo);
    }
    mo.draw(this.ctx);
    mo.drawFrame(this.ctx);

    if (mo.otherDirection) {
      this.flipImageBack(mo);
    }
}

flipImage(mo){
    // wir schauen ob unsere objekt eine andere richtung hat
      this.ctx.save(); // wenn ja speichern wir aktuelle  einstellung unsere context/bilder
      this.ctx.translate(mo.width, 0); // dann verändern wir die methode wie wir die bilder einfügen
      this.ctx.scale(-1, 1); // und drehen alle in y Achse wir spiegeln einmal  alles
      mo.x = mo.x * -1;
}

flipImageBack(mo){
// wenn unsere context sich verändert habe wie wir in oberen if statement sehen hier mache wir das alles wieder rückganging
      mo.x = mo.x * -1;
      this.ctx.restore();
}
}

