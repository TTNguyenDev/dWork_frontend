import React from 'react';
import { BsPlusLg } from 'react-icons/bs';
import { Navbar, Loader, Stack, Button, IconButton } from 'rsuite';
import { useHeader } from '../../hooks/useHeader';
import { AccountTypes } from '../../models/types/accountType';
import { ModalsController } from '../../utils/modalsController';
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
                    <Stack spacing="30px">
                        {accountType === AccountTypes.REQUESTER && (
                            <IconButton
                                appearance="primary"
                                size="sm"
                                icon={<BsPlusLg />}
                                style={{ width: 30, height: 30 }}
                                onClick={
                                    ModalsController.controller
                                        .openCreateTaskModal
                                }
                            />
                        )}
                        <HeaderAccount
                            accountType={accountType}
                            logoutLoading={logoutLoading}
                            requestLogout={requestLogout}
                            accountName={userId!}
                        />
                    </Stack>
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
