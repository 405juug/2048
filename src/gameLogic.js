    import Game from './classes/game.js'
    import Tile from './classes/tile.js'

    const game = new Game()
    let tileList = []


    function render(list, styleList){
    const gameTiles = document.querySelector(".gameTiles")
        if(tileList.length == 0) gameTiles.innerHTML = ""

        for(let y = 0; y < list.length; y++){
            for(let x = 0; x < list.length; x++){
                const item = list[y][x];
                if(!item) continue

                const foundedItem = tileList.find((tileListItem) => tileListItem.id == item.id)
                
                if(!foundedItem){
                    const defaultTile = document.createElement("div")
                    defaultTile.classList.add("tile", `tile-${item.value}`)
                    defaultTile.innerHTML = item.value
                    defaultTile.setAttribute("style", styleList[`${x}-${y}`])
                    tileList.push({
                        dom: defaultTile,
                        id: item.id
                    })
                    gameTiles.appendChild(defaultTile)
                }
                else{
                    foundedItem.dom.className = `tile tile-${item.value}`;
                    foundedItem.dom.setAttribute("style", styleList[`${x}-${y}`])
                }

                

            }
        }

        let listToDelete = tileList.filter((tile) => {

            let x = list.flat().every((listItem => {
                // if (listItem?.id == tile.id) console.log("del", listItem,  tile, listItem?.id == tile.id);
            
                return listItem?.id !== tile.id 
            }))
            // console.log(x, tile);
            return x
            
        }) 
            // console.log(listToDelete);
            
        listToDelete.forEach(tile => {
                gameTiles.removeChild(tile.dom)
            }
        )

        tileList = tileList.filter((tile) => list.flat().find((listItem => listItem?.id == tile.id )))



        // console.log(listToDelete);
        

        console.log(list, tileList)
    }



    




    export default function start(){
        const newGameBtn = document.querySelector(".newGameBtn")
        
        newGameBtn.addEventListener("click", () => {
            game.newGame();
            tileList = [];
            render(game.tiles, game.styleTable)
        })

        document.addEventListener("keydown", (e) => {
            if(e.code == "ArrowLeft"){
                game.moveLeft()
                render(game.tiles, game.styleTable)
            };

            if(e.code == "ArrowRight"){
                game.moveRight()
                render(game.tiles, game.styleTable)
            };

            if(e.code == "ArrowUp"){
                game.moveUp()
                render(game.tiles, game.styleTable)
            };

            if(e.code == "ArrowDown"){
                game.moveDown()
                render(game.tiles, game.styleTable)
            }
        })

        game.newGame();
        render(game.tiles, game.styleTable);
} 