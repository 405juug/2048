import './style.css'
import { Game } from './classes/game.js';

const game = new Game();
game.addRandomTile();
game.addRandomTile();

console.log(game.board)