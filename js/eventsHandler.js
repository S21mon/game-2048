export default class EventsHandler {
    static addHandler(element, event, callback) {
        element.addEventListener(`${event}`, callback);
    }

    static removeHandler(element, event, callback) {
        element.removeEventListener(`${event}`, callback);
    }
}