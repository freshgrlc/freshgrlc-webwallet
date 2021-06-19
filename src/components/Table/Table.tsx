import React from 'react';
import clsx from 'clsx';

import classes from './Table.module.scss';

export const Table: React.FC = ({ children }) => <div className={classes.table}>{children}</div>;

export const TableRow: React.FC = ({ children }) => <div className={classes.row}>{children}</div>;

export const TableHeaderRow: React.FC = ({ children }) => (
    <div className={clsx(classes.header, classes.row)}>{children}</div>
);
