import { AuthenticationError } from '../errors/AuthenticationError';
import { RequestError } from '../errors/RequestError';
import { WalletInfoNotFoundError } from '../errors/WalletInfoNotFoundError';
import { IWalletInfo } from '../interfaces/IWallet';
import { webwallet } from './endpoints';

function getHeaders(token: string) {
    return {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
    };
}

export async function doRequest(endpoint: string, method: string, token: string, data?: object | null) {
    try {
        return await fetch(webwallet + endpoint, {
            method: method,
            headers: getHeaders(token),
            body: data !== undefined ? JSON.stringify(data) : undefined,
        });
    } catch (error) {
        // this is an abuse and kind of lies to swr later
        throw new Error('Unhandeled fetch error: ' + error);
    }
}

export function get(endpoint: string, token: string) {
    return doRequest(endpoint, 'GET', token, undefined);
}
function post(endpoint: string, token: string, data: object | null) {
    return doRequest(endpoint, 'POST', token, data);
}

export async function create(token: string): Promise<IWalletInfo> {
    const response = await post('/', token, null);

    if (response.status === 401) throw new AuthenticationError(response);

    if (!response.ok) throw new RequestError(response);

    return response.json();
}

export async function importPrivateKey(privateKey: string, token: string): Promise<IWalletInfo> {
    const response = await post('/', token, {
        privkey: privateKey,
    });

    if (response.status === 401) throw new AuthenticationError(response);

    if (!response.ok) throw new RequestError(response);

    return response.json();
}

export async function info(token: string): Promise<IWalletInfo> {
    const response = await get('/', token);

    if (response.status === 401) throw new AuthenticationError(response);

    if (response.status === 404) throw new WalletInfoNotFoundError(response);

    if (!response.ok) throw new RequestError(response);

    return response.json();
}

export async function send(destinaiton: string, amount: number, ticker: string, token: string) {
    const response = await post('/send/', token, {
        amount,
        destination: {
            address: destinaiton,
            type: 'address',
        },
        coin: ticker,
        priority: 'normal',
    });

    if (response.status === 401) throw new AuthenticationError(response);

    if (!response.ok) throw new RequestError(response);

    return response.json();
}
