// @ts-nocheck
import React from 'react';
import NextLink from 'next/link';

export const Link = React.forwardRef((props, ref) => {
    const { href, as, ...rest } = props;
    return (
        <NextLink href={href} as={as}>
            <a ref={ref} {...rest} />
        </NextLink>
    );
});
