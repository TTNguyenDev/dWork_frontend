import Link from 'next/link';
import React from 'react';
import classes from './brand.module.less';

interface BrandProps {}

export const Brand: React.FunctionComponent<BrandProps> = () => {
    return (
        <Link href="/">
            <a className={classes.root}>dWork</a>
        </Link>
    );
};
