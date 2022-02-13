import React from 'react';
import { Avatar, Stack } from 'rsuite';
import classes from './headerAccountTitle.module.less';

interface HeaderAccountTitleProps {
    avatarSrc?: string;
    title: string;
}

export const HeaderAccountTitle: React.FunctionComponent<
    HeaderAccountTitleProps
> = ({ avatarSrc, title, ...props }) => {
    return (
        <Stack className={classes.root} spacing="1em" {...props}>
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
