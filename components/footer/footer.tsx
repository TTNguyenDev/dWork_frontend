import {
    Box,
    Center,
    Grid,
    GridItem,
    Heading,
    HStack,
    Text,
    VStack,
} from '@chakra-ui/react';
import React from 'react';
import {
    BsDiscord,
    BsTelegram,
    BsTwitter,
    BsVimeo,
    BsYoutube,
} from 'react-icons/bs';
import classes from './footer.module.less';

interface FooterProps {}

export const Footer: React.FunctionComponent<FooterProps> = () => {
    return (
        <Box bg="whiteAlpha.300">
            <Box maxW="1600px" margin="auto" p="30px 15px">
                <Grid
                    templateColumns="repeat(4, 1fr)"
                    gap={10}
                    h="100%"
                    maxW="1200px"
                    margin="auto"
                    mb="100px"
                    padding="0 15px"
                >
                    <GridItem colSpan={{ base: 4, md: 1 }}>
                        <Center h="100%">
                            <VStack>
                                <Text
                                    background="linear-gradient(to right, #1371a9 0%, #7713db 100%)"
                                    backgroundClip="text"
                                    fontSize="32px"
                                    fontWeight="500"
                                >
                                    dWork
                                </Text>
                                <HStack
                                    spacing="25px"
                                    textColor="blackAlpha.700"
                                    justifyContent="center"
                                    mb="50px"
                                >
                                    <BsDiscord size={25} />
                                    <BsTelegram size={25} />
                                    <BsTwitter size={25} />
                                    <BsYoutube size={25} />
                                </HStack>
                            </VStack>
                        </Center>
                    </GridItem>
                    <GridItem colSpan={{ base: 2, md: 1 }}>
                        <Center h="100%">
                            <Box>
                                <Heading as="h5" fontSize="20px" mb="15px">
                                    Learn
                                </Heading>
                                <Text>Source code</Text>
                                <Text>API document</Text>
                            </Box>
                        </Center>
                    </GridItem>
                    <GridItem colSpan={{ base: 2, md: 1 }}>
                        <Center h="100%">
                            <Box>
                                <Heading as="h5" fontSize="20px" mb="15px">
                                    Community
                                </Heading>
                                <Text>Join Discord</Text>
                                <Text>Join Telegram</Text>
                            </Box>
                        </Center>
                    </GridItem>
                </Grid>
                <HStack justifyContent="center">
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
