class Cloud extends MovableObject {

  y = 20;
  width = 500;
  height = 250;

  CLOUD_IMAGES = [
    "img/5_background/layers/4_clouds/1.png",
    "img/5_background/layers/4_clouds/2.png"
  ];

  constructor() {

    let cloudImages = [
      "img/5_background/layers/4_clouds/1.png",
      "img/5_background/layers/4_clouds/2.png"
    ];

    let randomIndex = Math.floor(Math.random() * cloudImages.length);

    super().loadImage(cloudImages[randomIndex]);

    this.x = Math.random() * 500 * 3;

    this.animate();
  }

  animate(){
    this.speed = 0.15;

    setInterval(() => {
      this.moveLeft();
    }, 1000 / 60);
  }
}
