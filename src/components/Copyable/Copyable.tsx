import React from 'react';
import clipboard from './clipboard.svg';

import classes from './Copyable.module.scss';

interface Props {
    text: string;
}

export const Copyable: React.FC<Props> = ({ text }) => {
    return (
        <span className={classes.copyable} onClick={() => navigator.clipboard.writeText(text)}>
            {text}
            <img src={clipboard} className={classes.clipboard} alt="" />
        </span>
    );
};
