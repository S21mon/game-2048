import EventsHandler from './eventsHandler.js';
import CONFIG from './config.js';
import GeneratorValues from './generatorValues.js';

export default class Table {
    constructor(rowsQty, columnsQty) {
        this.generatorValues = new GeneratorValues();
        this.cellsValues = new Map();
        this.rowsQty = rowsQty;
        this.columnsQty = columnsQty;
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

        this._setValueInCells(this.generatorValues.generateValue(this.cellsValues));
        this._displayNumbers();

        EventsHandler.addHandler(this.table, 'keydown', this._changeTable);
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
                index = this.generatorValues.generateRandomNumber(0, this.cells.length - 1);
            }
            while (this.cellsValues.has(index))
            this.cellsValues.set(index, number);
        })
        this.generatorValues.removeNumbers();
    }

    _sumValues() {

    }

    _displayNumbers() {
        Array.from(this.cells).map((cell, index) => {
            if (this.cellsValues.has(index)) {
                cell.textContent = this.cellsValues.get(index);
            }
        })
    }

    _changeTable(){
        console.log('table is updated');
    }
};