export default class Tile{
    value = 2
    x = 1
    y = 1
    constructor(value, x, y){
        this.value = value
        this.x = x
        this.y = y
    }

    sumValues(tile){
        return new Tile(this.value + tile.value)
    }

}