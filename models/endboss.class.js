class Endboss extends MovableObject {
  height = 400;
  width = 250;
  y = 50;
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
    super().loadImage(this.IMAGES_WALK[0]);
    this.loadImages(this.IMAGES_WALK);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_ATTACK);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
    this.x = 840 * 3;
    this.animate();
  }

  animate() {
    setInterval(() => {
      if (this.isDead) {
        this.playAnimation(this.IMAGES_DEAD);
      } else if (this.isHurt) {
        this.playAnimation(this.IMAGES_HURT);
      } else if (this.isAttacking) {
        this.playAnimation(this.IMAGES_ATTACK);
      } else if (this.isPlayerNear()) {
        this.playAnimation(this.IMAGES_WALK);
      } else {
        this.playAnimation(this.IMAGES_WALKING);
      }
    }, 200);

    setInterval(() => {
      if (
        this.isPlayerVeryNear() &&
        !this.isDead &&
        !this.isAttacking &&
        !this.isHurt
      ) {
        this.attack();
      }

      if (
        this.isPlayerNear() &&
        !this.isDead &&
        !this.isAttacking &&
        !this.isHurt
      ) {
        this.x -= 1;
      }
    }, 1000 / 60);
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
  if (!this.world) return false;
  return Math.abs(this.x - this.world.character.x) < 600;
}

  isPlayerVeryNear() {
  if (!this.world) return false;
  return Math.abs(this.x - this.world.character.x) < 200;
}
}