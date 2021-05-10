import { RequestError } from './RequestError';

export class AuthenticationError extends RequestError {
    constructor(response: Response) {
        super(response, 'Not Authenticated');
    }
}
