import React, { useState } from 'react';
import useSWR from 'swr';
import { CoinTicker } from '../../interfaces/IAddress';
import { Loading } from '../Loading';
import { addressMutations } from '../../apis/blockchain';
import { MutationList } from '../../interfaces/ITransaction';
import { Table, TableHeaderRow, TableRow } from '../Table';

import classes from './TransactionHistory.module.scss';

interface Props {
    address: string;
    ticker: CoinTicker;
}

function incrementStart(start: number) {
    return start + 10;
}

function decrementStart(start: number) {
    return start - 10;
}

export const TransactionHistory: React.FC<Props> = ({ address, ticker }) => {
    const [start, setStart] = useState(0);
    const { data, revalidate, isValidating } = useSWR<MutationList>(
        [ticker, address, start, 'mutations'],
        addressMutations
    );
    const { data: nextData, revalidate: nextRevalidate } = useSWR<MutationList>(
        [ticker, address, incrementStart(start), 'mutations'],
        addressMutations
    );

    return (
        <>
            <h3>Transaction History</h3>
            <Table>
                <TableHeaderRow>
                    <div>TXID</div>
                    <div>Change</div>
                </TableHeaderRow>
                {data != null ? (
                    data.map((mutation) => (
                        <TableRow key={mutation.transaction.txid + mutation.change}>
                            <div>{mutation.transaction.txid}</div>
                            <div className={mutation.change >= 0 ? classes.green : classes.red}>
                                {mutation.change.toFixed(8)}
                            </div>
                        </TableRow>
                    ))
                ) : (
                    <Loading />
                )}
            </Table>
            <button disabled={start === 0} onClick={() => setStart(decrementStart)}>
                prev
            </button>
            <button disabled={(nextData ?? []).length === 0} onClick={() => setStart(incrementStart)}>
                next
            </button>
            <button
                disabled={isValidating}
                onClick={() => {
                    revalidate();
                    nextRevalidate();
                }}
            >
                refresh
            </button>
        </>
    );
};
