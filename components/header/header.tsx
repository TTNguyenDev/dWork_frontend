import React from 'react';
import { BsPlusLg } from 'react-icons/bs';
import { Navbar, Loader, Stack, Button, IconButton, FlexboxGrid } from 'rsuite';
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
                    <Stack>
                        {accountType === AccountTypes.REQUESTER && (
                            <Button
                                appearance="primary"
                                style={{ marginRight: 20 }}
                                onClick={
                                    ModalsController.controller
                                        .openCreateTaskModal
                                }
                            >
                                <Stack spacing="8px" alignItems="center">
                                    <div
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <BsPlusLg />
                                    </div>
                                    <div>NEW TASK</div>
                                </Stack>
                            </Button>
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
