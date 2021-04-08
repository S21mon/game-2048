import Table from './table.js';
import Game from './game.js';
import CONFIG from './config.js';
import EventsHandler from './eventsHandler.js';

const startGameButton = document.querySelector('[data-functionality="start-game"]');
const game = new Game(CONFIG.GAME_IS_ACTIVE);
const table = new Table(CONFIG.ROWS_TABLE_QTY, CONFIG.COLUMNS_TABLE_QTY);
const eventsHandler = new EventsHandler();

startGameButton.addEventListener('click', function(event) {
    eventsHandler.handleClickEvent(event, game);
});
window.addEventListener('load', function(event) {
    eventsHandler.handleLoadEvent(event, table)
});
document.addEventListener('keydown', function(event) {
    eventsHandler.handleKeyEvent(event, table)
});