import React from 'react';

import { LogoutBanner } from '../../components/LogoutBanner';
import { Loading } from '../../components/Loading';
import { useWalletInfo } from '../../hooks/useWalletInfo';
import { useSelectedCoinTicker } from '../../hooks/useSelectedCoinTicker';
import { CoinSelection } from '../../components/CoinSelection';
import { Addresses } from '../../components/Adresses';

export const Main: React.FC = () => {
    const { data: info } = useWalletInfo();
    const { selectedCoinTicker, setSelectedCoinTicker } = useSelectedCoinTicker();

    if (!info) {
        return <Loading />;
    }

    const addresses = info.addresses.filter((address) => address.coin === selectedCoinTicker);

    return (
        <>
            <LogoutBanner></LogoutBanner>
            <CoinSelection {...{ selectedCoinTicker, setSelectedCoinTicker, tickers: ['GRLC', 'tGRLC', 'TUX'] }} />
            <Addresses addresses={addresses} />
        </>
    );
};
