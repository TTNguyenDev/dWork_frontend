// @ts-nocheck
import React from 'react';
import { Dropdown } from 'rsuite';
import { AccountTypes } from '../../models/types/accountType';
import { HeaderAccountTitle } from '../headerAccountTitle';
import { Link } from '../link';

interface HeaderAccountProps {
    logoutLoading: boolean;
    requestLogout: () => void;
    accountName: string;
    avatarSrc?: string;
    accountType: AccountTypes;
}

export const HeaderAccount: React.FunctionComponent<HeaderAccountProps> = ({
    logoutLoading,
    requestLogout,
    accountName,
    avatarSrc,
    accountType,
}) => {
    return (
        <Dropdown
            renderToggle={(props: any) => (
                <HeaderAccountTitle
                    accountType={accountType}
                    title={accountName}
                    avatarSrc={avatarSrc}
                    {...props}
                />
            )}
            placement="bottomEnd"
        >
            <Dropdown.Item as={Link} href={`/account/${accountName}`}>
                My account
            </Dropdown.Item>
            <Dropdown.Item onSelect={requestLogout}>Sign out</Dropdown.Item>
        </Dropdown>
    );
};
