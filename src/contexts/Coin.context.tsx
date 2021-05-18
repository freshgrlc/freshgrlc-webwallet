import React, { useContext } from 'react';
import { CoinTicker, IAddress } from '../interfaces/IAddress';

export interface ICoinContext {
    address: IAddress;
    ticker: CoinTicker;
    setTicker: React.Dispatch<React.SetStateAction<CoinTicker>>;
}

export const CoinContext = React.createContext<ICoinContext>(undefined!);

export function useCoinContext() {
    return useContext(CoinContext);
}
