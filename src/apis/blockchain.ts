import { blockchain } from './endpoints';

function getHeaders() {
    return {
        'Content-Type': 'application/json',
    };
}

type HttpMethods = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'OPTIONS' | 'TRACE' | 'PATCH' | 'HEAD';

export async function doBlockchainRequest(endpoint: string, method: HttpMethods, data?: object | null) {
    try {
        return await fetch(blockchain + endpoint, {
            method: method,
            headers: getHeaders(),
            body: data !== undefined ? JSON.stringify(data) : undefined,
        });
    } catch (error) {
        // this is an abuse and kind of lies to swr later
        throw new Error('Unhandeled fetch error: ' + error);
    }
}

export async function get(endpoint: string) {
    return await doBlockchainRequest(endpoint, 'GET', undefined);
}
export async function post(endpoint: string, data: object | null) {
    return await doBlockchainRequest(endpoint, 'POST', data);
}
