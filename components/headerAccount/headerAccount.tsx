import React from 'react';
import { Avatar, Stack, Dropdown } from 'rsuite';
import { HeaderAccountTitle } from '../headerAccountTitle';
import { Link } from '../link';

interface HeaderAccountProps {
    logoutLoading: boolean;
    requestLogout: () => void;
    accountName: string;
    avatarSrc?: string;
}

export const HeaderAccount: React.FunctionComponent<HeaderAccountProps> = ({
    logoutLoading,
    requestLogout,
    accountName,
    avatarSrc,
}) => {
    return (
        <Dropdown
            renderToggle={(props) => (
                <HeaderAccountTitle
                    title={accountName}
                    avatarSrc={avatarSrc}
                    {...props}
                />
            )}
            placement="bottomEnd"
        >
            <Dropdown.Item as={Link} href="/profile">
                Profile
            </Dropdown.Item>
            <Dropdown.Item onSelect={requestLogout}>Sign out</Dropdown.Item>
        </Dropdown>
    );
};
