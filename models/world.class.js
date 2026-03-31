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
  gameOver = false;
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
  }

  setWorld() {
    this.character.world = this;
    this.level.enemies.forEach((enemy) => {
      enemy.world = this;
    });

    this.level.clouds.forEach((cloud) => {
      cloud.world = this;
    });
  }

  checkThrowObjects() {
    if (!this.gameRunning || this.gameOver) return;

    if (this.keyboard.D && this.character.bottle > 0) {
      this.throwBottle();
      this.keyboard.D = false;
    }
  }

  throwBottle() {
    this.character.lastActionTime = Date.now();

    let bottle = new ThrowableObject(
      this.character.x + 100,
      this.character.y + 100,
      this.character.otherDirection,
    );

    bottle.world = this;

    this.throwableObjects.push(bottle);
    this.reduceBottleAmount();
  }

  reduceBottleAmount() {
    this.character.bottle -= 10;
    this.statusBarBottle.setPercentage(this.character.bottle);
  }

  checkCollisions() {
    this.checkEnemyCollisions();
    this.checkCoinCollisions();
    this.checkBottleCollisions();
  }

  checkEnemyCollisions() {
    this.level.enemies.forEach((enemy, index) => {
      if (this.character.isColliding(enemy) && !enemy.isDeadChicken) {
        this.handleEnemyHit(enemy, index);
      }
    });
  }

  handleEnemyHit(enemy, index) {
    let characterBottom = this.character.y + this.character.height;
    let enemyTop = enemy.y;

    if (this.character.speedY < 0 && characterBottom - 40 < enemyTop + 30) {
      this.jumpOnEnemy(enemy, index);
    } else {
      this.damageCharacter(enemy);
    }
  }

  jumpOnEnemy(enemy, index) {
    this.character.speedY = 20;
    enemy.die();

    setTimeout(() => {
      this.level.enemies.splice(index, 1);
    }, 500);
  }

  damageCharacter(enemy) {
    if (this.character.isHurt()) return;

    let damage = this.getEnemyDamage(enemy);
    this.character.energy = Math.max(0, this.character.energy - damage);

    this.character.lastHit = Date.now();
    this.statusBarHealth.setPercentage(this.character.energy);
  }

  getEnemyDamage(enemy) {
    if (enemy instanceof Endboss) return 20;
    if (enemy instanceof Chicken) return 10;
    if (enemy instanceof SmallChicken) return 5;
    return 0;
  }

  checkCoinCollisions() {
    this.level.coins.forEach((coin, index) => {
      if (this.character.isColliding(coin) && this.character.coin < 100) {
        this.character.collectCoin();
        this.level.coins.splice(index, 1);
        this.statusBarCoin.setPercentage(this.character.coin);
      }
    });
  }

  checkBottleCollisions() {
    this.level.bottles.forEach((bottle, index) => {
      if (this.character.isColliding(bottle) && this.character.bottle < 100) {
        this.character.collectBottle();
        this.level.bottles.splice(index, 1);
        this.statusBarBottle.setPercentage(this.character.bottle);
      }
    });
  }

  checkBuyBottle() {
    if (this.keyboard.F) {
      this.buyBottle();
      this.keyboard.F = false;
    }
  }

  buyBottle() {
    if (this.character.coin < 20) return;
    if (this.character.bottle >= 100) return;

    this.character.coin -= 20;
    this.character.bottle += 10;

    this.statusBarCoin.setPercentage(this.character.coin);
    this.statusBarBottle.setPercentage(this.character.bottle);
  }

  checkBottleEnemyCollision() {
    this.throwableObjects.forEach((bottle) => {
      this.level.enemies.forEach((enemy, index) => {
        this.handleBottleEnemyHit(bottle, enemy, index);
      });
    });
  }

  handleBottleEnemyHit(bottle, enemy, index) {
    if (enemy instanceof Endboss) return;
    if (!bottle.isColliding(enemy) || bottle.isBroken) return;

    enemy.die();
    bottle.break();

    setTimeout(() => {
      this.level.enemies.splice(index, 1);
    }, 500);
  }

  checkBossTrigger() {
    if (!this.boss) return;

    if (this.character.x > this.boss.x - 400 && !this.bossFightStarted) {
      this.bossFightStarted = true;

      this.boss.endbossApproach_sound.currentTime = 0;
      if (soundEnabled) {
        this.boss.endbossApproach_sound.play().catch(() => {});
      }
    }
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
        stopAllSounds();

        document.getElementById("victory-screen").style.display = "flex";
      }, 1500);
    }
  }

  draw() {
    if (!this.gameRunning) return;

    this.updateGame();
    this.clearCanvas();

    this.drawWorld();
    this.drawText();
    this.drawUI();

    this.checkGameOver();

    requestAnimationFrame(() => this.draw());
  }

  updateGame() {
    this.checkThrowObjects();
    this.checkBottleBossCollision();
    this.checkBottleEnemyCollision();
    this.checkBossTrigger();
    this.checkBossDead();
    this.checkCollisions();
    this.checkBuyBottle();
  }

 checkGameOver() {
  if (this.character.isDead() && !this.gameOver) {

    this.gameOver = true;

    stopAllSounds();

    this.keyboard.RIGHT = false;
    this.keyboard.LEFT = false;
    this.keyboard.SPACE = false;
    this.keyboard.D = false;
    this.keyboard.F = false;

    // ❗ WICHTIG: Spiel noch NICHT stoppen!

    setTimeout(() => {
      this.gameRunning = false; // 🔥 ERST NACH ANIMATION

      document.getElementById("game-over-screen").style.display = "flex";
    }, 1000); // ⏱ Zeit für Death Animation
  }
}

  drawText() {
    this.ctx.font = "20px Arial";
    this.ctx.fillStyle = "white";

    this.ctx.fillText(this.character.energy, 230, 45);
    this.ctx.fillText(this.character.coin / 10 + " /10", 230, 85);
    this.ctx.fillText(this.character.bottle / 10 + " /10", 230, 125);
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  drawUI() {
    this.addToMap(this.statusBarHealth);
    this.addToMap(this.statusBarCoin);
    this.addToMap(this.statusBarBottle);

    if (this.bossFightStarted) {
      this.addToMap(this.statusBarEndboss);
    }
  }

  drawWorld() {
    this.moveCamera();

    this.drawBackground();
    this.drawGameObjects();

    this.resetCamera();
  }

  drawBackground() {
    this.addObjectsToMap(this.level.backgroundObjects);
    this.addObjectsToMap(this.level.clouds);
  }

  drawGameObjects() {
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.level.coins);
    this.addObjectsToMap(this.level.bottles);
    this.addObjectsToMap(this.throwableObjects);
    this.addToMap(this.character);
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

  moveCamera() {
    this.ctx.translate(this.camera_x, 0);
  }

  resetCamera() {
    this.ctx.translate(-this.camera_x, 0);
  }
}
