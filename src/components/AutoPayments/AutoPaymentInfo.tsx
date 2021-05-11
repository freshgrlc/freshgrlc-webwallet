import React from 'react';

import { IAutoPaymentConfig, IAutoPaymentTransactionConfig } from '../../interfaces/IWallet';
import { Copyable } from '../Copyable';

import { DateTime } from '../DateTime';
import { Duration } from '../Duration';
import { TableHeaderRow, TableRow } from '../Table';

import classes from './AutoPaymentInfo.module.scss';

type TransactionType = 'standard' | 'everything' | 'keep-amount';

interface AutoPaymentTransactionProps {
    transactionType: TransactionType;
    transaction: IAutoPaymentTransactionConfig;
}

interface AutoPaymentHeaderRowProps {
    showDelete?: boolean;
}

interface AutoPaymentInfoRowProps {
    autoPaymentConfig: IAutoPaymentConfig;
    id?: number | string;
    deleteCallback?: () => any;
}

const AutoPaymentTransactionAmount: React.FC<AutoPaymentTransactionProps> = ({ transactionType, transaction }) => {
    if (transactionType === 'everything') {
        return <div>Transfer everything</div>;
    } else if (transactionType === 'keep-amount') {
        return <div>{'Transfer exactly ' + transaction.amount}</div>;
    } else {
        return <div>{'Transfer everything but ' + transaction.amountToKeep}</div>;
    }
};

export const AutoPaymentHeaderRow: React.FC<AutoPaymentHeaderRowProps> = ({ showDelete }) => {
    return (
        <TableHeaderRow>
            <div>Next scheduled payment</div>
            <div>Type / Amount</div>
            <div>Destination</div>
            <div>Interval</div>
            {showDelete && <div>Delete</div>}
        </TableHeaderRow>
    );
};

export const AutoPaymentInfoRow: React.FC<AutoPaymentInfoRowProps> = ({ autoPaymentConfig, deleteCallback }) => {
    const transactionType: TransactionType =
        autoPaymentConfig.transaction.type === 'standard'
            ? 'standard'
            : (autoPaymentConfig.transaction.amountToKeep ?? 0.0) > 0.0
            ? 'keep-amount'
            : 'everything';
    return (
        <TableRow>
            <DateTime timestamp={autoPaymentConfig.nextpayment} />
            <AutoPaymentTransactionAmount {...{ transactionType, transaction: autoPaymentConfig.transaction }} />
            <div>
                <Copyable text={autoPaymentConfig.address} />
            </div>
            <Duration value={autoPaymentConfig.interval} />
            {deleteCallback != null && <button onClick={deleteCallback}>Delete</button>}
        </TableRow>
    );
};
