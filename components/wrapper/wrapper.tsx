import React from 'react';
import classes from './wrapper.module.less';

export const Wrapper: React.FunctionComponent<React.HTMLProps<any>> = ({
    children,
    className,
    ...rest
}) => {
    return (
        <div className={[className || '', classes.root].join(' ')} {...rest}>
            {children}
        </div>
    );
};
