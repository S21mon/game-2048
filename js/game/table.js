import CONFIG from '../config/config.js';
import Numbers from './numbers.js';
import ElementsRender from './elementsRender.js';
import Game from './game.js';
import Storage from '../storage/storage.js';
import Json from '../storage/json.js';

export default class Table {
    static instance;

    constructor() {
        if (Table.instance) {
            return Table.instance;
        }
        Table.instance = this;
        this.cellsValues = new Map();
        this.rowsQty = CONFIG.ROWS_TABLE_QTY;
        this.columnsQty = CONFIG.COLUMNS_TABLE_QTY;
    }

    get cellsValues() {
        return this._cellsValues;
    }

    set cellsValues(value) {
        this._cellsValues = value;
    }

    get table() {
        return this._table;
    }

    set table(value) {
        this._table = value;
    }

    get rowsQty() {
        return this._rowsQty;
    }

    set rowsQty(value) {
        this._rowsQty = value;
    }

    get columnsQty() {
        return this._columnsQty;
    }

    set columnsQty(value) {
        this._columnsQty = value;
    }

    get cells() {
        return this._cells;
    }

    set cells(value) {
        this._cells = value;
    }

    initTable() {
        this.table = this._createTable();
        this.cells = this.table.querySelectorAll('td');

        const savedValues = Storage.getData(CONFIG.STORAGE_KEY_CELLS_VALUES);
        if (savedValues) {
            this._setCellsValuesFromStorage(savedValues);
        } else {
            const startedValues = Numbers.generateNumbersForCell(this.cellsValues);
            this._setValueInCells(startedValues);
        }

        ElementsRender.displayTableNumbers(this.cells, this.cellsValues);
        const game = new Game();
        game.isActive = true;
    }

    _setCellsValuesFromStorage(savedValues) {
        savedValues = Json.convertFromJson(savedValues);
        Array.from(savedValues).forEach(value => {
            const cellIndex = value['cellIndex'];
            const cellValue = value['cellValue'];
            this.cellsValues.set(cellIndex, cellValue);
        })
    }

    _createTable() {
        const table = document.createElement('table');
        const tableBody = document.createElement('tbody');

        table.classList.add(...CONFIG.GAME_TABLE_CLASSES);
        tableBody.classList.add(...CONFIG.GAME_TABLE_BODY_CLASSES);

        for (let i = 0; i < this.rowsQty; i++) {
            const row = document.createElement('tr');
            row.classList.add(...CONFIG.GAME_TABLE_ROW_CLASSES);

            for (let i = 0; i < this.columnsQty; i++) {
                const cell = document.createElement('td');
                cell.classList.add(...CONFIG.GAME_TABLE_CELL_CLASSES);
                row.append(cell)
                tableBody.append(row);
            }
        }

        table.append(tableBody);
        document.querySelector('.section-game').prepend(table);

        return table;
    }

    _setValueInCells(numbers) {
        numbers.forEach(number => {
            let index;
            do {
                index = Numbers.generateRandomNumber(0, this.cells.length - 1);
            }
            while (this.cellsValues.has(index))
            this.cellsValues.set(index, number);
        })
    }

    moveCellsInUp() {
        let isChangedTable = false;
        const sortedCellsIndices = Numbers.sort(Array.from(this.cellsValues.keys()));

        for (let index of sortedCellsIndices) {
            const numberRow = Math.floor(index / this.rowsQty);
            const border = index - numberRow * this.rowsQty;
            for (let currentIndex = index; currentIndex > border; currentIndex = currentIndex - 4) {
                let newIndex = currentIndex - 4;
                isChangedTable = this._moveCell(newIndex, currentIndex, isChangedTable);
            }
        }

        this._checkForCellMovement(isChangedTable);
        ElementsRender.displayTableNumbers(this.cells, this.cellsValues);
    }

