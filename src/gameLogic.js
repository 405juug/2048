import { Game } from './classes/game.js'

function render(list){
    const gameTiles = document.querySelector(".gameTiles")
    const defaultTile = `<div class="tile tile-position-${item.x}-${item.y}">${item.value}`

    gameTiles.innerHTML += defaultTile
}

export default function start(){
    
}