import { createContext } from 'react';

import IWallet from '../interfaces/IWallet.interface';

export const Wallet = createContext<IWallet | undefined>(undefined);
