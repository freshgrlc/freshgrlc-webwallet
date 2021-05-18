import React, { useEffect, useState } from 'react';
import { send } from '../../apis/wallet';
import { useCoinContext } from '../../contexts/Coin.context';
import { useProtected } from '../../hooks/useProtected';

import classes from './Send.module.scss';

export const Send: React.FC = () => {
    const [destination, setDestination] = useState('');
    const [amount, setAmount] = useState<number | undefined>(undefined);
    const [sending, setSending] = useState(false);
    const { token } = useProtected();
    const { ticker } = useCoinContext();

    useEffect(() => {
        clear();
    }, [ticker]);

    const clear = () => {
        setDestination('');
        setAmount(undefined);
    };

    const handleSend = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (amount === 0) {
            return;
        }
        const confirmationMessage = `Please confirm you intend to send ${amount} ${ticker} to ${destination} it cannot be undone.`;
        if (window.confirm(confirmationMessage)) {
            setSending(true);
            // catch errors to make sure sending is always reset
            try {
                // undefined override is fine here because field is marked as required on the form
                // and this method is only called with the form
                await send(destination, amount!, ticker, token);
                clear();
            } catch (error) {
                console.error(error);
            }
            setSending(false);
        }
    };

    return (
        <>
            <h2>Send</h2>
            <form className={classes.form} onSubmit={handleSend}>
                <label htmlFor="send-destination">Destination</label>
                <input
                    type="text"
                    required={true}
                    id="send-destination"
                    placeholder={`Destination ${ticker} address`}
                    disabled={sending}
                    onChange={(e) => setDestination(e.target.value)}
                    value={destination}
                />
                <label htmlFor="send-amount">Amount</label>
                <input
                    type="number"
                    required={true}
                    id="send-amount"
                    placeholder={`Amount of ${ticker} to send`}
                    disabled={sending}
                    onChange={(e) => setAmount(e.target.valueAsNumber)}
                    // avoid uncontrolled input errors
                    // https://stackoverflow.com/a/64703656
                    value={amount !== undefined ? amount : ''}
                    step={1e-8}
                    min={1e-8}
                />
                <div className={`${classes.row} ${classes.reversed}`}>
                    <button className={classes.button} disabled={sending} type="submit">
                        {sending ? <img src="/loading.gif" alt="sending" /> : 'Send'}
                    </button>
                    <button
                        className={classes.button}
                        disabled={sending}
                        onClick={(e) => {
                            e.preventDefault();
                            clear();
                        }}
                    >
                        Clear
                    </button>
                </div>
            </form>
        </>
    );
};
