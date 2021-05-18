import React from 'react';
import { IAddress } from '../../interfaces/IAddress';
import { Copyable } from '../Copyable';

interface Props {
    address: IAddress;
}

export const Addresses: React.FC<Props> = ({ address: addressObject }) => {
    const { address, balance, pending } = addressObject;
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
