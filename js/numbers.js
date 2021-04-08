import CONFIG from './config.js';

export default class Numbers {
    constructor() {
        this.numbers = [];
    }

    get numbers() {
        return this._numbers;
    }

    set numbers(value) {
        this._numbers = value;
    }

    generateNumbersForCell(cellsValues) {
        return cellsValues.size ? this._generateNewValue() : this._generateStartedValues();
    }

    _generateStartedValues() {
        this.numbers.push(this._getNumberValue());
        this.numbers.push(CONFIG.STARTED_VALUE);
        return this.numbers;
    }

    _generateNewValue() {
        this.numbers.push(this._getNumberValue());
        return this.numbers;
    }

    _getNumberValue() {
        const probability = Math.random();
        return probability <= CONFIG.DROP_PERCENT_4_AT_FIRST ?
            CONFIG.STARTED_VALUE ** CONFIG.STARTED_VALUE : CONFIG.STARTED_VALUE;
    }

    generateRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    removeNumbers() {
        this.numbers.length = 0;
    }
}