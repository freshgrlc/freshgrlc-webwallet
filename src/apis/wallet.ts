import { IWalletAPI, IWalletInfo } from '../interfaces/IWallet.interface';
import endpoints from './endpoints';

class api implements IWalletAPI {
    token: string;
    headers: HeadersInit;

    constructor(token: string) {
        this.token = token;
        this.headers = {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
        };
    }

    private doRequest = (endpoint: string, method: string, data?: object | null) =>
        fetch(endpoints.webwallet + endpoint, {
            method: method,
            headers: this.headers,
            body: data !== undefined ? JSON.stringify(data) : undefined,
        });

    private get = (endpoint: string) => this.doRequest(endpoint, 'GET', undefined);

    private post = (endpoint: string, data: object | null) => this.doRequest(endpoint, 'POST', data);

    create = async (): Promise<IWalletInfo> => {
        const response = await this.post('/', null);

        if (response.status === 401) throw new Error('Not authenticated');

        if (!response.ok) throw new Error('Request failed: ' + response.statusText);

        return response.ok ? response.json() : undefined;
    };

    importPrivateKey = async (privateKey: string): Promise<IWalletInfo> => {
        const response = await this.post('/', {
            privkey: privateKey,
        });

        if (response.status === 401) throw new Error('Not authenticated');

        if (!response.ok) throw new Error('Request failed: ' + response.statusText);

        return response.ok ? response.json() : undefined;
    };

    info = async (): Promise<IWalletInfo | undefined> => {
        const response = await this.get('/');

        if (response.status === 401) throw new Error('Not authenticated');

        if (response.status === 404) return undefined;

        if (!response.ok) throw new Error('Request failed: ' + response.statusText);

        return response.json();
    };
}

export default api;
