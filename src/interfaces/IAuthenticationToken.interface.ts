
export interface IAuthenticationToken {
    token?: string,
    update: (arg0?: string) => any
    clear: () => void
};