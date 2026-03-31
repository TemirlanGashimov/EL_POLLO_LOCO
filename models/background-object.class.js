/**
 * Represents a background object in the game.
 * Extends the MovableObject class.
 * @extends MovableObject
 */
class BackgroundObject extends MovableObject{

    /** @type {number} Fixed width of the background object */
    width = 720; //feste breite für hintergrund

    /** @type {number} Fixed height of the background object */
    height = 480; // feste höhe für hintergrund

    /**
     * Creates a new BackgroundObject instance.
     * @param {string} imagePath - Path to the background image.
     * @param {number} x - X position of the background object.
     * @param {number} y - Y position (not directly used, since it is calculated).
     */
    constructor(imagePath, x, y){
        super().loadImage(imagePath);
        this.x = x;
        this.y = 480 - this.height;
    }

}