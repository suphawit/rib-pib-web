export class ResponseStatusBean {
    responseCode: string;
    responseMessage: string;
    errorMessage: string;

    constructor(responseCode: string, responseMessage: string = "", errorMessage: string = "") {
        this.responseCode = responseCode;
        this.responseMessage = responseMessage;
        this.errorMessage = errorMessage;
    }
}