import EventsHandler from './eventsHandler.js';
import CONFIG from './config.js';
import Numbers from './numbers.js';
import TableRender from './tableRender.js';

export default class Table {
    constructor(rowsQty, columnsQty) {
        this.generatorValues = new Numbers();
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

        const startedValues = this.generatorValues.generateNumbersForCell(this.cellsValues);
        this._setValueInCells(startedValues);
        this.cells = TableRender.displayTableNumbers(this.cells, this.cellsValues);
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
        if (this.cellsValues.size === this.rowsQty * this.columnsQty) return;

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

    moveCellsInUp() {
        console.log('ячейки сдвинулись вверх');
        const newValue = this.generatorValues.generateNumbersForCell(this.cellsValues);
        this._setValueInCells(newValue);
        TableRender.displayTableNumbers(this.cells, this.cellsValues);
    }

    moveCellsInDown() {
        console.log('ячейки сдвинулись вниз');
        const newValue = this.generatorValues.generateNumbersForCell(this.cellsValues);
        this._setValueInCells(newValue);
        TableRender.displayTableNumbers(this.cells, this.cellsValues);
    }

    moveCellsInLeft() {
        console.log('ячейки сдвинулись влево');
        /*
        Array.from(this.cellsValues).map(cellValue => {
            for (let i = 0; i < this.rowsQty; i++) {

            }
            /*let rowIndex;
            do {
                rowIndex = cellValue / this.rowsQty;
            }
            while (rowIndex > 1) {

            }
            console.log(cellValue);
        })*/

        /*const newValue = this.generatorValues.generateNumbersForCell(this.cellsValues);
        this._setValueInCells(newValue);
        TableRender.displayTableNumbers(this.cells, this.cellsValues);*/
    }

    moveCellsInRight() {
        console.log('ячейки сдвинулись вправо');
        const newValue = this.generatorValues.generateNumbersForCell(this.cellsValues);
        this._setValueInCells(newValue);
        TableRender.displayTableNumbers(this.cells, this.cellsValues);
    }
};