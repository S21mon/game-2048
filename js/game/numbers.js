import CONFIG from '../config/config.js';

export default class Numbers {
    static generateNumbersForCell(cellsValues) {
        return cellsValues.size ? Numbers.generateNewValue() : Numbers.generateStartedValues();
    }

    static generateStartedValues() {
        const numbers = [];
        numbers.push(Numbers.getNumberValue());
        numbers.push(CONFIG.STARTED_VALUE);
        return numbers;
    }

    static generateNewValue() {
        const numbers = [];
        numbers.push(Numbers.getNumberValue());
        return numbers;
    }

    static getNumberValue() {
        const probability = Math.random();
        return probability <= CONFIG.DROP_PERCENT_4_AT_FIRST ?
            CONFIG.STARTED_VALUE ** CONFIG.STARTED_VALUE : CONFIG.STARTED_VALUE;
    }

    static generateRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    static sort(values, method = CONFIG.ASCENDING_SORT) {
        return method === CONFIG.DESCENDING_SORT ?
            values.sort((prev, next) => next - prev) : values.sort((prev, next) => prev - next);
    }

    static getMaxValue(values) {
        return Math.max(...values)
    }

    static getNumberDegree(value, startedValue) {
        let degree = 1;
        while (startedValue !== value) {
            value /= startedValue;
            degree++;
        }
        return degree;
    }

    static checkMultiplicity(dividend, number) {
        return dividend % number === 0;
    }
}