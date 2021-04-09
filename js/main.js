import Table from './table.js';
import Game from './game.js';
import EventsHandler from './eventsHandler.js';
import Storage from './storage.js';
import CONFIG from './config.js';

const game = new Game();
const table = new Table();

const recordDegree = Storage.getData(CONFIG.STORAGE_KEY_RECORD_DEGREE);
if (recordDegree) {
    CONFIG.RECORD_DEGREE.dataset.record = recordDegree;
    CONFIG.RECORD_DEGREE.textContent = recordDegree;
}

document.addEventListener('click', EventsHandler.handleClickEvent);
window.addEventListener('load', EventsHandler.handleLoadEvent);
document.addEventListener('keydown', EventsHandler.handleKeyEvent);
window.addEventListener('beforeunload', EventsHandler.handleBeforeUnload);
