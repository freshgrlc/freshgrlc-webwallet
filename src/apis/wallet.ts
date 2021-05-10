import { IWalletInfo } from '../interfaces/IWallet.interface';
import { webwallet } from './endpoints';

function getHeaders(token: string) {
    return {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
    };
}

export function doRequest(endpoint: string, method: string, token: string, data?: object | null) {
    return fetch(webwallet + endpoint, {
        method: method,
        headers: getHeaders(token),
        body: data !== undefined ? JSON.stringify(data) : undefined,
    });
}

export function get(endpoint: string, token: string) {
    return doRequest(endpoint, 'GET', token, undefined);
}
function post(endpoint: string, token: string, data: object | null) {
    return doRequest(endpoint, 'POST', token, data);
}

export async function create(token: string): Promise<IWalletInfo> {
    const response = await post('/', token, null);

    if (response.status === 401) throw new Error('Not authenticated');

    if (!response.ok) throw new Error('Request failed: ' + response.statusText);

    return response.ok ? response.json() : undefined;
}

export async function importPrivateKey(privateKey: string, token: string): Promise<IWalletInfo> {
    const response = await post('/', token, {
        privkey: privateKey,
    });

    if (response.status === 401) throw new Error('Not authenticated');

    if (!response.ok) throw new Error('Request failed: ' + response.statusText);

    return response.ok ? response.json() : undefined;
}

export async function info(token: string): Promise<IWalletInfo> {
    const response = await get('/', token);

    if (response.status === 401) throw new Error('Not authenticated');

    if (response.status === 404) throw new Error('Wallet not found for those credentials');

    if (!response.ok) throw new Error('Request failed: ' + response.statusText);

    return response.json();
}
