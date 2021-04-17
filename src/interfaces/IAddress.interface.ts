export type CoinTicker = 'GRLC'|'tGRLC'|'TUX';

export interface IAddress {
    address: string;
    balance: number;
    coin: CoinTicker;
    href: string;
    pending: number;
}
