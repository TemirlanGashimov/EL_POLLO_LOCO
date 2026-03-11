class World {
  character = new Character();
  level;
  canvas;
  ctx;
  keyboard;
  gameRunning = true;
  camera_x = 0;
  statusBarHealth = new StatusBarHealth();
  statusBarCoin = new StatusBarCoin();
  statusBarBottle = new StatusBarBottle();
  statusBarEndboss = new StatusBarEndboss();
  bossFightStarted = false;
  boss = null;
  throwableObjects = [];
  intervalId;

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.level = createLevel1();
    this.boss = this.level.enemies.find((e) => e instanceof Endboss);
    this.setWorld();
    this.draw();
    this.run();
  }

  setWorld() {
    this.character.world = this;
    this.level.enemies.forEach((enemy) => {
      enemy.world = this;
    });
  }

  run() {
    this.intervalId = setInterval(() => {
      if (!this.gameRunning) return;
      //   this.checkCollisions();
      this.checkThrowObjects();
      this.checkBottleBossCollision();
      this.checkBottleEnemyCollision();
      this.checkBossTrigger();
      this.checkBossDead();

      this.throwableObjects = this.throwableObjects.filter(
        (bottle) => !bottle.markedForDeletion,
      );
    }, 200);
  }

  checkThrowObjects() {
    if (this.keyboard.D && this.character.bottle > 0) {
      let bottle = new ThrowableObject(
        this.character.x + 100,
        this.character.y + 100,
        this.character.otherDirection,
      );
      this.throwableObjects.push(bottle);
      this.character.bottle -= 10;
      this.statusBarBottle.setPercentage(this.character.bottle);
      this.keyboard.D = false;
    }
  }

  checkCollisions() {
    this.level.enemies.forEach((enemy, index) => {
      if (this.character.isColliding(enemy) && !enemy.isDeadChicken) {

    let characterBottom = this.character.y + this.character.height;
    let enemyTop = enemy.y;

    // Spieler fällt von oben
    if (this.character.speedY < 0 && characterBottom - 40 < enemyTop + 30) {

        this.character.speedY = 20;
        enemy.die();

        setTimeout(() => {
            this.level.enemies.splice(index, 1);
        }, 500);

    } else {

        if (!this.character.isHurt()) {

    let damage = 0;

    if (enemy instanceof Endboss) {
        damage = 20;
    } 
    else if (enemy instanceof Chicken) {
        damage = 10;
    } 
    else if (enemy instanceof SmallChicken) {
        damage = 5;
    }

    this.character.energy -= damage;

    if (this.character.energy < 0) {
        this.character.energy = 0;
    }

    this.character.lastHit = new Date().getTime();

    this.statusBarHealth.setPercentage(this.character.energy);
    }
    }
    console.log("Character Y:", this.character.y);
    console.log("Character Bottom:", this.character.y + this.character.height);
    console.log("Enemy Y:", enemy.y);
    console.log("Character speedY:", this.character.speedY);
}
    });

    this.level.coins.forEach((coin, index) => {
      if (this.character.isColliding(coin)) {
        if (this.character.coin < 100) {
          this.character.collectCoin();
          this.level.coins.splice(index, 1);
          this.statusBarCoin.setPercentage(this.character.coin);
        }
      }
    });

    this.level.bottles.forEach((bottle, indexBottels) => {
      if (this.character.isColliding(bottle)) {
        if (this.character.bottle < 100) {
          this.character.collectBottle();
          this.level.bottles.splice(indexBottels, 1);
          this.statusBarBottle.setPercentage(this.character.bottle);
        }
      }
    });
  }

  checkBuyBottle() {
    if (this.keyboard.F) {
      if (this.character.coin >= 20 && this.character.bottle < 100) {
        this.character.coin -= 20;
        this.character.bottle += 10;

        this.statusBarCoin.setPercentage(this.character.coin);
        this.statusBarBottle.setPercentage(this.character.bottle);
      }
      this.keyboard.F = false;
    }
  }

  checkBottleEnemyCollision() {
    this.throwableObjects.forEach((bottle) => {
      this.level.enemies.forEach((enemy, index) => {
        if (
          !(enemy instanceof Endboss) &&
          bottle.isColliding(enemy) &&
          !bottle.isBroken
        ) {
          enemy.die();
          bottle.break();

          setTimeout(() => {
            this.level.enemies.splice(index, 1);
          }, 500);
        }
      });
    });
  }

  checkBossTrigger() {
    if (!this.boss) return;

    if (this.character.x > this.boss.x - 400 && !this.bossFightStarted) {
      this.bossFightStarted = true;

      this.boss.endbossApproach_sound.currentTime = 0;
      if(soundEnabled) {
      this.boss.endbossApproach_sound.play().catch(() => {});
    }}
  }

  checkBottleBossCollision() {
    if (!this.boss) return;

    this.throwableObjects.forEach((bottle) => {
      if (bottle.isColliding(this.boss) && !bottle.isBroken) {
        this.boss.hit();
        bottle.break();

        this.statusBarEndboss.setPercentage(this.boss.energy);
      }
    });
  }

  checkBossDead() {
  if (!this.boss) return;

  if (this.boss.isDead && this.gameRunning) {

    setTimeout(() => {
      this.gameRunning = false;
      clearInterval(this.intervalId);
      document.getElementById("victory-screen").style.display = "flex";
    }, 1500);

  }
}

  // Draw() wird immer wieder aufgerufen
  draw() {
    if (!this.gameRunning) return;

    if (this.character.isDead()) {
      this.gameRunning = false;
      clearInterval(this.intervalId);
      document.getElementById("game-over-screen").style.display = "flex";
      return;
    }

    this.checkCollisions();
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // canvas wird gelöscht

    this.ctx.translate(this.camera_x, 0); // dadurch bewegt sich die kamera nach rechts
    this.addObjectsToMap(this.level.backgroundObjects); // das hintergrund soll als erste dargestellt werden damit die objecte auf der hintergrund zu sehen/befinden sind

    this.ctx.translate(-this.camera_x, 0);
    // ------ Space for fixed objects ------
    this.addToMap(this.statusBarHealth);
    this.addToMap(this.statusBarCoin);
    this.addToMap(this.statusBarBottle);
    if (this.bossFightStarted) {
      this.addToMap(this.statusBarEndboss);
    }

    this.ctx.font = "20px Arial";
    this.ctx.fillStyle = "white";

    this.ctx.fillText(this.character.energy, 230, 45);
    this.ctx.fillText(this.character.coin / 10 + " /10", 230, 85);
    this.ctx.fillText(this.character.bottle / 10 + " / 10", 230, 125);

    this.checkBuyBottle();

    this.ctx.translate(this.camera_x, 0); // Forwards

    this.addToMap(this.character); //unsere caracter
    this.addObjectsToMap(this.level.clouds); // unsere wolken
    this.addObjectsToMap(this.level.enemies); // unsere genger, Chicken
    this.addObjectsToMap(this.level.coins); // unsere coins
    this.addObjectsToMap(this.level.bottles); // unsere flaschen
    this.addObjectsToMap(this.throwableObjects); // unsere flasche

    this.ctx.translate(-this.camera_x, 0); // dadurch unsere kamear bewegt sich nach links

    if (this.gameRunning) {
      requestAnimationFrame(() => {
        this.draw();
      });
    }
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

  flipImage(mo) {
    // wir schauen ob unsere objekt eine andere richtung hat
    this.ctx.save(); // wenn ja speichern wir aktuelle  einstellung unsere context/bilder
    this.ctx.translate(mo.width, 0); // dann verändern wir die methode wie wir die bilder einfügen
    this.ctx.scale(-1, 1); // und drehen alle in y Achse wir spiegeln einmal  alles
    mo.x = mo.x * -1;
  }

  flipImageBack(mo) {
    // wenn unsere context sich verändert habe wie wir in oberen if statement sehen hier mache wir das alles wieder rückganging
    mo.x = mo.x * -1;
    this.ctx.restore();
  }
}
