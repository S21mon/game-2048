import CONFIG from '../config/config.js';

export default class ElementsRender {
    static displayTableNumbers(cells, cellsValues) {
        Array.from(cells).map((cell, index) => {
            cell.textContent = '';
            cell.classList.remove(CONFIG.GAME_TABLE_CELL_VALUE_CLASS + cell.dataset.cellValue);
            if (cellsValues.has(index)) {
                const cellValue = cellsValues.get(index);
                cell.textContent = cellValue;
                cell.dataset.cellValue = cellValue;
                cell.classList.add(CONFIG.GAME_TABLE_CELL_VALUE_CLASS + cellValue);
            }
        })
        return cells;
    }

    static displayModal(text) {
        const modal = CONFIG.MODAL;
        modal.classList.add(CONFIG.MODAL_ACTIVE_CLASS);
        modal.firstElementChild.textContent = text;
        document.body.classList.add(CONFIG.OVERLAY_CLASS);
    }

    static hideModal() {
        const modal = CONFIG.MODAL;
        document.body.classList.remove(CONFIG.OVERLAY_CLASS);
        modal.classList.remove(CONFIG.MODAL_ACTIVE_CLASS);
    }

    static displayElement(element) {
        element.classList.remove(CONFIG.VISIBILITY_HIDDEN_CLASS);
    }

    static hideElement(element) {
        element.classList.add(CONFIG.VISIBILITY_HIDDEN_CLASS);
    }
}