import { Box, HStack, Text } from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import classes from './brand.module.less';
import LNCBlackLogo from '../../assets/logos/lnc-b.svg';

interface BrandProps {}

export const Brand: React.FunctionComponent<BrandProps> = () => {
    return (
        <Link href="/">
            <a>
                <HStack align="center" spacing="10px">
                    <Text className={classes.root}>dWork</Text>
                    <Box h="24px" w="2px" bg="#c5ccdf" />
                    <Image src={LNCBlackLogo} height="22px" />
                </HStack>
            </a>
        </Link>
    );
};
