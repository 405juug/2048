import Tile from "./tile.js"

export default class Game {
    static generateStyleTable(tileCount, tileSize){
        const table = {}
        for (let y = 0; y <= tileCount; y++){
            for (let x = 0; x <= tileCount; x++){
                let left = `left: ${(x) * tileSize + (x) * 10}px;`
                let top = `top: ${(y) * tileSize + (y) * 10}px;`
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

    moveDown(){
        for(let x = 0; x < this.tileCount; x++){
            for(let y = this.tileCount - 2; y >= 0; y--){
                if(!this.tiles[y][x]) continue

                for(let i = y + 1; i < this.tileCount; i++){
                    if(this.tiles[i][x]){
                        if(i == y + 1) break;
                        this.tiles[i - 1][x] = this.tiles[y][x];
                        this.tiles[y][x] = null;
                        break;
                    }

                    if(!this.tiles[i][x] && i == this.tileCount - 1){
                        this.tiles[i][x] = this.tiles[y][x];
                        this.tiles[y][x] = null;
                        break;
                    }
                }
            }
        }

        for(let x = 0; x < this.tileCount; x++){
            let col = [];
            for(let y = this.tileCount - 1; y >= 0; y--){
                col.push(this.tiles[y][x])
            }

            let merged = this.mergeRow(col).reverse();

            for(let y = 0; y < this.tileCount; y++){
                this.tiles[y][x] = merged[y];
            }
        }

        for(let x = 0; x < this.tileCount; x++){
            for(let y = this.tileCount - 2; y >= 0; y--){
                if(!this.tiles[y][x]) continue

                for(let i = y + 1; i < this.tileCount; i++){
                    if(this.tiles[i][x]){
                        if(i == y + 1) break;
                        this.tiles[i - 1][x] = this.tiles[y][x];
                        this.tiles[y][x] = null;
                        break;
                    }

                    if(!this.tiles[i][x] && i == this.tileCount - 1){
                        this.tiles[i][x] = this.tiles[y][x];
                        this.tiles[y][x] = null;
                        break;
                    }
                }
            }
        }

        this.spawnTile()
    }
    moveUp(){
        for(let x = 0; x < this.tileCount; x++){
            for(let y = 1; y < this.tileCount; y++){
                if(!this.tiles[y][x]) continue

                for(let i = y - 1; i >= 0; i--){
                    if(this.tiles[i][x]){
                        if(i == y - 1) break;
                        this.tiles[i + 1][x] = this.tiles[y][x];
                        this.tiles[y][x] = null;
                        break;
                    }

                    if(!this.tiles[i][x] && i == 0){
                        this.tiles[i][x] = this.tiles[y][x];
                        this.tiles[y][x] = null;
                        break;
                    }
                }
            }
        }

        for(let x = 0; x < this.tileCount; x++){
            let col = [];
            for(let y = 0; y < this.tileCount; y++){
                col.push(this.tiles[y][x])
            }

            let merged = this.mergeRow(col);

            for(let y = 0; y < this.tileCount; y++){
                this.tiles[y][x] = merged[y]
            }
        }


        for(let x = 0; x < this.tileCount; x++){
            for(let y = 1; y < this.tileCount; y++){
                if(!this.tiles[y][x]) continue

                for(let i = y - 1; i >= 0; i--){
                    if(this.tiles[i][x]){
                        if(i == y - 1) break;
                        this.tiles[i + 1][x] = this.tiles[y][x];
                        this.tiles[y][x] = null;
                        break;
                    }

                    if(!this.tiles[i][x] && i == 0){
                        this.tiles[i][x] = this.tiles[y][x];
                        this.tiles[y][x] = null;
                        break;
                    }
                }
            }
        }

        this.spawnTile();
    }
    moveRight(){
            for(let y = 0; y < this.tiles.length; y++){
                for(let x = this.tiles[y].length - 2; x >= 0; x--){
                    if(!this.tiles[y][x]) continue
                    for(let i = x + 1; i < this.tiles[y].length; i++){
                        if(this.tiles[y][i]){
                            if(i == x + 1) break
                            this.tiles[y][i - 1] = this.tiles[y][x];
                            this.tiles[y][x] = null;
                    }
                    if(!this.tiles[y][i] && i == this.tiles[y].length - 1){
                        this.tiles[y][i] = this.tiles[y][x];
                        this.tiles[y][x] = null;
                    }
                    } 
                }
            } 
            
            for(let y = 0; y < this.tileCount; y++){
                let row = [...this.tiles[y]].reverse();
                let merged = this.mergeRow(row).reverse();
                this.tiles[y] = merged;
            }

            for(let y = 0; y < this.tiles.length; y++){
                for(let x = this.tiles[y].length - 2; x >= 0; x--){
                    if(!this.tiles[y][x]) continue
                    for(let i = x + 1; i < this.tiles[y].length; i++){
                        if(this.tiles[y][i]){
                            if(i == x + 1) break
                            this.tiles[y][i - 1] = this.tiles[y][x];
                            this.tiles[y][x] = null;
                    }
                    if(!this.tiles[y][i] && i == this.tiles[y].length - 1){
                        this.tiles[y][i] = this.tiles[y][x];
                        this.tiles[y][x] = null;
                    }
                    } 
                }
            } 

            this.spawnTile()
    }
    moveLeft(){
        for(let y = 0; y < this.tiles.length; y++){
            for(let x = 1; x < this.tiles[y].length; x++){
                if(!this.tiles[y][x]) continue
                for(let i = x - 1; i >= 0; i--){
                    if(this.tiles[y][i]){
                        if(i == x - 1) break
                        this.tiles[y][i + 1] = this.tiles[y][x];
                        this.tiles[y][x] = null;
                    }
                    if(!this.tiles[y][i] && i == 0){
                        this.tiles[y][i] = this.tiles[y][x];
                        this.tiles[y][x] = null;
                    }
                } 
            }
        }

        for(let y = 0; y < this.tileCount; y++){
            let row = this.tiles[y];
            this.tiles[y] = this.mergeRow(row);
        }

        for(let y = 0; y < this.tiles.length; y++){
            for(let x = 1; x < this.tiles[y].length; x++){
                if(!this.tiles[y][x]) continue;

                for(let i = x - 1; i >= 0; i--){
                    if(this.tiles[y][i]){
                        if(i == x - 1) break;
                        this.tiles[y][i + 1] = this.tiles[y][x];
                        this.tiles[y][x] = null;
                        break;
                    }
                    if(!this.tiles[y][i] && i == 0){
                        this.tiles[y][i] = this.tiles[y][x];
                        this.tiles[y][x] = null;
                        break;
                    }
                }
            }
        }

        this.spawnTile();
    }

    mergeRow(row){
        let filtered = row.filter(v => v !== null);

        let merged = [];
        for (let i = 0; i < filtered.length; i++){
            if(filtered[i + 1] && filtered[i].value === filtered[i + 1].value){
                let newTile = new Tile(filtered[i].value * 2);
                merged.push(newTile);
                this.score += newTile.value;
                i++;
            } else {
                merged.push(filtered[i]);
            }
        }

        while(merged.length < this.tileCount){
            merged.push(null)
        }

        return merged;
    }
}