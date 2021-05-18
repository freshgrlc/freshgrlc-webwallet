import React from 'react';
import { IAddress } from '../../interfaces/IAddress';
import { Copyable } from '../Copyable';
import { TransactionHistory } from '../TransactionHistory';

interface Props {
    addresses: IAddress[];
}

export const Addresses: React.FC<Props> = ({ addresses }) => {
    return (
        <section>
            {addresses.map(({ address, balance, pending, coin }, index) => (
                <div key={address}>
                    {index === 0 ? (
                        <h1>
                            <Copyable text={address} />
                        </h1>
                    ) : (
                        <>
                            <hr />
                            <h3>
                                <span>Alternate Address: </span>
                                <Copyable text={address} />
                            </h3>
                        </>
                    )}
                    <div>
                        <span>Balance: </span>
                        <span>{balance}</span>
                    </div>
                    <div>
                        <span>Pending: </span>
                        <span>{pending}</span>
                    </div>
                    <TransactionHistory address={address} ticker={coin} />
                </div>
            ))}
        </section>
    );
};
