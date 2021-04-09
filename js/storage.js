export default class Storage {
    static setData(key, data) {
        Storage.removeData(key);
        localStorage.setItem(key, data);
    }

    static removeData(key) {
        localStorage.removeItem(key);
    }

    static getData(key) {
        return localStorage.getItem(key);
    }
}