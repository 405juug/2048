import Game from './classes/game.js'


function render(list, styleList){
  const gameTiles = document.querySelector(".gameTiles")
 

  for (let item of list){
    const defaultTile = document.createElement("div")
    defaultTile.classList.add("tile")
    defaultTile.innerHTML = item.value
    defaultTile.setAttribute("style", styleList[`${item.x}-${item.y}`])
  
    gameTiles.appendChild(defaultTile)

  }
}




export default function start(){
    const game = new Game()

    document.addEventListener("keydown", (e) => {
        if(e.code == "ArrowLeft"){
            game.moveLeft()
        }
    })
    
    document.addEventListener("keydown", (e) => {
        if(e.code == "ArrowRight"){
            game.moveRight()
        }
    })

    document.addEventListener("keydown", (e) => {
        if(e.code == "ArrowUp"){
            game.moveUp()
        }
    })

    document.addEventListener("keydown", (e) => {
        if(e.code == "ArrowDown"){
            game.moveDown()
        }
    })

    game.newGame()
    render(game.tiles, game.styleTable)
    // game.moveDown()
    // console.log(game.styleTable);
    


} 