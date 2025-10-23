import Tile from "./tile.js"
import { render } from "../gameLogic.js";

export default class Game {
    static generateStyleTable(tileCount, tileSize){
        const gap = 10;
        const table = {}
        for (let y = 0; y <= tileCount; y++){
            for (let x = 0; x <= tileCount; x++){
                let left = `left: ${x * (tileSize + gap)}px;`
                let top = `top: ${y * (tileSize + gap)}px;`
                table[`${x}-${y}`] = `${left} ${top}`
            }

        }
        return  table
    }

    constructor(){
        this.tileSize = 100
        this.tileCount = 4

        this.score = 0
        this.tiles = [
            [null, null, null, null],
            [null, null, null, null],
            [null, null, null, null],
            [null, null, null, null]
        ]

        this.styleTable = Game.generateStyleTable(this.tileCount, this.tileSize)
    }

    getTiles(){
        return this.tiles
    }
    newGame(){
        this.score = 0;
        this.tiles = [
            [null, null, null, null],
            [null, null, null, null],
            [null, null, null, null],
            [null, null, null, null]
        ]
        this.spawnTile();
        this.spawnTile();
    }

    findEmptyCoords(){
        let emptyCoords = [];
        for(let y = 0; y < this.tiles.length; y++){
            for(let x = 0; x < this.tiles[y].length; x++){
                if (!this.tiles[y][x]) emptyCoords.push(`${x}-${y}`);
            }
        }

        return emptyCoords

        // let c = []
        // for (let item of emptyCoords){
        //     let find = false
        //     for(let tile of this.tiles){
        //         if ( item === `${tile.x}-${tile.y}`) {
        //             find = true
        //             break
        //         }
        //     }

        //     if (!find) c.push(item)
        // }



    }

    isCollide(tile){

    }
    
    spawnTile(x, y, v = Math.floor(Math.random() * 2 + 1) * 2){
        if(!x || !y){
            const emptyCoords = this.findEmptyCoords()
            let randomCoords = emptyCoords[Math.floor(Math.random() * emptyCoords.length)]
            const [newX, newY] = randomCoords.split("-");
            x = newX;
            y = newY;
        }

        this.tiles[y][x] = new Tile(v, +x, +y)        
    }

    moveUp() {
        let moved = false;

        for (let x = 0; x < this.tileCount; x++) {
            let mergedY = -1;

            for (let y = 1; y < this.tileCount; y++) {
                if (!this.tiles[y][x]) continue;

                let currentTile = this.tiles[y][x];
                let targetY = y;

                while (targetY > 0 && !this.tiles[targetY - 1][x]) {
                    targetY--;
                }

                if (
                    targetY > 0 &&
                    this.tiles[targetY - 1][x] &&
                    this.tiles[targetY - 1][x].value === currentTile.value &&
                    mergedY !== targetY - 1
                ) {
                    this.tiles[targetY - 1][x] = new Tile(
                        currentTile.value * 2,
                        x,
                        targetY - 1
                    );
                    this.tiles[y][x] = null;
                    mergedY = targetY - 1;
                    moved = true;
                } else {
                    if (targetY !== y) {
                        this.tiles[targetY][x] = currentTile;
                        this.tiles[y][x] = null;
                        moved = true;
                    }
                }
            }
        }

        if (moved) this.spawnTile();

        if (this.isGameOver()) {
            this.showOverlay("lose");
        }
    }

    moveDown() {
        let moved = false;

        for (let x = 0; x < this.tileCount; x++) {
            let mergedY = this.tileCount;

            for (let y = this.tileCount - 2; y >= 0; y--) {
                if (!this.tiles[y][x]) continue;

                let currentTile = this.tiles[y][x];
                let targetY = y;

                while (targetY < this.tileCount - 1 && !this.tiles[targetY + 1][x]) {
                    targetY++;
                }

                if (
                    targetY < this.tileCount - 1 &&
                    this.tiles[targetY + 1][x] &&
                    this.tiles[targetY + 1][x].value === currentTile.value &&
                    mergedY !== targetY + 1
                ) {
                    this.tiles[targetY + 1][x] = new Tile(
                        currentTile.value * 2,
                        x,
                        targetY + 1
                    );
                    this.tiles[y][x] = null;
                    mergedY = targetY + 1;
                    moved = true;
                } else {
                    if (targetY !== y) {
                        this.tiles[targetY][x] = currentTile;
                        this.tiles[y][x] = null;
                        moved = true;
                    }
                }
            }
        }

        if (moved) this.spawnTile();

        if (this.isGameOver()) {
            this.showOverlay("lose");
        }
    }

