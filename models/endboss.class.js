class Endboss extends MovableObject {
  height = 400;
  width = 250;
  y = 50;
  speed = 1.5;
  energy = 100;
  isDead = false;
  isHurt = false;
  isAttacking = false;
  lastAttack = 0;
  lastHit = 0;

  endbossApproach_sound = new Audio("sounds/endboss/endbossApproach.wav");

  offset = {
    top: 70,
    left: 30,
    right: 30,
    bottom: 25,
  };

  IMAGES_WALK = [
    "img/4_enemie_boss_chicken/1_walk/G1.png",
    "img/4_enemie_boss_chicken/1_walk/G2.png",
    "img/4_enemie_boss_chicken/1_walk/G3.png",
    "img/4_enemie_boss_chicken/1_walk/G4.png",
  ];

  IMAGES_WALKING = [
    "img/4_enemie_boss_chicken/2_alert/G5.png",
    "img/4_enemie_boss_chicken/2_alert/G6.png",
    "img/4_enemie_boss_chicken/2_alert/G7.png",
    "img/4_enemie_boss_chicken/2_alert/G8.png",
    "img/4_enemie_boss_chicken/2_alert/G9.png",
    "img/4_enemie_boss_chicken/2_alert/G10.png",
    "img/4_enemie_boss_chicken/2_alert/G11.png",
    "img/4_enemie_boss_chicken/2_alert/G12.png",
  ];

  IMAGES_ATTACK = [
    "img/4_enemie_boss_chicken/3_attack/G13.png",
    "img/4_enemie_boss_chicken/3_attack/G14.png",
    "img/4_enemie_boss_chicken/3_attack/G15.png",
    "img/4_enemie_boss_chicken/3_attack/G16.png",
    "img/4_enemie_boss_chicken/3_attack/G17.png",
    "img/4_enemie_boss_chicken/3_attack/G18.png",
    "img/4_enemie_boss_chicken/3_attack/G19.png",
    "img/4_enemie_boss_chicken/3_attack/G20.png",
  ];

  IMAGES_HURT = [
    "img/4_enemie_boss_chicken/4_hurt/G21.png",
    "img/4_enemie_boss_chicken/4_hurt/G22.png",
    "img/4_enemie_boss_chicken/4_hurt/G23.png",
  ];

  IMAGES_DEAD = [
    "img/4_enemie_boss_chicken/5_dead/G24.png",
    "img/4_enemie_boss_chicken/5_dead/G25.png",
    "img/4_enemie_boss_chicken/5_dead/G26.png",
  ];

  constructor() {
    super();
    this.loadImage(this.IMAGES_WALK[0]);
    this.loadImages(this.IMAGES_WALK);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_ATTACK);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
    this.x = 840 * 3;
    this.animate();
  }

  animate() {
    this.handleAnimation();
    this.handleMovement();
  }

  handleAnimation() {
    this.intervalAnimation = setInterval(() => {
      if (!this.world || !this.world.gameRunning || this.world.gameOver) return;

      if (this.isDead) return this.playAnimation(this.IMAGES_DEAD);
      if (this.isHurt) return this.playAnimation(this.IMAGES_HURT);
      if (this.isAttacking) return this.playAnimation(this.IMAGES_ATTACK);
      if (this.isPlayerNear()) return this.playAnimation(this.IMAGES_WALK);

      this.playAnimation(this.IMAGES_WALKING);
    }, 200);
  }

  handleMovement() {
    this.intervalMovement = setInterval(() => {
      if (!this.world || !this.world.gameRunning || this.world.gameOver) return;

      if (this.canAttack()) this.attack();
      if (this.canMove()) this.x -= this.speed;
    }, 1000 / 60);
  }

  canAttack() {
    return (
      this.isPlayerVeryNear() &&
      !this.isDead &&
      !this.isAttacking &&
      !this.isHurt
    );
  }

  canMove() {
    return (
      this.isPlayerNear() && !this.isDead && !this.isAttacking && !this.isHurt
    );
  }

  hit() {
    let now = new Date().getTime();
    if (now - this.lastHit < 500) return;

    this.lastHit = now;
    if (this.energy > 0) {
      this.energy -= 20;
      this.isHurt = true;

      setTimeout(() => {
        this.isHurt = false;
      }, 400);
    }

    if (this.energy <= 0) {
      this.energy = 0;
      this.isDead = true;

      clearInterval(this.intervalMovement);
    }
  }

  attack() {
    let now = new Date().getTime();

    if (now - this.lastAttack > 1500) {
      this.isAttacking = true;
      this.lastAttack = now;

      setTimeout(() => {
        this.isAttacking = false;
      }, 800);
    }
  }

  isPlayerNear() {
    if (!this.world || !this.world.gameRunning || this.world.gameOver) return false;
    return Math.abs(this.x - this.world.character.x) < 600;
  }

  isPlayerVeryNear() {
    if (!this.world || !this.world.gameRunning || this.world.gameOver) return false;
    return Math.abs(this.x - this.world.character.x) < 200;
  }
}
