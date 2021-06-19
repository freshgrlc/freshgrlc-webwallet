import { useEffect } from 'react';
import { useHistory } from 'react-router';
import { useTokenContext } from '../contexts/Token.context';

export function useProtected() {
    const { token } = useTokenContext();
    const history = useHistory();
    useEffect(() => {
        if (token === undefined) {
            history.push('/login');
        }
    }, [token, history]);

    return { token: token as string };
}
