import React, { useContext, useEffect, useState } from 'react';

import { ITokenContext } from '../interfaces/IToken.interface';

const LOCAL_STORAGE_KEY = 'token';

const TokenContext = React.createContext<ITokenContext>(undefined!);

function useAuth() {
    const [token, setToken] = useState<string | undefined>(() => {
        const token = localStorage.getItem(LOCAL_STORAGE_KEY);
        return token !== null ? token : undefined;
    });
    useEffect(() => {
        const token = localStorage.getItem(LOCAL_STORAGE_KEY);
        setToken(token !== null ? token : undefined);
    }, [token]);

    const update = (ntoken?: string) => {
        if (ntoken !== undefined) {
            localStorage.setItem(LOCAL_STORAGE_KEY, ntoken);
        } else {
            localStorage.removeItem(LOCAL_STORAGE_KEY);
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
