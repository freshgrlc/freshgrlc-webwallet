import React from 'react';
import { useTransactionHistory } from '../../hooks/useTransactionHistory';
import { CoinTicker } from '../../interfaces/IAddress';
import { Loading } from '../Loading';
import { Table, TableHeaderRow, TableRow } from '../Table';

import classes from './TransactionHistory.module.scss';

interface Props {
    address: string;
    ticker: CoinTicker;
}

export const TransactionHistory: React.FC<Props> = ({ address, ticker }) => {
    const { currentPage, nextPage, decrementStart, incrementStart, start } = useTransactionHistory(ticker, address);

    return (
        <section>
            <h2>Transaction History</h2>
            <Table>
                <TableHeaderRow>
                    <div>TXID</div>
                    <div>Change</div>
                </TableHeaderRow>
                {currentPage.data?.map((mutation) => (
                    <TableRow key={mutation.transaction.txid + mutation.change}>
                        <div>{mutation.transaction.txid}</div>
                        <div className={mutation.change >= 0 ? classes.green : classes.red}>
                            {mutation.change.toFixed(8)}
                        </div>
                    </TableRow>
                )) ?? <Loading />}
            </Table>
            <button disabled={start === 0} onClick={decrementStart}>
                prev
            </button>
            <button disabled={(nextPage.data ?? []).length === 0} onClick={incrementStart}>
                next
            </button>
            <button
                disabled={currentPage.isValidating}
                onClick={() => {
                    currentPage.revalidate();
                    nextPage.revalidate();
                }}
            >
                refresh
            </button>
        </section>
    );
};
