export interface ITokenContext {
    token?: string;
    update: (token: string) => any;
    clear: () => void;
}
