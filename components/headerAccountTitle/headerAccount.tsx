import React, { useMemo } from 'react';
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
    const avatar = useMemo(
        () => (
            <Avatar
                round
                src={avatarSrc}
                alt={title}
                name={title}
                size="35"
                textSizeRatio={1.75}
            />
        ),
        [avatarSrc, title]
    );

    return (
        <Stack className={classes.root} spacing="0.75em" {...props}>
            {/* {accountType === AccountTypes.WORKER && (
                <Badge color="green" content="WORKER" />
            )}
            {accountType === AccountTypes.REQUESTER && (
                <Badge color="cyan" content="REQUESTER" />
            )} */}
            {/* <div className={classes.title}>{title}</div> */}
            {avatar}
        </Stack>
    );
};
