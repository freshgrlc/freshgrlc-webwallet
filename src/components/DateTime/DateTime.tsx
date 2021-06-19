import React from 'react';

interface Props {
    timestamp: number;
}

export const DateTime: React.FC<Props> = ({ timestamp }) => {
    const datetime = new Date(timestamp * 1000);
    return <div>{datetime.toLocaleString()}</div>;
};
