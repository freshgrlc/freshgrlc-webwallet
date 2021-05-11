import React from 'react';
import { CoinTicker } from '../../interfaces/IAddress';

interface Props {
    selectedCoinTicker: CoinTicker;
    setSelectedCoinTicker: React.Dispatch<React.SetStateAction<CoinTicker>>;
    tickers: CoinTicker[];
}

export const CoinSelection: React.FC<Props> = ({ selectedCoinTicker, setSelectedCoinTicker, tickers }) => {
    return (
        <section>
            {tickers.map((ticker) => {
                return (
                    <button
                        key={ticker}
                        disabled={selectedCoinTicker === ticker}
                        onClick={() => setSelectedCoinTicker(ticker)}
                    >
                        {ticker}
                    </button>
                );
            })}
        </section>
    );
};
