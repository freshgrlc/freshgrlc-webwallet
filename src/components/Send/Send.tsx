import { ErrorMessage } from '@hookform/error-message';
import React, { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { send } from '../../apis/wallet';
import { useCoinContext } from '../../contexts/Coin.context';
import { useProtected } from '../../hooks/useProtected';
import { useTransactionHistory } from '../../hooks/useTransactionHistory';

import classes from './Send.module.scss';

interface IFormInput {
    destination: string;
    amount: number;
}

export const Send: React.FC = () => {
    const {
        handleSubmit,
        reset,
        register,
        formState: { isSubmitting, errors, isDirty },
    } = useForm();
    const { token } = useProtected();
    const { ticker } = useCoinContext();
    const { currentPage, nextPage } = useTransactionHistory();

    useEffect(() => {
        reset();
    }, [ticker, reset]);

    const onSubmit: SubmitHandler<IFormInput> = async ({ amount, destination }) => {
        if (amount === 0) {
            return;
        }
        const confirmationMessage = `Please confirm you intend to send ${amount} ${ticker} to ${destination} it cannot be undone.`;
        if (window.confirm(confirmationMessage)) {
            // catch errors to make sure sending is always reset
            try {
                // undefined override is fine here because field is marked as required on the form
                // and this method is only called with the form
                await send(destination, amount!, ticker, token);
                currentPage.revalidate();
                nextPage.revalidate();
                reset();
            } catch (error) {
                console.error(error);
            }
        }
    };

    return (
        <>
            <h2>Send</h2>
            <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
                <fieldset>
                    <label>Destination</label>
                    <input
                        placeholder={`Destination ${ticker} address`}
                        {...register('destination', { required: 'Required Field' })}
                    />
                    <ErrorMessage as={<p />} errors={errors} name="destination" />
                </fieldset>
                <fieldset>
                    <label>Amount</label>
                    <input
                        type="number"
                        placeholder={`Amount of ${ticker} to send`}
                        step={1e-8}
                        min={1e-3}
                        {...register('amount', {
                            required: 'Required Field',
                            min: { value: 0.001, message: 'Minimum amount is 0.001' },
                        })}
                    />
                    <ErrorMessage as={<p />} errors={errors} name="amount" />
                </fieldset>
                <div className={`${classes.row} ${classes.reversed}`}>
                    <button disabled={isSubmitting} type="submit">
                        {isSubmitting ? <img src="/loading.gif" alt="Submitting" /> : 'Send'}
                    </button>
                    <button
                        disabled={isSubmitting || !isDirty}
                        onClick={(e) => {
                            e.preventDefault();
                            reset();
                        }}
                    >
                        Clear
                    </button>
                </div>
            </form>
        </>
    );
};
