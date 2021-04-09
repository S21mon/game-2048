import CONFIG from './config.js';
import Table from './table.js';

export default class Game {
    static instance;

    constructor() {
        if (Game.instance) {
            return Game.instance;
        }
        Game.instance = this;
    }

    get isActive() {
        return this._isActive;
    }

    set isActive(state) {
        this._isActive = state;
    }

    startNewGame() {
        const table = new Table();
        table.refreshTable();
        const modal = CONFIG.MODAL;
        modal.classList.remove(CONFIG.MODAL_ACTIVE_CLASS);
        document.body.classList.remove(CONFIG.OVERLAY_CLASS);

        const tableButton = CONFIG.TABLE_BUTTON;
        tableButton.classList.remove(CONFIG.VISIBILITY_HIDDEN_CLASS);
    }

    finishGame() {
        const modal = CONFIG.MODAL;
        modal.classList.add(CONFIG.MODAL_ACTIVE_CLASS);
        document.body.classList.add(CONFIG.OVERLAY_CLASS);

        const tableButton = CONFIG.TABLE_BUTTON;
        tableButton.classList.add(CONFIG.VISIBILITY_HIDDEN_CLASS);
    }
}