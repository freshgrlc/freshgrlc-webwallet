import React from 'react';

interface Props {
    value: number;
}

interface IDurationPart {
    decriptor: string;
    amount: number;
}

export const Duration: React.FC<Props> = ({ value }) => {
    let parts: IDurationPart[] = [];

    let addToParts = (decriptor: string, amount: number) => parts.push({ decriptor: decriptor, amount: amount });

    if (value >= 31536000) {
        addToParts('year', value / 31536000);
        value %= 31536000;
    }
    if (value >= 86400) {
        addToParts('day', value / 86400);
        value %= 86400;
    }
    if (value >= 3600) {
        addToParts('hour', value / 3600);
        value %= 3600;
    }
    if (value >= 60) {
        addToParts('minute', value / 60);
        value %= 60;
    }
    if (value > 0 || parts.length === 0) {
        addToParts('second', value);
    }

    return (
        <div>
            {parts.map((part, index) => (
                <>
                    {part.amount} {part.decriptor}
                    {part.amount === 1.0 ? '' : 's'}
                </>
            ))}
        </div>
    );
};
