class Character extends MovableObject {
  height = 300;
  y = 30;
  speed = 10;
  idleTime = 0;
  coin = 0;
  bottle = 0;

  lastHitSound = 0;
  deadSoundPlayed = false;
  lastActionTime = 0;

  offset = {
    top: 150,
    left: 20,
    right: 30,
    bottom: 15,
  };

  IMAGES_IDLE = [
    "img/2_character_pepe/1_idle/idle/I-1.png",
    "img/2_character_pepe/1_idle/idle/I-2.png",
    "img/2_character_pepe/1_idle/idle/I-3.png",
    "img/2_character_pepe/1_idle/idle/I-4.png",
    "img/2_character_pepe/1_idle/idle/I-5.png",
    "img/2_character_pepe/1_idle/idle/I-6.png",
    "img/2_character_pepe/1_idle/idle/I-7.png",
    "img/2_character_pepe/1_idle/idle/I-8.png",
    "img/2_character_pepe/1_idle/idle/I-9.png",
    "img/2_character_pepe/1_idle/idle/I-10.png",
  ];

  IMAGES_SLEEP = [
    "img/2_character_pepe/1_idle/long_idle/I-11.png",
    "img/2_character_pepe/1_idle/long_idle/I-12.png",
    "img/2_character_pepe/1_idle/long_idle/I-13.png",
    "img/2_character_pepe/1_idle/long_idle/I-14.png",
    "img/2_character_pepe/1_idle/long_idle/I-15.png",
    "img/2_character_pepe/1_idle/long_idle/I-16.png",
    "img/2_character_pepe/1_idle/long_idle/I-17.png",
    "img/2_character_pepe/1_idle/long_idle/I-18.png",
    "img/2_character_pepe/1_idle/long_idle/I-19.png",
    "img/2_character_pepe/1_idle/long_idle/I-20.png",
  ];

  IMAGES_WALKING = [
    "img/2_character_pepe/2_walk/W-21.png",
    "img/2_character_pepe/2_walk/W-22.png",
    "img/2_character_pepe/2_walk/W-23.png",
    "img/2_character_pepe/2_walk/W-24.png",
    "img/2_character_pepe/2_walk/W-25.png",
    "img/2_character_pepe/2_walk/W-26.png",
  ];

  IMAGES_JUMPIMG = [
    "img/2_character_pepe/3_jump/J-31.png",
    "img/2_character_pepe/3_jump/J-32.png",
    "img/2_character_pepe/3_jump/J-33.png",
    "img/2_character_pepe/3_jump/J-34.png",
    "img/2_character_pepe/3_jump/J-35.png",
    "img/2_character_pepe/3_jump/J-36.png",
    "img/2_character_pepe/3_jump/J-37.png",
    "img/2_character_pepe/3_jump/J-38.png",
    "img/2_character_pepe/3_jump/J-39.png",
  ];

  IMAGES_DEAD = [
    "img/2_character_pepe/5_dead/D-51.png",
    "img/2_character_pepe/5_dead/D-52.png",
    "img/2_character_pepe/5_dead/D-53.png",
    "img/2_character_pepe/5_dead/D-54.png",
    "img/2_character_pepe/5_dead/D-55.png",
    "img/2_character_pepe/5_dead/D-56.png",
    "img/2_character_pepe/5_dead/D-57.png",
  ];

  IMAGES_HURT = [
    "img/2_character_pepe/4_hurt/H-41.png",
    "img/2_character_pepe/4_hurt/H-42.png",
    "img/2_character_pepe/4_hurt/H-43.png",
  ];

  world;
  walking_sound = new Audio("sounds/character/characterRun.mp3");
  sleeping_sound = new Audio("sounds/character/characterSnoring.mp3");
  jumping_sound = new Audio("sounds/character/characterJump.wav");
  hurts_sound = new Audio("sounds/character/characterDamage.mp3");
  deads_sound = new Audio("sounds/character/characterDead.wav");
  coinCollect_sound = new Audio("sounds/collectibles/collectSound.wav");
  bottleCollect_sound = new Audio("sounds/collectibles/bottleCollectSound.wav");

  constructor() {
    super().loadImage("img/2_character_pepe/2_walk/W-21.png");

    this.loadImages(this.IMAGES_IDLE);

    this.loadImages(this.IMAGES_SLEEP);
    this.sleeping_sound.volume = 0.03;
    this.sleeping_sound.loop = true;

    this.loadImages(this.IMAGES_WALKING);
    this.walking_sound.volume = 0.03;
    this.walking_sound.loop = true;

    this.loadImages(this.IMAGES_JUMPIMG);
    this.jumping_sound.volume = 0.03;

    this.loadImages(this.IMAGES_DEAD);
    this.deads_sound.volume = 0.03;
    this.deads_sound.loop = false;

    this.loadImages(this.IMAGES_HURT);
    this.hurts_sound.volume = 0.03;

    this.applyGravity();
    this.animate();
  }

