import EventsHandler from './eventsHandler.js';
import CONFIG from './config.js';

export default class Game {
    constructor(gameState) {
        this.isActive = gameState;
    }

    get isActive() {
        return this._isActive;
    }

    set isActive(state) {
        this._isActive = state;
    }

    startNewGame() {
        console.log('game started');
        this.isActive = CONFIG.GAME_IS_ACTIVE;
    }

    finishGame() {
        console.log('game finished');
        this.isActive = !this.isActive;
    }
}