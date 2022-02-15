import React from 'react';
import { Avatar, Badge, Stack } from 'rsuite';
import { AccountTypes } from '../../models/types/accountType';
import classes from './headerAccountTitle.module.less';

interface HeaderAccountTitleProps {
    accountType: AccountTypes;
    avatarSrc?: string;
    title: string;
}

export const HeaderAccountTitle: React.FunctionComponent<
    HeaderAccountTitleProps
> = ({ accountType, avatarSrc, title, ...props }) => {
    return (
        <Stack className={classes.root} spacing="1em" {...props}>
            {accountType === AccountTypes.WORKER && (
                <Badge color="green" content="WORKER" />
            )}
            {accountType === AccountTypes.REQUESTER && (
                <Badge color="cyan" content="REQUESTER" />
            )}
            <div className={classes.title}>{title}</div>
            <Avatar
                circle
                src={
                    avatarSrc ??
                    'https://avatars.githubusercontent.com/u/12592949'
                }
                alt={title}
            />
        </Stack>
    );
};
