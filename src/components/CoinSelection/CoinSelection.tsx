import React from 'react';
import { useCoinContext } from '../../contexts/Coin.context';
import { CoinTicker } from '../../interfaces/IAddress';

interface Props {
    tickers: CoinTicker[];
}

export const CoinSelection: React.FC<Props> = ({ tickers }) => {
    const { ticker, setTicker } = useCoinContext();
    return (
        <section>
            {tickers.map((e) => {
                return (
                    <button key={e} disabled={e === ticker} onClick={() => setTicker(e)}>
                        {e}
                    </button>
                );
            })}
        </section>
    );
};
