export interface IAuthenticationToken {
    token?: string;
    update: (token: string) => any;
    clear: () => void;
}
