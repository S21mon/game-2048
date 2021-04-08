import CONFIG from './config.js';

export default class EventsHandler {
    handleKeyEvent(event, table) {
        const key = event.code;

        if (key === CONFIG.ARROW_UP ||
            key === CONFIG.ARROW_DOWN ||
            key === CONFIG.ARROW_LEFT ||
            key === CONFIG.ARROW_RIGHT) {

            event.preventDefault();

            switch (key) {
                case `${CONFIG.ARROW_UP}`:
                    table.moveCellsInUp();
                    break;

                case `${CONFIG.ARROW_DOWN}`:
                    table.moveCellsInDown();
                    break;

                case `${CONFIG.ARROW_LEFT}`:
                    table.moveCellsInLeft();
                    break;

                case `${CONFIG.ARROW_RIGHT}`:
                    table.moveCellsInRight();
                    break;
            }
        }
    }

    handleClickEvent(event, game) {
        game.startNewGame();
    }

    handleLoadEvent(event, table) {
        table.initTable();
    }
}