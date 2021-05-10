import { RequestError } from './RequestError';

export class AuthernticationError extends RequestError {
    constructor(response: Response) {
        super(response, 'Not Authenticated');
    }
}
