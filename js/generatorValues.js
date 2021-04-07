import CONFIG from './config.js';

export default class GeneratorValues {
    constructor() {
        this.numbers = [];
    }

    get numbers() {
        return this._numbers;
    }

    set numbers(value) {
        this._numbers = value;
    }

    generateValue(cellsValues) {
        return !cellsValues ? this.numbers.push(CONFIG.STARTED_VALUE) : this._generateStartedValues();
    }

    _generateStartedValues() {
        const probability = Math.random();
        this.numbers.push(probability <= CONFIG.DROP_PERCENT_4_AT_FIRST ?
            CONFIG.STARTED_VALUE ** CONFIG.STARTED_VALUE : CONFIG.STARTED_VALUE);
        this.numbers.push(CONFIG.STARTED_VALUE);
        return this.numbers;
    }

    generateRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    removeNumbers() {
        this.numbers.length = 0;
    }
}