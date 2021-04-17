import { IAddress } from './IAddress.interface';

interface IConsolidationInfo {
    GRLC: null,
    tGRLC: null,
    TUX: null
};

export interface IWalletInfo {
    addresses: IAddress[];
    consolidationInfo: IConsolidationInfo;
};

export interface IWalletAPI {
    create: () => Promise<IWalletInfo>;
    importPrivateKey: (privateKey: string) => Promise<IWalletInfo>;
    info: () => Promise<IWalletInfo | undefined>;
};

export interface IWallet {
    api?: IWalletAPI;
    info?: IWalletInfo;
    exists: () => boolean;
    create: () => void;
    import: (privateKey: string) => void;
};

export default IWallet;
