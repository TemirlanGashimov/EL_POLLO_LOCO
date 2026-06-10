/**
 * Represents a collectable coin in the game.
 * @extends MovableObject
 */
class Coin extends MovableObject {


  offset = {
    top: 52,
    left: 33,
    right: 33,
    bottom: 52,
  };

  IMAGES_COIN = [
    'img/8_coin/coin_1.png', 
    'img/8_coin/coin_2.png'];

 constructor() {
  super(); // 🔥 wichtig

  this.loadImage('img/8_coin/coin_1.png');
  this.loadImages(this.IMAGES_COIN);

  this.x = 200 + Math.random() * 1800;
  this.animate();
}

 animate() {
  setInterval(() => {
    this.playAnimation(this.IMAGES_COIN);
  }, 200);
}
}
