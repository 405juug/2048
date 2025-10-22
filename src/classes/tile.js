
import { v4 as uuidv4 } from 'uuid';


export default class Tile{
    // value = 2
    // x = 1
    // y = 1
    constructor(value, x, y){
        this.id = uuidv4();
        this.value = value
        this.x = x
        this.y = y
        this.isMerged = false;
    }

    sumValues(tile){
        const newTile = new Tile(this.value + tile.value, this.x, this.y)
        newTile.isMerged = true;
        return newTile;

    }

}