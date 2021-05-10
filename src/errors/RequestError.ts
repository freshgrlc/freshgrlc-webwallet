export class RequestError extends Error {
    constructor(public response: Response, message: string = "Request Error") {
        super(message);
    }
}
