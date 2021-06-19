import { RequestError } from './RequestError';

export class WalletInfoNotFoundError extends RequestError {
    constructor(response: Response) {
        super(response, 'Wallet Info Not Found');
    }
}
