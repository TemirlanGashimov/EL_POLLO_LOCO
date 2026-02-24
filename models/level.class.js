class Level {
    enemies;
    clouds;
    backgroundObjects;
    level_end_x = 740*3;

    constructor(enemies,clouds,backgroundObjects){
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
    }
}