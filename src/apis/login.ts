import { createHash } from 'crypto';
import { IChallenge } from '../interfaces/IToken';

import { webwallet } from './endpoints';

export const loginUsingSecret = async (passphrase: string): Promise<string | undefined> => {
    const hash = createHash('sha256').update(createHash('sha256').update(passphrase).digest()).digest('hex');

    const response = await fetch(webwallet + '/login/secrethash/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(hash),
    });

    return response.ok ? response.text() : undefined;
};

export const loginUsingSignedChallenge = async (
    challenge: IChallenge,
    signature: string
): Promise<string | undefined> => {
    const response = await fetch(webwallet + '/login/address/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + challenge.authtoken,
        },
        body: JSON.stringify(signature),
    });

    return response.ok ? response.text() : undefined;
};

export const getSignatureChallenge = async (address: string): Promise<IChallenge> => {
    const url = new URL(webwallet + '/challenge/');

    url.searchParams.append('type', 'signatureauth');
    url.searchParams.append('address', address);

    const response = await fetch(url.toString(), {
        method: 'GET',
    });

    if (!response.ok) throw new Error('Request failed: ' + response.statusText);

    return response.json();
};
