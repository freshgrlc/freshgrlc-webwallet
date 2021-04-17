import React, { useContext, useState } from 'react';

import { IAddress, CoinTicker } from '../interfaces/IAddress.interface';

import { Wallet } from '../contexts';

import classes from './Main.module.scss';


interface IAddressesByCoin {
    GRLC: IAddress[];
    tGRLC: IAddress[];
    TUX: IAddress[];
};


export const Main: React.FC = () => {
    const wallet = useContext(Wallet);

    const coins: IAddressesByCoin = { GRLC: [], tGRLC: [], TUX: [] };

    const [ selectedCoin, setSelectedCoin ] = useState<CoinTicker>('GRLC');

    if (wallet?.info?.addresses) {
        for (const address of wallet?.info?.addresses) {
            coins[address.coin].push(address);
        }
    }

    return (
        <div>
            <div className={classes.header}>
                {Object.keys(coins).map((ticker, index) => (
                    <>
                        {ticker === selectedCoin ? (
                            <span>{ticker}</span>
                        ) : (
                            <input type='button' value={ticker} onClick={e => setSelectedCoin(e.currentTarget.value as CoinTicker)} />
                        )}
                    </>
                ))}
            </div>
            {Object.keys(coins).filter(coin => coin === selectedCoin).map((ticker, index) => {
                const coin = coins[ticker as CoinTicker];
                return (
                    <div key={index}>
                        <div>
                            <h3>{coin[0].address}</h3>
                            <div>Balance: {coin[0].balance}</div>
                            <div>Pending: {coin[0].pending}</div>
                        </div>
                        {coin?.splice(1).map((address, index) =>(
                            <div>
                                <hr />
                                <h4>Alternative address: {address.address}</h4>
                                <div>Balance: {address.balance}</div>
                                <div>Pending: {address.pending}</div>
                            </div>
                        ))}
                    </div>
                );
            })}
        </div>
    );
};
