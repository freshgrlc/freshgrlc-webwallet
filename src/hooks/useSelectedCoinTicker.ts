import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { CoinTicker } from '../interfaces/IAddress';
import { useQuery } from './useQuery';

function isOfTyoeCoinTicker(keyInput: string): keyInput is CoinTicker {
    return ['GRLC', 'tGRLC', 'TUX'].includes(keyInput);
}

export function useSelectedCoinTicker() {
    const queryParams = useQuery();
    const history = useHistory();

    const [selectedCoinTicker, setSelectedCoinTicker] = useState<CoinTicker>(() => {
        const ticker = queryParams.get('ticker');
        if (ticker != null && isOfTyoeCoinTicker(ticker)) {
            return ticker;
        }
        return 'GRLC';
    });

    useEffect(() => {
        if (queryParams.get('ticker') !== selectedCoinTicker) {
            history.replace(`/?ticker=${selectedCoinTicker}`);
        }
    }, [selectedCoinTicker, history, queryParams]);

    return { selectedCoinTicker, setSelectedCoinTicker };
}
