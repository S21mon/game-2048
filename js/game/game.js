import CONFIG from '../config/config.js';
import Table from './table.js';
import ElementsRender from './elementsRender.js';
import Numbers from './numbers.js';
import Storage from '../storage/storage.js';
import EventsHandler from './eventsHandler.js';

export default class Game {
    static instance;

    constructor() {
        if (Game.instance) {
            return Game.instance;
        }
        Game.instance = this;
        this.isWonGame = null;
    }

    get isWonGame() {
        return this._isWonGame;
    }

    set isWonGame(state) {
        this._isWonGame = state;
    }

    startNewGame() {
        const table = new Table();
        table.refreshTable();

        ElementsRender.displayElement(CONFIG.TABLE_BUTTON);
        ElementsRender.hideModal();
        EventsHandler.addHandler(document, 'keydown', EventsHandler.handleKeyEvent);
    }

    finishGame() {
        const gameMessaged = this.isWonGame ? CONFIG.GAME_WON_MESSAGE : CONFIG.GAME_LOSE_MESSAGE;

        EventsHandler.removeHandler(document, 'keydown', EventsHandler.handleKeyEvent);
        ElementsRender.displayModal(gameMessaged);
        ElementsRender.hideElement(CONFIG.TABLE_BUTTON);
    }

    checkForLoss(values) {
        const sortedIndices = Numbers.sort(Array.from(values.keys()));
        const matchingValues = sortedIndices.filter((item, index, array) => {
            const nextCellValueOfRow = !Numbers.checkMultiplicity(index + 1, CONFIG.ROWS_TABLE_QTY) ?
                values.get(array[index + 1]) : 0;
            const nextCellValueOfColumn = values.get(array[index + 4]);
            const prevCellValueOfRow = !Numbers.checkMultiplicity(index, CONFIG.ROWS_TABLE_QTY) ?
                values.get(array[index - 1]) : 0;
            const prevCellValueOfColumn = values.get(array[index - 4]);
            const currentCellValue = values.get(item);

            if (nextCellValueOfRow === currentCellValue || nextCellValueOfColumn === currentCellValue ||
                prevCellValueOfRow === currentCellValue || prevCellValueOfColumn === currentCellValue) {
                return item;
            }
        });
        return matchingValues.length;
    }

    checkForWin(values) {
        return Array.from(values).find(item => item === CONFIG.WINNING_NUMBER)
    }

    setRecord(values) {
        const recordValue = Numbers.getMaxValue(Array.from(values));
        const recordDegree = Numbers.getNumberDegree(recordValue, CONFIG.STARTED_VALUE);

        if (Storage.getData(CONFIG.STORAGE_KEY_RECORD_DEGREE) < recordDegree) {
            Storage.setData(CONFIG.STORAGE_KEY_RECORD_DEGREE, recordDegree);
            CONFIG.RECORD_DEGREE.textContent = recordDegree;
            CONFIG.RECORD_DEGREE.dataset.record = recordDegree;
        }
    }
}