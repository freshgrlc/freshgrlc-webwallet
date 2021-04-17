import { createContext } from 'react';

import { IAuthenticationToken } from '../interfaces/IAuthenticationToken.interface';


export const AuthenticationToken = createContext<IAuthenticationToken|undefined>(undefined);
