class BackgroundObject extends MovableObject{

    width = 720; //feste breite für hintergrund
    height = 480; // feste höhe für hintergrund
    constructor(imagePath, x, y){
        super().loadImage(imagePath);
        this.x = x;
        this.y = 480 - this.height;
    }

}