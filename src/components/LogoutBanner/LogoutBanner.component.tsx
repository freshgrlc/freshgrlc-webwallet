import React, { useContext } from 'react';

import { AuthenticationToken } from '../../contexts/AuthenticationToken.context';

import classes from './LogoutBanner.module.scss';

export const LogoutBanner: React.FC = () => {
    const tokenHolder = useContext(AuthenticationToken);

    return tokenHolder !== undefined ? (
        <div className={classes.logoutBanner}>
            <input type='button' onClick={tokenHolder.clear} value='Logout' />
        </div>
    ) : (<></>);
};
