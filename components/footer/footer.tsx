import { Box, HStack, Text } from '@chakra-ui/react';
import React from 'react';
import classes from './footer.module.less';

interface FooterProps {}

export const Footer: React.FunctionComponent<FooterProps> = () => {
    return (
        <Box bg="whiteAlpha.300">
            <Box maxW="1600px" margin="auto" p="30px 15px">
                <HStack>
                    <Text fontSize="18px" fontWeight="800" textColor="#1d243c">
                        dWork
                    </Text>
                    <Text fontSize="16px" fontWeight="500" textColor="#1d243c">
                        | Project from LNC Barrel | Powered by NEAR
                    </Text>
                </HStack>
            </Box>
        </Box>
    );
};
