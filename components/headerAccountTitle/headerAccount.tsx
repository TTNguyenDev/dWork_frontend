import React from 'react';
import { Badge, Stack } from 'rsuite';
import { AccountTypes } from '../../models/types/accountType';
import classes from './headerAccountTitle.module.less';
import Avatar from 'react-avatar';

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
                round
                src={avatarSrc}
                alt={title}
                name={title}
                size="35"
                textSizeRatio={1.75}
            />
        </Stack>
    );
};
