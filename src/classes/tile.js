export default class Tile{
    value = 2;
    x = 0;
    y = 0;

    constructor(value, x, y){
        this.value = value;
        this.x = 0;
        this.y = 0;
        this.merged = false;
    }

    sumValues(tile){
        if(!this.canMergeWith(tile)) return null;
        return new Tile(this.value + tile.value, this.x, this.y)
        this.merged = true;
        tile.merged = true;
    }

    canMergeWith(tile){
        return(
            tile && this.value === this.value && !this.merged && !tile.merged
        )
    }

    setPosition(x, y){
        this.x = x;
        this.y = y;
    }

    resetMerged(){
        this.merged = false;
    }
}