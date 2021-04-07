export default class Game {
    constructor() {
        this.isActive = false;
    }

    startGame() {
        console.log('game started');
        this.isActive = !this.isActive;
    }

    finishGame() {
        console.log('game finished');
        this.isActive = !this.isActive;
    }
}