import Table from './game/table.js';
import Game from './game/game.js';
import EventsHandler from './game/eventsHandler.js';
import Storage from './storage/storage.js';
import CONFIG from './config/config.js';

const game = new Game();
const table = new Table();

const recordDegree = Storage.getData(CONFIG.STORAGE_KEY_RECORD_DEGREE);
if (recordDegree) {
    CONFIG.RECORD_DEGREE.dataset.record = recordDegree;
    CONFIG.RECORD_DEGREE.textContent = recordDegree;
}

EventsHandler.addHandler(document, 'click', EventsHandler.handleClickEvent);
EventsHandler.addHandler(window, 'load', EventsHandler.handleLoadEvent);
EventsHandler.addHandler(document, 'keydown', EventsHandler.handleKeyEvent);
EventsHandler.addHandler(window, 'beforeunload', EventsHandler.handleBeforeUnload);