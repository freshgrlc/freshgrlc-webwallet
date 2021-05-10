import { useEffect } from 'react';
import { useHistory } from 'react-router';
import useSWR from 'swr';
import { info } from '../apis/wallet';
import { AuthernticationError } from '../errors/AuthenticationError';
import { RequestError } from '../errors/RequestError';
import { WalletInfoNotFoundError } from '../errors/WalletInfoNotFoundError';
import { IWalletInfo } from '../interfaces/IWallet';
import { useProtected } from './useProtected';

export function useWalletInfo() {
    const { token } = useProtected();
    const { error, ...swrData } = useSWR<IWalletInfo, RequestError>([token, '/'], info);
    const history = useHistory();

    useEffect(() => {
        if (error instanceof WalletInfoNotFoundError) {
            history.push('/creationprompt');
        }

        if (error instanceof AuthernticationError) {
            history.push('/login');
        }
    }, [error, history]);

    return { error, ...swrData };
}
