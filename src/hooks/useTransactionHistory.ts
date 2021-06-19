import { useState } from 'react';

import useSWR from 'swr';
import { addressMutations } from '../apis/blockchain';
import { useCoinContext } from '../contexts/Coin.context';
import { MutationList } from '../interfaces/ITransaction';

function incrementStart(start: number) {
    return start + 10;
}

function decrementStart(start: number) {
    return start - 10;
}

export function useTransactionHistory() {
    const {
        ticker,
        address: { address },
    } = useCoinContext();
    const [start, setStart] = useState(0);

    const currentPage = useSWR<MutationList>([ticker, address, start, 'mutations'], addressMutations);
    const nextPage = useSWR<MutationList>([ticker, address, incrementStart(start), 'mutations'], addressMutations);

    return {
        currentPage,
        nextPage,
        start,
        incrementStart: () => setStart(incrementStart),
        decrementStart: () => setStart(decrementStart),
    };
}
