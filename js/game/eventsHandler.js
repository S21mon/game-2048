import CONFIG from '../config/config.js';
import Table from './table.js';
import Game from './game.js';
import Json from '../storage/json.js';
import Storage from '../storage/storage.js';

export default class EventsHandler {
    static addHandler(element, eventType, func) {
        element.addEventListener(eventType, func);
    }

    static removeHandler(element, eventType, func) {
        element.removeEventListener(eventType, func);
    }

    static handleKeyEvent(event) {
        const key = event.code;

        if (key === CONFIG.ARROW_UP ||
            key === CONFIG.ARROW_DOWN ||
            key === CONFIG.ARROW_LEFT ||
            key === CONFIG.ARROW_RIGHT) {

            event.preventDefault();
            const table = new Table();

            switch (key) {
                case `${CONFIG.ARROW_UP}`:
                    table.moveCellsInUp();
                    break;

                case `${CONFIG.ARROW_DOWN}`:
                    table.moveCellsInDown();
                    break;

                case `${CONFIG.ARROW_LEFT}`:
                    table.moveCellsInLeft();
                    break;

                case `${CONFIG.ARROW_RIGHT}`:
                    table.moveCellsInRight();
                    break;
            }
        }
    }

    static handleClickEvent(event) {
        if (event.target.closest('[data-functionality="start-game"]')) {
            const game = new Game();
            game.startNewGame();
        }
    }

    static handleLoadEvent(event) {
        const table = new Table();
        table.initTable();
    }

    static handleBeforeUnload(event) {
        const table = new Table();
        const dataInJson = [];
        Array.from(table.cellsValues).forEach(cell => {
            const cellData = {
                'cellIndex': cell[0],
                'cellValue': cell[1],
            };
            dataInJson.push(Json.convertToJson(cellData));
        })
        Storage.setData(CONFIG.STORAGE_KEY_CELLS_VALUES, '[' + dataInJson + ']');
    }
}