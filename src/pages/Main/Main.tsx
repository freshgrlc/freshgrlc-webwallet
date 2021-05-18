import React from 'react';

import { LogoutBanner } from '../../components/LogoutBanner';
import { Loading } from '../../components/Loading';
import { useWalletInfo } from '../../hooks/useWalletInfo';
import { useSelectedCoinTicker } from '../../hooks/useSelectedCoinTicker';
import { CoinSelection } from '../../components/CoinSelection';
import { Addresses } from '../../components/Adresses';
import { Table } from '../../components/Table';
import { AutoPaymentHeaderRow, AutoPaymentInfoRow } from '../../components/AutoPayments';
import { Send } from '../../components/Send';
import { TransactionHistory } from '../../components/TransactionHistory';

export const Main: React.FC = () => {
    const { data: info } = useWalletInfo();
    const { selectedCoinTicker, setSelectedCoinTicker } = useSelectedCoinTicker();

    if (!info) {
        return <Loading />;
    }

    const addresses = info.addresses.filter((address) => address.coin === selectedCoinTicker);
    const address = addresses[0];
    const autoPayments = info.autopayments[selectedCoinTicker];

    return (
        <>
            <LogoutBanner></LogoutBanner>
            <CoinSelection {...{ selectedCoinTicker, setSelectedCoinTicker, tickers: ['GRLC', 'tGRLC', 'TUX'] }} />
            <Addresses address={address} />
            <Send selectedCoinTicker={selectedCoinTicker} />
            <TransactionHistory address={address.address} ticker={selectedCoinTicker} />
            {autoPayments.length > 0 && (
                <Table>
                    <AutoPaymentHeaderRow />
                    {autoPayments.map((autoPayment) => (
                        <AutoPaymentInfoRow
                            key={autoPayment.address + autoPayment.interval + autoPayment.transaction.type}
                            autoPaymentConfig={autoPayment}
                        />
                    ))}
                </Table>
            )}
        </>
    );
};
