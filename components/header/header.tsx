import React from 'react';
import { Navbar, Loader } from 'rsuite';
import { useHeader } from '../../hooks/useHeader';
import { Brand } from '../brand';
import { HeaderAccount } from '../headerAccount';
import { LoginButton } from '../loginButton';
import classes from './header.module.less';

interface HeaderProps {
    activeKey?: string;
}

export const Header: React.FunctionComponent<HeaderProps> = ({ activeKey }) => {
    const {
        authLoading,
        logged,
        userId,
        accountType,
        loginLoading,
        requestLogin,
        logoutLoading,
        requestLogout,
    } = useHeader();

    return (
        <div className={classes.root}>
            <div className={classes.navbar}>
                <div className={classes.navbar_header}>
                    <Brand />
                </div>
                {authLoading ? (
                    <Loader />
                ) : logged ? (
                    <HeaderAccount
                        accountType={accountType}
                        logoutLoading={logoutLoading}
                        requestLogout={requestLogout}
                        accountName={userId!}
                    />
                ) : (
                    <LoginButton
                        loading={loginLoading}
                        requestLogin={requestLogin}
                    />
                )}
            </div>
        </div>
    );
};
