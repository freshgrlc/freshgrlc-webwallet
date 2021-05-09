import React, { useState, useEffect } from 'react';

import { IWalletAPI, IWalletInfo } from './interfaces/IWallet.interface';

import { AuthenticationToken } from './contexts/AuthenticationToken.context';
import { Wallet } from './contexts/Wallet.context';

import { Login } from './pages/Login';
import { CreationPrompt } from "./pages/CreationPrompt";
import { Main } from "./pages/Main";

import { Loading, LogoutBanner } from './components';

import WalletAPI from './apis/wallet';


export const App: React.FC = () => {
    const [ authToken, setAuthToken ] = useState<string | undefined>(() => {
        const storedToken = localStorage.getItem('token');
        return storedToken !== null ? storedToken : undefined;
    });

    const [ walletApi, setWalletApi ] = useState<IWalletAPI | undefined>();
    const [ walletInfo, setWalletInfo ] = useState<IWalletInfo | undefined>();
    const [ openingWallet, setWalletIsBeingOpened ] = useState<boolean>(false);

    useEffect(() => {
        authToken !== undefined ?
            localStorage.setItem('token', authToken) :
            localStorage.removeItem('token');
    }, [ authToken ]);

    useEffect(() => {
        if (authToken !== undefined) {
            const wallet = new WalletAPI(authToken);
            setWalletApi(wallet);
            setWalletInfo(undefined);

            setWalletIsBeingOpened(true);
            (async () => {
                try {
                    setWalletInfo(await wallet.info())
                } catch {
                    setAuthToken(undefined);
                    setWalletApi(undefined);
                }
                setWalletIsBeingOpened(false);
            })();
        } else {
            setWalletApi(undefined)
            setWalletInfo(undefined);
        }
    }, [ authToken ]);

    const createWallet = () => {
        (async () => {
            setWalletInfo(await walletApi?.create());
        })();
    };

    const createWalletWithPrivateKey = (privateKey: string) => {
        (async () => {
            setWalletInfo(await walletApi?.importPrivateKey(privateKey));
        })();
    };

    return (
        <AuthenticationToken.Provider value={{token: authToken, update: setAuthToken, clear: () => setAuthToken(undefined)}}>
            <Wallet.Provider value={{api: walletApi, info: walletInfo, exists: () => walletInfo !== undefined, create: createWallet, import: createWalletWithPrivateKey}}>
                {authToken === undefined ? (
                    <Login />
                ) : (
                    <>
                        <LogoutBanner />
                        {openingWallet ? (
                            <Loading />
                        ) : walletInfo !== undefined ? (
                            <Main />
                        ) : (
                            <CreationPrompt />
                        )}
                    </>
                )}
            </Wallet.Provider>
        </AuthenticationToken.Provider>
    );
};
