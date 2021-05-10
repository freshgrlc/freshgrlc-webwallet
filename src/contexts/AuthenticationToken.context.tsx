import React, { useContext, useEffect, useState } from 'react';

import { IAuthenticationToken } from '../interfaces/IAuthenticationToken.interface';

const TokenContext = React.createContext<IAuthenticationToken>(undefined!);

function useAuth() {
    const [token, setToken] = useState<string | undefined>(() => {
        const token = localStorage.getItem('token');
        return token !== null ? token : undefined;
    });
    useEffect(() => {
        const token = localStorage.getItem('token');
        setToken(token !== null ? token : undefined);
    }, [token]);

    const update = (ntoken?: string) => {
        if (ntoken !== undefined) {
            localStorage.setItem('token', ntoken);
        } else {
            localStorage.removeItem('token');
        }
        setToken(ntoken);
    };

    return {
        token,
        clear: () => update(undefined),
        update,
    };
}

export const TokenProvider: React.FC = ({ children }) => {
    const tokenObj = useAuth();

    return <TokenContext.Provider value={tokenObj}>{children}</TokenContext.Provider>;
};

export function useTokenContext() {
    return useContext(TokenContext);
}
