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
    autopaymentConfig: IAutoPaymentConfig;
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

export const AutoPaymentInfoRow: React.FC<AutoPaymentInfoRowProps> = ({ autopaymentConfig, deleteCallback }) => {
    const transactionType: TransactionType =
        autopaymentConfig.transaction.type === 'standard'
            ? 'standard'
            : (autopaymentConfig.transaction.amountToKeep ?? 0.0) > 0.0
            ? 'keep-amount'
            : 'everything';
    return (
        <TableRow>
            <DateTime timestamp={autopaymentConfig.nextpayment} />
            <AutoPaymentTransactionAmount {...{ transactionType, transaction: autopaymentConfig.transaction }} />
            <div>
                <Copyable text={autopaymentConfig.address} />
            </div>
            <Duration value={autopaymentConfig.interval} />
            {deleteCallback != null && <button onClick={deleteCallback}>Delete</button>}
        </TableRow>
    );
};
