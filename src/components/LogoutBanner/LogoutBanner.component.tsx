import React, { useContext } from 'react';
import { useTokenContext } from '../../contexts/Token.context';

import classes from './LogoutBanner.module.scss';

export const LogoutBanner: React.FC = () => {
    const { clear } = useTokenContext();

    return (
        <div className={classes.logoutBanner}>
            <input type="button" onClick={clear} value="Logout" />
        </div>
    );
};
