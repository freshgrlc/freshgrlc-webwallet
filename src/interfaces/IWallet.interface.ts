import { IAddress } from './IAddress.interface';

export type AutoPaymentType = 'standard' | 'zero-balance';

export interface IAutoPaymentTransactionConfig {
    type: AutoPaymentType;
    amount?: number;
    amountToKeep?: number;
}

export interface IAutoPaymentConfig {
    address: string;
    interval: number;
    nextpayment: number;
    transaction: IAutoPaymentTransactionConfig;
}

interface IAutoPaymentConfigs {
    GRLC: IAutoPaymentConfig[];
    tGRLC: IAutoPaymentConfig[];
    TUX: IAutoPaymentConfig[];
}

export interface IWalletInfo {
    addresses: IAddress[];
    autopayments: IAutoPaymentConfigs;
}

export interface IWalletAPI {
    create: () => Promise<IWalletInfo>;
    importPrivateKey: (privateKey: string) => Promise<IWalletInfo>;
    info: () => Promise<IWalletInfo | undefined>;
}

export interface IWallet {
    api?: IWalletAPI;
    info?: IWalletInfo;
    exists: () => boolean;
    create: () => void;
    import: (privateKey: string) => void;
}

export default IWallet;
