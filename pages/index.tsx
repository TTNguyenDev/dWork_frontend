import React from 'react';
import Header from 'next/head';
import { Layout } from '../components/layout';
import { Button, Steps } from 'rsuite';
import {
    AspectRatio,
    Box,
    Center,
    Grid,
    GridItem,
    Heading,
    HStack,
    ListItem,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text,
    UnorderedList,
    useDisclosure,
} from '@chakra-ui/react';
import LogoLNC from '../assets/logos/lnc-b.svg';
import LogoNearFoundation from '../assets/logos/near-foundation.svg';
import Link from 'next/link';
import Image from 'next/image';
import FeatureLogo1 from '../assets/feature_logo_1.svg';
import FeatureLogo2 from '../assets/feature_logo_2.svg';
import FeatureLogo3 from '../assets/feature_logo_3.svg';
import FeatureLogo4 from '../assets/feature_logo_4.svg';
import ReactPlayer from 'react-player';

export default function Home() {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <Header>
                <title>Home</title>
            </Header>
            <Layout activeKey="landing_page">
                <Box pt="150px" pb="200px">
                    <Grid
                        templateColumns="repeat(2, 1fr)"
                        gap={10}
                        h="100%"
                        maxW="1200px"
                        margin="auto"
                        padding="0 15px"
                    >
                        <GridItem colSpan={{ base: 2, md: 1 }}>
                            <Center h="100%">
                                <Box>
                                    <Heading
                                        as="h2"
                                        mb="30px"
                                        fontSize="54px"
                                        fontWeight={400}
                                    >
                                        Earn Near by completing small tasks.
                                    </Heading>
                                    <Text
                                        mb="50px"
                                        fontSize="24px"
                                        fontWeight={300}
                                    >
                                        Decentralized platform allows users to
                                        hire and find jobs here. The system
                                        ensures the salary for developers as
                                        well as transparent proof of work to the
                                        job owners.
                                    </Text>
                                    <Link href="/app">
                                        <Button appearance="primary" size="lg">
                                            LAUNCH APP
                                        </Button>
                                    </Link>
                                </Box>
                            </Center>
                        </GridItem>
                        <GridItem colSpan={{ base: 2, md: 1 }}>
                            <Center h="100%">
                                <AspectRatio
                                    ratio={16 / 9}
                                    w="100%"
                                    onClick={onOpen}
                                    cursor="pointer"
                                >
                                    <Box pointerEvents="none">
                                        <ReactPlayer
                                            url="https://www.youtube.com/watch?v=yqWX86uT5jM"
                                            width="100%"
                                            height="100%"
                                            light
                                        />
                                    </Box>
                                </AspectRatio>
                            </Center>
                            <Modal
                                isCentered
                                onClose={onClose}
                                isOpen={isOpen}
                                motionPreset="slideInBottom"
                                size="full"
                            >
                                <ModalOverlay />
                                <ModalContent bg="transparent">
                                    <ModalCloseButton color="white" />
                                    <ModalBody position="relative" zIndex={-1}>
                                        <Box
                                            w="100%"
                                            maxW="1600px"
                                            p="15px"
                                            position="absolute"
                                            top="50%"
                                            left="50%"
                                            transform="translate(-50%, -50%)"
                                        >
                                            <AspectRatio
                                                w="100%"
                                                ratio={16 / 9}
                                            >
                                                <ReactPlayer
                                                    url="https://www.youtube.com/watch?v=yqWX86uT5jM"
                                                    playing
                                                    width="100%"
                                                    height="100%"
                                                />
                                            </AspectRatio>
                                        </Box>
                                    </ModalBody>
                                </ModalContent>
                            </Modal>
                        </GridItem>
                    </Grid>
                </Box>
                <Box pt="150px" pb="200px">
                    <Grid
                        templateColumns="repeat(2, 1fr)"
                        gap={10}
                        h="100%"
                        maxW="1200px"
                        margin="auto"
                        mb="50px"
                        padding="0 15px"
                    >
                        <GridItem colSpan={{ base: 2, md: 1 }}>
                            <Center h="100%">
                                <Text
                                    background="linear-gradient(to right, #1371a9 0%, #7713db 100%)"
                                    backgroundClip="text"
                                    fontSize="48px"
                                    fontWeight="500"
                                >
                                    dWork
                                </Text>
                            </Center>
                        </GridItem>
                        <GridItem colSpan={{ base: 2, md: 1 }}>
                            <Center h="100%">
                                <Box>
                                    <Text fontSize="24px" fontWeight={300}>
                                        dWork is easy to use, transparent, and
                                        almost trustless. Create quests in only
                                        one step. And User can apply and get
                                        reward directly from the smart contract.
                                    </Text>
                                </Box>
                            </Center>
                        </GridItem>
                    </Grid>
                    <Box>
                        <Text
                            fontSize="18px"
                            fontWeight="500"
                            textAlign="center"
                            mb="30px"
                        >
                            IN PARTNERSHIP WITH
                        </Text>
                        <HStack justifyContent="center" spacing="30px">
                            <Center w="150px" cursor="pointer">
                                <Link href="https://learnnear.club/">
                                    <Image src={LogoLNC} />
                                </Link>
                            </Center>
                            <Center w="150px" cursor="pointer">
                                <Link href="https://near.foundation/">
                                    <Image src={LogoNearFoundation} />
                                </Link>
                            </Center>
                        </HStack>
                    </Box>
                </Box>
                <Box pt="150px" pb="200px">
                    <Box>
                        <Text
                            fontSize="38px"
                            fontWeight="500"
                            textAlign="center"
                            mb="30px"
                        >
                            FEATURES
                        </Text>
                    </Box>
                    <Grid
                        templateColumns="repeat(2, 1fr)"
                        gap={10}
                        h="100%"
                        maxW="1200px"
                        margin="auto"
                        mb="50px"
                        padding="50px 15px"
                    >
                        <GridItem colSpan={{ base: 2, md: 1 }}>
                            <Center h="100%">
                                <Box>
                                    <Heading
                                        as="h3"
                                        fontSize="34px"
                                        fontWeight="500"
                                        mb="20px"
                                    >
                                        Easy to post jobs
                                    </Heading>
                                    <Text fontSize="24px" fontWeight={300}>
                                        Post a job and hire a pro. We are
                                        solving your problem with pro-workers
                                        worldwide—no services fee for now. GME
                                        on their platform demonstrated.
                                    </Text>
                                </Box>
                            </Center>
                        </GridItem>
                        <GridItem colSpan={{ base: 2, md: 1 }}>
                            <Center h="100%">
                                <Image
                                    src={FeatureLogo1}
                                    width="250px"
                                    height="250px"
                                />
                            </Center>
                        </GridItem>
                    </Grid>
                    <Grid
                        templateColumns="repeat(2, 1fr)"
                        gap={10}
                        h="100%"
                        maxW="1200px"
                        margin="auto"
                        mb="50px"
                        padding="50px 15px"
                    >
                        <GridItem colSpan={{ base: 2, md: 1 }}>
                            <Center h="100%">
                                <Image
                                    src={FeatureLogo2}
                                    width="250px"
                                    height="250px"
                                />
                            </Center>
                        </GridItem>
                        <GridItem colSpan={{ base: 2, md: 1 }}>
                            <Center h="100%">
                                <Box>
                                    <Heading
                                        as="h3"
                                        fontSize="34px"
                                        fontWeight="500"
                                        mb="20px"
                                    >
                                        Earn crypto
                                    </Heading>
                                    <Text fontSize="24px" fontWeight={300}>
                                        Make money by solving problems. As a
                                        worker, we can ensure your pay with
                                        smart-contract.
                                    </Text>
                                </Box>
                            </Center>
                        </GridItem>
                    </Grid>
                    <Grid
                        templateColumns="repeat(2, 1fr)"
                        gap={10}
                        h="100%"
                        maxW="1200px"
                        margin="auto"
                        mb="50px"
                        padding="50px 15px"
                    >
                        <GridItem colSpan={{ base: 2, md: 1 }}>
                            <Center h="100%">
                                <Box>
                                    <Heading
                                        as="h3"
                                        fontSize="34px"
                                        fontWeight="500"
                                        mb="20px"
                                    >
                                        Completely decentralized
                                    </Heading>
                                    <Text fontSize="24px" fontWeight={300}>
                                        dWork is decentralized on the NEAR
                                        Blockchain - A 3rd generation blockchain
                                        with a meager network fee. Tasks and
                                        worker’s proof are stored on NEAR
                                        Blockchain and IPFS. Your money will be
                                        controlled with this protocol. We
                                        protect everyone's benefit.
                                    </Text>
                                </Box>
                            </Center>
                        </GridItem>
                        <GridItem colSpan={{ base: 2, md: 1 }}>
                            <Center h="100%">
                                <Image
                                    src={FeatureLogo3}
                                    width="250px"
                                    height="250px"
                                />
                            </Center>
                        </GridItem>
                    </Grid>
                    <Grid
                        templateColumns="repeat(2, 1fr)"
                        gap={10}
                        h="100%"
                        maxW="1200px"
                        margin="auto"
                        mb="50px"
                        padding="50px 15px"
                    >
                        <GridItem colSpan={{ base: 2, md: 1 }}>
                            <Center h="100%">
                                <Image
                                    src={FeatureLogo4}
                                    width="250px"
                                    height="250px"
                                />
                            </Center>
                        </GridItem>
                        <GridItem colSpan={{ base: 2, md: 1 }}>
                            <Center h="100%">
                                <Box>
                                    <Heading
                                        as="h3"
                                        fontSize="34px"
                                        fontWeight="500"
                                        mb="20px"
                                    >
                                        User Ranking
                                    </Heading>
                                    <Text fontSize="24px" fontWeight={300}>
                                        User ranking and penalty to someone
                                        trying to cheat or spam dWork protocol.
                                    </Text>
                                </Box>
                            </Center>
                        </GridItem>
                    </Grid>
                </Box>
                <Box pt="150px" pb="200px">
                    <Box>
                        <Text
                            fontSize="38px"
                            fontWeight="500"
                            textAlign="center"
                            mb="30px"
                        >
                            ROAD MAP
                        </Text>
                    </Box>
                    <Box
                        p="0 15px"
                        maxW="1200px"
                        margin="auto"
                        mb="50px"
                        padding="50px 15px"
                        display={{ base: 'none', md: 'block' }}
                    >
                        <Steps current={1}>
                            <Steps.Item
                                title="Q1/2022"
                                description={
                                    <UnorderedList>
                                        <ListItem>
                                            Proposing the idea and building a
                                            prototype
                                        </ListItem>
                                        <ListItem>Partner with LNC</ListItem>
                                        <ListItem>Basic features</ListItem>
                                        <ListItem>Beta test</ListItem>
                                    </UnorderedList>
                                }
                            />
                            <Steps.Item
                                title="Q2/2022"
                                description={
                                    <UnorderedList>
                                        <ListItem>
                                            Tasks management, Users Ranking,
                                            Indexed data, and filters
                                        </ListItem>
                                        <ListItem>Internal test</ListItem>
                                        <ListItem>Beta test</ListItem>
                                    </UnorderedList>
                                }
                            />
                            <Steps.Item
                                title="Q3/2022"
                                description={
                                    <UnorderedList>
                                        <ListItem>
                                            Retroactive, reward to contributors
                                        </ListItem>
                                        <ListItem>
                                            Audit smart contract
                                        </ListItem>
                                        <ListItem>Release on mainnet</ListItem>
                                    </UnorderedList>
                                }
                            />
                            <Steps.Item
                                title="Q4/2022"
                                description={
                                    <UnorderedList>
                                        <ListItem>Hire more employees</ListItem>
                                        <ListItem>Marketing</ListItem>
                                        <ListItem>
                                            Release the dWork token for
                                            governance, use as a currency for
                                            internal payment
                                        </ListItem>
                                        <ListItem>
                                            Allow swapping on Defi protocol
                                        </ListItem>
                                    </UnorderedList>
                                }
                            />
                        </Steps>
                    </Box>
                    <Box p="0 15px" display={{ base: 'block', md: 'none' }}>
                        <Steps current={0} vertical>
                            <Steps.Item
                                title="Q1/2022"
                                description={
                                    <UnorderedList>
                                        <ListItem>
                                            Proposing the idea and building a
                                            prototype
                                        </ListItem>
                                        <ListItem>Partner with LNC</ListItem>
                                        <ListItem>Basic features</ListItem>
                                        <ListItem>Beta test</ListItem>
                                    </UnorderedList>
                                }
                            />
                            <Steps.Item
                                title="Q2/2022"
                                description={
                                    <UnorderedList>
                                        <ListItem>
                                            Tasks management, Users Ranking,
                                            Indexed data, and filters
                                        </ListItem>
                                        <ListItem>Internal test</ListItem>
                                        <ListItem>Beta test</ListItem>
                                    </UnorderedList>
                                }
                            />
                            <Steps.Item
                                title="Q3/2022"
                                description={
                                    <UnorderedList>
                                        <ListItem>
                                            Retroactive, reward to contributors
                                        </ListItem>
                                        <ListItem>
                                            Audit smart contract
                                        </ListItem>
                                        <ListItem>Release on mainnet</ListItem>
                                    </UnorderedList>
                                }
                            />
                            <Steps.Item
                                title="Q4/2022"
                                description={
                                    <UnorderedList>
                                        <ListItem>Hire more employees</ListItem>
                                        <ListItem>Marketing</ListItem>
                                        <ListItem>
                                            Release the dWork token for
                                            governance, use as a currency for
                                            internal payment
                                        </ListItem>
                                        <ListItem>
                                            Allow swapping on Defi protocol
                                        </ListItem>
                                    </UnorderedList>
                                }
                            />
                        </Steps>
                    </Box>
                </Box>
                {/* <Box pt="150px" pb="200px">
                    <Box>
                        <Text
                            fontSize="38px"
                            fontWeight="500"
                            textAlign="center"
                            mb="30px"
                        >
                            THE TEAM
                        </Text>
                    </Box>
                    <Grid
                        templateColumns="repeat(4, 1fr)"
                        gap={10}
                        h="100%"
                        maxW="1200px"
                        margin="auto"
                        mb="50px"
                        padding="50px 15px"
                        textAlign="center"
                    >
                        <GridItem colSpan={{ base: 2, md: 1 }}>
                            <VStack>
                                <Box
                                    w="150px"
                                    h="150px"
                                    bg="blackAlpha.600"
                                    borderRadius="full"
                                />
                                <Text fontSize="22px" fontWeight="600">
                                    Eleanor Pena
                                </Text>
                                <Text
                                    fontSize="18px"
                                    fontWeight={300}
                                    opacity={0.5}
                                >
                                    Education
                                </Text>
                            </VStack>
                        </GridItem>
                        <GridItem colSpan={{ base: 2, md: 1 }}>
                            <VStack>
                                <Box
                                    w="150px"
                                    h="150px"
                                    bg="blackAlpha.600"
                                    borderRadius="full"
                                />
                                <Text fontSize="22px" fontWeight="600">
                                    Jane Cooper
                                </Text>
                                <Text
                                    fontSize="18px"
                                    fontWeight={300}
                                    opacity={0.5}
                                >
                                    Transportation
                                </Text>
                            </VStack>
                        </GridItem>
                        <GridItem colSpan={{ base: 2, md: 1 }}>
                            <VStack>
                                <Box
                                    w="150px"
                                    h="150px"
                                    bg="blackAlpha.600"
                                    borderRadius="full"
                                />
                                <Text fontSize="22px" fontWeight="600">
                                    Robert Fox
                                </Text>
                                <Text
                                    fontSize="18px"
                                    fontWeight={300}
                                    opacity={0.5}
                                >
                                    Real Estate
                                </Text>
                            </VStack>
                        </GridItem>
                        <GridItem colSpan={{ base: 2, md: 1 }}>
                            <VStack>
                                <Box
                                    w="150px"
                                    h="150px"
                                    bg="blackAlpha.600"
                                    borderRadius="full"
                                />
                                <Text fontSize="22px" fontWeight="600">
                                    Ronald Richards
                                </Text>
                                <Text
                                    fontSize="18px"
                                    fontWeight={300}
                                    opacity={0.5}
                                >
                                    Vehicle Sellers
                                </Text>
                            </VStack>
                        </GridItem>
                    </Grid>
                </Box> */}
            </Layout>
        </>
    );
}
