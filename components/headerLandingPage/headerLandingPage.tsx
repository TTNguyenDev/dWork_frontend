import Link from 'next/link';
import React from 'react';
import { Button } from 'rsuite';
import { Brand } from '../brand';
import classes from './headerLandingPage.module.less';

interface HeaderLandingPageProps {}

export const HeaderLandingPage: React.FunctionComponent<
    HeaderLandingPageProps
> = () => {
    return (
        <div className={classes.root}>
            <div className={classes.navbar}>
                <div className={classes.navbar_header}>
                    <Brand />
                </div>
                <Link href="/app">
                    <Button appearance="primary" size="lg">
                        LAUNCH APP
                    </Button>
                </Link>
            </div>
        </div>
    );
};
