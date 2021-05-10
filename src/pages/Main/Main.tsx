import React, { useState } from 'react';

import { IAddress, CoinTicker } from '../../interfaces/IAddress.interface';

import { AutoPaymentInfo } from '../../components/AutoPayments';
import { Table } from '../../components/Table';

import classes from './Main.module.scss';
import { LogoutBanner } from '../../components/LogoutBanner';
import { Loading } from '../../components/Loading';
import { useWalletInfo } from '../../hooks/useWalletInfo';
import { Redirect } from 'react-router';

interface IAddressesByCoin {
    GRLC: IAddress[];
    tGRLC: IAddress[];
    TUX: IAddress[];
}

export const Main: React.FC = () => {
    const { data: info, error: infoError } = useWalletInfo();

    const [selectedCoin, setSelectedCoin] = useState<CoinTicker>('GRLC');

    const coins: IAddressesByCoin = { GRLC: [], tGRLC: [], TUX: [] };
    if (info?.addresses) {
        for (const address of info?.addresses) {
            coins[address.coin].push(address);
        }
    }

    if (infoError?.message === 'Wallet not found for those credentials') {
        return <Redirect to="/creationprompt" push={true} />;
    }

    if (!info) {
        return <Loading />;
    }

    return (
        <>
            <LogoutBanner></LogoutBanner>
            <div>
                <div className={classes.header}>
                    {Object.keys(coins).map((ticker, index) => (
                        <>
                            {ticker === selectedCoin ? (
                                <span key={ticker}>{ticker}</span>
                            ) : (
                                <input
                                    key={ticker}
                                    type="button"
                                    value={ticker}
                                    onClick={(e) => setSelectedCoin(e.currentTarget.value as CoinTicker)}
                                />
                            )}
                        </>
                    ))}
                </div>
                {Object.keys(coins)
                    .filter((coin) => coin === selectedCoin)
                    .map((ticker, index) => {
                        const coin = coins[ticker as CoinTicker];
                        return (
                            <div key={ticker}>
                                <div>
                                    <h3>{coin[0].address}</h3>
                                    <div>Balance: {coin[0].balance}</div>
                                    <div>Pending: {coin[0].pending}</div>
                                </div>
                                {coin?.splice(1).map((address, index) => (
                                    <div key={address.address}>
                                        <hr />
                                        <h4>Alternative address: {address.address}</h4>
                                        <div>Balance: {address.balance}</div>
                                        <div>Pending: {address.pending}</div>
                                    </div>
                                ))}
                                <div>
                                    {info?.autopayments[ticker as CoinTicker] &&
                                    info.autopayments[ticker as CoinTicker].length > 0 ? (
                                        <>
                                            <h4>Automatic payments</h4>
                                            <Table>
                                                {info.autopayments[ticker as CoinTicker].map(
                                                    (autopaymentConfig, index) => (
                                                        <AutoPaymentInfo
                                                            id={index}
                                                            key={index}
                                                            addHeader={index === 0}
                                                            autopaymentConfig={autopaymentConfig}
                                                            deleteCallback={(key: number) => alert('Delete idx ' + key)}
                                                        />
                                                    )
                                                )}
                                            </Table>
                                        </>
                                    ) : (
                                        <></>
                                    )}
                                </div>
                            </div>
                        );
                    })}
            </div>
        </>
    );
};
