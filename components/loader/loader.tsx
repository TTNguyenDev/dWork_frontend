import Link from 'next/link';
import React from 'react';
import classes from './loader.module.less';
import { Loader as RSuiteLoader } from 'rsuite';

interface LoaderProps {}

export const Loader: React.FunctionComponent<LoaderProps> = () => {
    return (
        <div className={classes.root}>
            <RSuiteLoader size="md" speed="fast" />
        </div>
    );
};
