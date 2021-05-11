import React from 'react';

import classes from './DateTime.module.scss';

interface IProps {
    timestamp: number;
}

export const DateTime: React.FC<IProps> = ({ timestamp }) => {
    const datetime = new Date(timestamp * 1000);
    return <div>{datetime.toLocaleString()}</div>;
};