  animate() {
    setInterval(() => {
      if (!this.world.gameRunning) return;

      let isMoving = false;

      if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
        this.moveRight(); // hier Charakter schaut nach vorne
        this.otherDirection = false;
        isMoving = true;
      }

      if (this.world.keyboard.LEFT && this.x > 0) {
        this.moveLeft();
        this.otherDirection = true; // wenn ich linke taste drücke bild gespiegelt quasi Charakter dreht sich zurück
        isMoving = true;
      }

      if (isMoving && !this.isAboveGround()) {
        if (soundEnabled && this.walking_sound.paused) {
          this.walking_sound.play();
        }
      } else {
        this.walking_sound.pause();
        this.walking_sound.currentTime = 0;
      }

      if (this.world.keyboard.SPACE && !this.isAboveGround()) {
        this.jump();
        this.lastActionTime = Date.now();

        if (soundEnabled && this.jumping_sound.paused) {
          this.jumping_sound.currentTime = 0;
          this.jumping_sound.play();
        }
      }

      this.world.camera_x = -this.x + 100;
    }, 1000 / 60);

    setInterval(() => {
      if (!this.world.gameRunning) return;

      if (this.isDead()) {
        this.playAnimation(this.IMAGES_DEAD);

        this.sleeping_sound.pause();
        this.walking_sound.pause();

        this.sleeping_sound.currentTime = 0;
        this.walking_sound.currentTime = 0;

        if (soundEnabled && !this.deadSoundPlayed) {
          this.deads_sound.volume = 0.3;
          this.deads_sound.currentTime = 0;
          this.deads_sound.play();

          this.deadSoundPlayed = true;
        }
      } else if (this.isHurt() && !this.isDead()) {
        this.playAnimation(this.IMAGES_HURT);

        // 🔥 STOP SLEEP SOUND SOFORT
        this.sleeping_sound.pause();
        this.sleeping_sound.currentTime = 0;

        let now = Date.now();

        if (soundEnabled && now - this.lastHitSound > 500) {
          this.hurts_sound.currentTime = 0;
          this.hurts_sound.play();
          this.lastHitSound = now;
        }
      } else if (this.isAboveGround()) {
        this.playAnimation(this.IMAGES_JUMPIMG);

        this.idleTime = 0; // 🔥 FIX

        if (!this.sleeping_sound.paused) {
          this.sleeping_sound.pause();
          this.sleeping_sound.currentTime = 0;
        }
      } else if (
        this.world.keyboard.RIGHT ||
        this.world.keyboard.LEFT ||
        this.world.keyboard.D ||
        this.world.keyboard.SPACE ||
        this.world.keyboard.F
      ) {
        //Walk Animation
        this.playAnimation(this.IMAGES_WALKING);
        this.idleTime = 0; // timer auf 0 setzen wieder

        if (!this.sleeping_sound.paused) {
          this.sleeping_sound.pause();
          this.sleeping_sound.currentTime = 0;
        }
      } else {
        let now = Date.now();

        if (now - this.lastActionTime < 4000) {
          this.idleTime = 0;
          this.playAnimation(this.IMAGES_IDLE);

          if (!this.sleeping_sound.paused) {
            this.sleeping_sound.pause();
            this.sleeping_sound.currentTime = 0;
          }
          return;
        }
          this.idleTime += 120;

          if (this.idleTime > 3000) {
            this.playAnimation(this.IMAGES_SLEEP);

            if (soundEnabled && this.sleeping_sound.paused) {
              this.sleeping_sound.play();
            }
          } else {
            this.playAnimation(this.IMAGES_IDLE);

            if (!this.sleeping_sound.paused) {
              this.sleeping_sound.pause();
              this.sleeping_sound.currentTime = 0;
            }
        }
      }
    }, 120);
  }

  jump() {
    this.speedY = 20;
  }

  collectCoin() {
  this.coin += 10;

  if (soundEnabled) {
    this.coinCollect_sound.volume = 0.3; // 🔊 Lautstärke
    this.coinCollect_sound.currentTime = 0;
    this.coinCollect_sound.play();
  }
}

collectBottle() {
  if (this.bottle < 100) {
    this.bottle += 10;

    if (soundEnabled) {
      this.bottleCollect_sound.volume = 0.3; // 🔊 Lautstärke
      this.bottleCollect_sound.currentTime = 0;
      this.bottleCollect_sound.play();
    }
  }
}

  hit() {
    super.hit();

    this.idleTime = 0;
    this.lastActionTime = Date.now(); // 🔥 NEU

    this.sleeping_sound.pause();
    this.sleeping_sound.currentTime = 0;

    let now = Date.now();

    if (now - this.lastHitSound > 500) {
      if (soundEnabled) {
        this.hurts_sound.currentTime = 0;
        this.hurts_sound.play();
      }
      this.lastHitSound = now;
    }
  }
}
