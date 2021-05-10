import React from 'react';

import { IAutoPaymentConfig } from '../../interfaces/IWallet.interface';

import { DateTime } from '../DateTime';
import { Duration } from '../Duration';
import { TableHeaderRow, TableRow } from '../Table';

import classes from './AutoPaymentInfo.module.scss';

interface IProps {
    autopaymentConfig: IAutoPaymentConfig;
    addHeader?: boolean;
    id?: number | string;
    deleteCallback?: any;
}

type TransactionType = 'standard' | 'everything' | 'keep-amount';

export const AutoPaymentInfo: React.FC<IProps> = ({ autopaymentConfig, addHeader, id, deleteCallback }) => {
    const type: TransactionType =
        autopaymentConfig.transaction.type === 'standard'
            ? 'standard'
            : autopaymentConfig.transaction.amountToKeep && autopaymentConfig.transaction.amountToKeep > 0.0
            ? 'keep-amount'
            : 'everything';
    return (
        <>
            {addHeader ? (
                <TableHeaderRow>
                    <div>Next scheduled payment</div>
                    <div>Type / Amount</div>
                    <div>Destination</div>
                    <div>Interval</div>
                    {deleteCallback !== undefined ? <div>Delete</div> : <></>}
                </TableHeaderRow>
            ) : (
                <></>
            )}
            <TableRow>
                <DateTime timestamp={autopaymentConfig.nextpayment} />
                {type === 'everything' ? (
                    <div>Transfer everything</div>
                ) : type === 'standard' ? (
                    <div>{'Transfer exactly ' + autopaymentConfig.transaction.amount}</div>
                ) : (
                    <div>{'Transfer everything but ' + autopaymentConfig.transaction.amountToKeep}</div>
                )}
                <div>{autopaymentConfig.address}</div>
                <Duration value={autopaymentConfig.interval} />
                {deleteCallback !== undefined ? (
                    <div>
                        <input type="button" value="Delete" onClick={() => deleteCallback(id)} />
                    </div>
                ) : (
                    <></>
                )}
            </TableRow>
        </>
    );
};
