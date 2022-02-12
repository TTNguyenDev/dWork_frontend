import React from 'react';
import { Dropdown, Nav, Navbar, Header as RSuiteHeader } from 'rsuite';
import { Brand } from '../brand';
import { LoginButton } from '../loginButton';
import { NavLink } from '../navLink';
import classes from './header.module.less';

interface HeaderProps {
    activeKey?: string;
}

export const Header: React.FunctionComponent<HeaderProps> = ({ activeKey }) => {
    return (
        <div className={classes.root}>
            <div className={classes.navbar}>
                <Navbar.Header className={classes.navbar_header}>
                    <Brand />
                </Navbar.Header>
                <LoginButton />
            </div>
        </div>
    );
};
