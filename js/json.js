export default class Json {
    static convertToJson(data) {
        try {
            return JSON.stringify(data);
        } catch (error) {
            console.log(error);
        }

    }

    static convertFromJson(data) {
        try {
            return JSON.parse(data);
        } catch (error) {
            console.log(error);
        }
    }
}