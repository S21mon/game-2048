import Table from './table.js';
import Game from './game.js';
import CONFIG from './config.js';

const startGameButton = document.querySelector('[data-functionality="start-game"]');

startGameButton.addEventListener('click', function(event) {
   if (game.isActive) {
      game.finishGame();
   }
   game.startGame();
});

window.addEventListener('load', function(event) {
   table.initTable();
})

const game = new Game();

const table = new Table(CONFIG.ROW_TABLE_QTY, CONFIG.COLUMN_TABLE_QTY, 'FDSFSFD');