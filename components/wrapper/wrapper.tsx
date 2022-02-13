import React from 'react';
import classes from './wrapper.module.less';

interface WrapperProps {}

export const Wrapper: React.FunctionComponent<WrapperProps> = ({
    children,
}) => {
    return <div className={classes.root}>{children}</div>;
};
