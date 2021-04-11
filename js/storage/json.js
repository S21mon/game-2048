export default class Json {
    static convertToJson(data) {
        return JSON.stringify(data);
    }

    static convertFromJson(data) {
        return JSON.parse(data);
    }
}