    moveLeft() {
        let moved = false;

        for (let y = 0; y < this.tileCount; y++) {
            let mergedX = -1;

            for (let x = 1; x < this.tileCount; x++) {
                if (!this.tiles[y][x]) continue;

                let currentTile = this.tiles[y][x];
                let targetX = x;

                while (targetX > 0 && !this.tiles[y][targetX - 1]) {
                    targetX--;
                }

                if (
                    targetX > 0 &&
                    this.tiles[y][targetX - 1] &&
                    this.tiles[y][targetX - 1].value === currentTile.value &&
                    mergedX !== targetX - 1
                ) {
                    this.tiles[y][targetX - 1] = new Tile(
                        currentTile.value * 2,
                        targetX - 1,
                        y
                    );
                    this.tiles[y][x] = null;
                    mergedX = targetX - 1;
                    moved = true;
                } else {
                    if (targetX !== x) {
                        this.tiles[y][targetX] = currentTile;
                        this.tiles[y][x] = null;
                        moved = true;
                    }
                }
            }
        }

        if (moved) this.spawnTile();
        
        if (this.isGameOver()) {
            this.showOverlay("lose");
        }
    }

    moveRight() {
        let moved = false;

        for (let y = 0; y < this.tileCount; y++) {
            let mergedX = this.tileCount;

            for (let x = this.tileCount - 2; x >= 0; x--) {
                if (!this.tiles[y][x]) continue;

                let currentTile = this.tiles[y][x];
                let targetX = x;

                while (targetX < this.tileCount - 1 && !this.tiles[y][targetX + 1]) {
                    targetX++;
                }

                if (
                    targetX < this.tileCount - 1 &&
                    this.tiles[y][targetX + 1] &&
                    this.tiles[y][targetX + 1].value === currentTile.value &&
                    mergedX !== targetX + 1
                ) {
                    this.tiles[y][targetX + 1] = new Tile(
                        currentTile.value * 2,
                        targetX + 1,
                        y
                    );
                    this.tiles[y][x] = null;
                    mergedX = targetX + 1;
                    moved = true;
                } else {
                    if (targetX !== x) {
                        this.tiles[y][targetX] = currentTile;
                        this.tiles[y][x] = null;
                        moved = true;
                    }
                }
            }
        }

        if (moved) this.spawnTile();

        if (this.isGameOver()) {
            this.showOverlay("lose");
        }
    }


    mergeRow(row){
        let filtered = row.filter(v => v !== null);
        let merged = [];

        for (let i = 0; i < filtered.length; i++){
            if(filtered[i + 1] && filtered[i].value === filtered[i + 1].value){
                let newTile = filtered[i].sumValues(filtered[i + 1]);
                newTile.merged = true;
                merged.push(newTile);
                filtered[i] = null;
                filtered[i + 1] = null;
                i++;
            } else if(filtered[i]){
                merged.push(filtered[i]);
            }
        }

        while(merged.length < this.tileCount){
            merged.push(null)
        }

        return merged;
    }

    showOverlay(type) {
        const overlay = document.querySelector(".gameOverlay");
        const img = document.getElementById("overlayImage");
        const newGameBtn = document.getElementById("newGameBtnOverlay");

        gameOverlay.style.display = "flex";

        if (type === "win") {
            img.src = "";
        } else if (type === "lose") {
            img.src = "";
        }

        newGameBtn.onclick = () => {
            overlay.style.display = "none";
            game.newGame();
            render(game.tiles, game.styleTable); 
        };
    }

    isGameOver() {
        for (let y = 0; y < this.tileCount; y++) {
            for (let x = 0; x < this.tileCount; x++) {
            const tile = this.tiles[y][x];
            if (!tile) return false;

            if (
                (x < this.tileCount - 1 && this.tiles[y][x + 1]?.value === tile.value) ||
                (y < this.tileCount - 1 && this.tiles[y + 1][x]?.value === tile.value)
            ) {
                return false;
            }
            }
        }
        return true;
    }
}

const game = new Game()