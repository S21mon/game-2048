import Table from './table.js';
import Game from './game.js';
import CONFIG from './config.js';
import EventsHandler from './eventsHandler.js';

const startGameButton = document.querySelector('[data-functionality="start-game"]');
const game = new Game();
const table = new Table(CONFIG.ROWS_TABLE_QTY, CONFIG.COLUMNS_TABLE_QTY);

EventsHandler.addHandler(startGameButton, 'click', game.startGame);
EventsHandler.addHandler(window, 'load', table.initTable.bind(table));