    moveCellsInDown() {
        let isChangedTable = false;
        const sortedCellsIndices = Numbers.sort(Array.from(this.cellsValues.keys()), CONFIG.DESCENDING_SORT);

        for (let index of sortedCellsIndices) {
            const numberRow = Math.floor(index / this.rowsQty);
            for (let currentIndex = index; currentIndex < index + (this.rowsQty - numberRow - 1) * this.rowsQty; currentIndex = currentIndex + 4) {
                let newIndex = currentIndex + 4;
                isChangedTable = this._moveCell(newIndex, currentIndex, isChangedTable);
            }
        }

        this._checkForCellMovement(isChangedTable);
        ElementsRender.displayTableNumbers(this.cells, this.cellsValues);
    }

    moveCellsInRight() {
        let isChangedTable = false;
        const sortedCellsIndices = Numbers.sort(Array.from(this.cellsValues.keys()), CONFIG.DESCENDING_SORT);

        for (let index of sortedCellsIndices) {
            const numberRow = Math.floor(index / this.rowsQty);
            const border = numberRow * this.rowsQty;
            for (let currentIndex = index; currentIndex < border + this.columnsQty - 1; currentIndex++) {
                let newIndex = currentIndex + 1;
                isChangedTable = this._moveCell(newIndex, currentIndex, isChangedTable);
            }
        }

        this._checkForCellMovement(isChangedTable);
        ElementsRender.displayTableNumbers(this.cells, this.cellsValues);
    }

    moveCellsInLeft() {
        let isChangedTable = false;
        const sortedCellsIndices = Numbers.sort(Array.from(this.cellsValues.keys()));

        for (let index of sortedCellsIndices) {
            const numberRow = Math.floor(index / this.rowsQty);
            const border = numberRow * this.rowsQty;
            for (let currentIndex = index; currentIndex > border; currentIndex--) {
                let newIndex = currentIndex - 1;
                isChangedTable = this._moveCell(newIndex, currentIndex, isChangedTable);
            }
        }

        this._checkForCellMovement(isChangedTable);
        ElementsRender.displayTableNumbers(this.cells, this.cellsValues);
    }

    _checkForCellMovement(isChangedTable) {
        const game = new Game();
        if (!isChangedTable) {
            return;
        }

        if (game.checkForWin(this.cellsValues.values())) {
            game.isWonGame = true;
            this._prohibitCellFilling();
        }

        this._fillNewCell();

        if (!game.checkForLoss(this.cellsValues) && this._checkFullnessOfAllCells()) {
            game.isWonGame = false;
            this._prohibitCellFilling();
        }
    }

    _fillNewCell() {
        const newValue = Numbers.generateNumbersForCell(this.cellsValues);
        this._setValueInCells(newValue);
    }

    _prohibitCellFilling() {
        const game = new Game();
        game.setRecord(this.cellsValues.values());
        game.finishGame();
    }

    _moveCell(newCellIndex, currentCellIndex, isChangedTable) {
        if (this.cellsValues.has(newCellIndex)) {
            const movableCellValue = this.cellsValues.get(currentCellIndex);
            const newCellPlaceValue = this.cellsValues.get(newCellIndex);
            if (movableCellValue === newCellPlaceValue) {
                isChangedTable = true;
                this.cellsValues.delete(currentCellIndex);
                this.cellsValues.set(newCellIndex, movableCellValue + newCellPlaceValue);
            }
        } else if (this.cells[newCellIndex]) {
            isChangedTable = true;
            const movableCellValue = this.cellsValues.get(currentCellIndex);
            this.cellsValues.delete(currentCellIndex);
            this.cellsValues.set(newCellIndex, movableCellValue);
        }

        return isChangedTable;
    }

    refreshTable() {
        this._clearTable();

        const startedValues = Numbers.generateNumbersForCell(this.cellsValues);
        this._setValueInCells(startedValues);
        ElementsRender.displayTableNumbers(this.cells, this.cellsValues);
    }

    _clearTable() {
        Array.from(this.cells).map((cell, index) => {
            cell.textContent = '';
            if (this.cellsValues.has(index)) {
                this.cellsValues.delete(index);
            }
        })
    }

    _checkFullnessOfAllCells() {
        return this.cellsValues.size === this.rowsQty * this.columnsQty;
    }
};