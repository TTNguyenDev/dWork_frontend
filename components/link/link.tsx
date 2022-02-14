import React from 'react';
import NextLink from 'next/link';

export const Link = React.forwardRef(
    (props: { href: string; children: React.ReactNode }, ref) => {
        const { href, ...rest } = props;
        return (
            <NextLink href={href}>
                <a {...rest} />
            </NextLink>
        );
    }
);
