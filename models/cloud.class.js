class Cloud extends MovableObject {
  y = 20;
  width = 500;
  height = 250;

  CLOUD_IMAGES = [
    "img/5_background/layers/4_clouds/1.png",
    "img/5_background/layers/4_clouds/2.png",
  ];

  constructor() {
    super(); // 🔥 MUSS als erstes kommen

    let randomIndex = Math.floor(Math.random() * this.CLOUD_IMAGES.length);
    this.loadImage(this.CLOUD_IMAGES[randomIndex]);

    this.x = Math.random() * 1500;
    this.animate();
  }

  animate() {
    this.speed = 0.15;
    this.handleMovement();
  }

  handleMovement() {
    setInterval(() => {
      if (!this.world?.gameRunning || this.world.gameOver) return;
      this.moveLeft();
    }, 1000 / 60);
  }
}
