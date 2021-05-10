import useSWR from 'swr';
import { info } from '../apis/wallet';
import { useProtected } from './useProtected';

export function useWalletInfo() {
    const { token } = useProtected();
    return useSWR([token, '/'], info);
}
