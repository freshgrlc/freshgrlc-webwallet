import React from 'react';
import { IAddress } from '../../interfaces/IAddress';

interface Props {
    addresses: IAddress[];
}

export const Addresses: React.FC<Props> = ({ addresses }) => {
    return (
        <section>
            {addresses.map(({ address, balance, pending }, index) => (
                <div key={address}>
                    {index === 0 ? (
                        <h1>{address}</h1>
                    ) : (
                        <>
                            <hr />
                            <h3>
                                <span>Alternate Address: </span>
                                <span>{address}</span>
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
                </div>
            ))}
        </section>
    );
};
