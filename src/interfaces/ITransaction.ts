export interface IMutation {
    confirmed: boolean;
    transaction: { href: string; txid: string };
    change: number;
    time: number;
}

export type MutationList = IMutation[];
