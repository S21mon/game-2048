export default class Game {
    constructor() {
        this.isActive = false;
    }

    get isActive(){
        return this._isActive;
    }

    set isActive(state) {
        this._isActive = state;
    }

    startGame() {
        console.log('game started');
        this._isActive = !this.isActive;
    }

    finishGame() {
        console.log('game finished');
        this.isActive = !this.isActive;
    }
}