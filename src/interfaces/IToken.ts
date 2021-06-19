export interface ITokenContext {
    token?: string;
    update: (token: string) => any;
    clear: () => void;
}

export interface IChallenge {
    challenge: string;
    authtoken: string;
}
