import { tile } from './tile.js'

export default class Game{
    constructor(){
        this.tileSize = 100;
        this.tileCount = 4;
        const tiles = [];
        this.score = 0;
        this.board = this.createEmptyBoard();
    }

    newGame() {

    }

    spawnTile(n = 1){
        for(let y = 0; y < this.tileCount; y++){
            for(let x = 0; x < this.tileCount; x++){
                if(!this.board[y][x]) tiles.push({ x, y })
            }
        }

        if(tiles.length === 0) return false;

        const { x, y } = tiles[Math.floor(Math.random() * tiles.length)];
        const value = Math.random() < 0.9 ? 2 : 4;
        this.board[y][x] = new tile(value, x, y);
        return true
    }

    moveDown() {

    }
    moveUp() {
        
    }
    moveRight() {
        
    }
    moveLeft() {
        
    }

    

    createEmptyBoard(){
        return Array.from({ length: this.size }, () => Array(this.size).fill(null))
    }


}