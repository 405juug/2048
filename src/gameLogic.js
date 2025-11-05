    import Game from './classes/game.js'
    import Tile from './classes/tile.js'

    const game = new Game()
    let tileList = []


    function render(list, styleList){
    const gameTiles = document.querySelector(".gameTiles")

        document.querySelector("#currentScoreValue").textContent = game.score;
        document.querySelector("#maxScoreValue").textContent = game.bestScore;

        if(tileList.length == 0) gameTiles.innerHTML = ""

        for(let y = 0; y < list.length; y++){
            for(let x = 0; x < list.length; x++){
                const item = list[y][x];
                if(!item) continue

                const foundedItem = tileList.find((tileListItem) => tileListItem.id == item.id)
                
                if(!foundedItem){
                    const defaultTile = document.createElement("div")
                    defaultTile.classList.add("tile", `tile-${item.value}`, "tile-new")
                    defaultTile.innerHTML = item.value
                    defaultTile.setAttribute("style", styleList[`${x}-${y}`])
                    tileList.push({
                        dom: defaultTile,
                        id: item.id
                    })
                    gameTiles.appendChild(defaultTile)
                    if (item.isMerged) {
                          setTimeout(() => defaultTile.classList.remove("tile-merged"), 300);
                    }
                    setTimeout(() => {
                        requestAnimationFrame(() => defaultTile.classList.remove("tile-new"))
                    }, 250)
                }
                else{
                    foundedItem.dom.className = `tile tile-${item.value}`;
                    foundedItem.dom.setAttribute("style", styleList[`${item.x}-${item.y}`])
                    requestAnimationFrame(() => {
                        foundedItem.dom.setAttribute("style", styleList[`${x}-${y}`]);
                    })

                    if(item.merged){
                        foundedItem.dom.classList.add("tile-merged");
                        setTimeout(() => {
                            requestAnimationFrame(() => foundedItem.dom.classList.remove("tile-merged"))
                        }, 250);
                        item.merged = false;
                    }
                }
            }
        }

    const listToDelete = tileList.filter(
        (tile) => list.flat().every((l) => l?.id !== tile.id)
    );

    listToDelete.forEach((tile) => {
        gameTiles.removeChild(tile.dom);
    });

    tileList = tileList.filter((tile) =>
        list.flat().find((l) => l?.id === tile.id)
    );



        // console.log(listToDelete);
        

        console.log(list, tileList)


        list.flat().forEach(tile => {
            if(tile) tile.merged = false
        })

    


    }



    




    export default function start(){
        const newGameBtn = document.querySelector(".newGameBtn")
        
        newGameBtn.addEventListener("click", () => {
            game.newGame();
            tileList = [];
            render(game.tiles, game.styleTable)
            document.querySelector("#currentScoreValue").textContent = game.score;
            document.querySelector("#maxScoreValue").textContent = game.bestScore;
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

export {render}