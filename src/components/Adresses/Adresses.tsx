import React from 'react';
import { useCoinContext } from '../../contexts/Coin.context';
import { Copyable } from '../Copyable';

export const Addresses: React.FC = () => {
    const { address: addressObj } = useCoinContext();
    const { address, balance, pending } = addressObj;
    return (
        <section>
            <div key={address}>
                <h1>
                    <Copyable text={address} />
                </h1>
                <div>
                    <span>Balance: </span>
                    <span>{balance}</span>
                </div>
                <div>
                    <span>Pending: </span>
                    <span>{pending}</span>
                </div>
            </div>
        </section>
    );
};
