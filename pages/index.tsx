import React from 'react';
import Header from 'next/head';
import { Layout } from '../components/layout';
import classes from './index.module.less';
import { Button, Col, Container, FlexboxGrid, Steps } from 'rsuite';
import createTaskLogo from '../assets/logos/create-task.png';
import makeMoneyLogo from '../assets/logos/make-money.png';
import { useHomePage } from '../hooks/useHomePage';
import { Loader } from '../components/loader';
import { ListTasks } from '../components/listTasks';
import { TaskFilter } from '../components/tasksFilter';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
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
import LogoLNC from '../assets/logos/lnc-b.svg';
import LogoNearFoundation from '../assets/logos/near-foundation.svg';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
    const {
        authLoading,
        logged,
        createTaskBtnLoading,
        makeMoneyBtnLoading,
        handleCreateTaskBtnClick,
        handleMakeMoneyBtnClick,
        jobs,
        listJobsLoading,
        profileLoading,
        profileInfo,
        fetchNextPage,
        isFetchingNextPage,
        hasNextPage,
        filter,
        setTaskFilter,
        applyTaskFilter,
    } = useHomePage();

    const app = useSelector((state: RootState) => state.app);

    return (
        <>
            <Header>
                <title>Home</title>
            </Header>
            <Layout activeKey="landing_page">
                <Box pt="200px" pb="300px">
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
                        <GridItem colSpan={{ base: 2, md: 1 }}></GridItem>
                    </Grid>
                </Box>
                <Box pt="200px" pb="300px">
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
                <Box pt="200px" pb="300px">
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
                                    <Text fontSize="24px" fontWeight={300}>
                                        We’ve seen recently that centralized
                                        platforms designed to “democratise
                                        finance” just can’t be trusted - as
                                        Robinhood’s response to the trading of
                                        GME on their platform demonstrated.
                                    </Text>
                                </Box>
                            </Center>
                        </GridItem>
                        <GridItem colSpan={{ base: 2, md: 1 }}>
                            <Center h="100%">
                                <Text
                                    background="linear-gradient(to right, #1371a9 0%, #7713db 100%)"
                                    backgroundClip="text"
                                    fontSize="48px"
                                    fontWeight="500"
                                >
                                    ICON
                                </Text>
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
                                <Text
                                    background="linear-gradient(to right, #1371a9 0%, #7713db 100%)"
                                    backgroundClip="text"
                                    fontSize="48px"
                                    fontWeight="500"
                                >
                                    ICON
                                </Text>
                            </Center>
                        </GridItem>
                        <GridItem colSpan={{ base: 2, md: 1 }}>
                            <Center h="100%">
                                <Box>
                                    <Text fontSize="24px" fontWeight={300}>
                                        We’ve seen recently that centralized
                                        platforms designed to “democratise
                                        finance” just can’t be trusted - as
                                        Robinhood’s response to the trading of
                                        GME on their platform demonstrated.
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
                                    <Text fontSize="24px" fontWeight={300}>
                                        We’ve seen recently that centralized
                                        platforms designed to “democratise
                                        finance” just can’t be trusted - as
                                        Robinhood’s response to the trading of
                                        GME on their platform demonstrated.
                                    </Text>
                                </Box>
                            </Center>
                        </GridItem>
                        <GridItem colSpan={{ base: 2, md: 1 }}>
                            <Center h="100%">
                                <Text
                                    background="linear-gradient(to right, #1371a9 0%, #7713db 100%)"
                                    backgroundClip="text"
                                    fontSize="48px"
                                    fontWeight="500"
                                >
                                    ICON
                                </Text>
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
                                <Text
                                    background="linear-gradient(to right, #1371a9 0%, #7713db 100%)"
                                    backgroundClip="text"
                                    fontSize="48px"
                                    fontWeight="500"
                                >
                                    ICON
                                </Text>
                            </Center>
                        </GridItem>
                        <GridItem colSpan={{ base: 2, md: 1 }}>
                            <Center h="100%">
                                <Box>
                                    <Text fontSize="24px" fontWeight={300}>
                                        We’ve seen recently that centralized
                                        platforms designed to “democratise
                                        finance” just can’t be trusted - as
                                        Robinhood’s response to the trading of
                                        GME on their platform demonstrated.
                                    </Text>
                                </Box>
                            </Center>
                        </GridItem>
                    </Grid>
                </Box>
                <Box pt="200px" pb="300px">
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
                    <Box p="0 15px" display={{ base: 'none', md: 'block' }}>
                        <Steps current={0}>
                            <Steps.Item
                                title="Q2/2022"
                                description="This is a description."
                            />
                            <Steps.Item
                                title="Q3/2022"
                                description="This is a description."
                            />
                            <Steps.Item
                                title="Q4/2022"
                                description="This is a description."
                            />
                            <Steps.Item
                                title="Q1/2023"
                                description="This is a description."
                            />
                        </Steps>
                    </Box>
                    <Box p="0 15px" display={{ base: 'block', md: 'none' }}>
                        <Steps current={0} vertical>
                            <Steps.Item
                                title="Q2/2022"
                                description="This is a description."
                            />
                            <Steps.Item
                                title="Q3/2022"
                                description="This is a description."
                            />
                            <Steps.Item
                                title="Q4/2022"
                                description="This is a description."
                            />
                            <Steps.Item
                                title="Q1/2023"
                                description="This is a description."
                            />
                        </Steps>
                    </Box>
                </Box>
                <Box pt="200px" pb="300px">
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
                </Box>
            </Layout>
        </>
    );
}
