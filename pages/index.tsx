import {
  AspectRatio,
  Box,
  Button,
  Center,
  Grid,
  GridItem,
  HStack,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
  VStack,
} from '@chakra-ui/react';
import Head from 'next/head';
import { ReactElement } from 'react';
import ReactPlayer from 'react-player';
import { MainLayout } from '../layouts';
import { NextPageWithLayout } from './_app';
import { IoIosRocket, IoIosCreate } from 'react-icons/io';
import { BsCurrencyDollar } from 'react-icons/bs';
import { GiStarShuriken } from 'react-icons/gi';
import { RiUserStarLine } from 'react-icons/ri';
import ourPartnersImg from '../assets/our-partners.png';
import lncBrandImg from '../assets/lnc-brand.svg';
import nearFoundationImg from '../assets/near-foundation-brand.svg';
import { useHomepage } from '../hooks';

const HomePage: NextPageWithLayout = () => {
  const {
    homepageState: { modalDemoVideoIsOpen },
    homepageMethods: {
      btnLaunchAppOnClick,
      demoVideoOnClick,
      modalDemoVideoOnClose,
    },
  } = useHomepage();

  return (
    <>
      <Head>
        <title>Homepage - dWork</title>
        <meta name="description" content="dWork" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box h="50px" />
      <Box maxW="1200px" margin="auto" p="0 15px" position="relative">
        <Box
          position="absolute"
          width="700px"
          height="700px"
          top="-50%"
          right="-20%"
          opacity="0.4"
          background="linear-gradient(75.96deg, #FFC83A 13.64%, #FF008A 46.53%, #6100FF 78.88%)"
          filter="blur(60px)"
          borderRadius="full"
        />
        <Grid templateColumns="repeat(2, 1fr)" gap="20px">
          <GridItem zIndex="banner" colSpan={{ base: 2, md: 1 }}>
            <VStack
              alignItems="start"
              spacing="40px"
              maxW={{ base: 'auto', md: '400px' }}
            >
              <Text fontSize="48px" fontWeight="700">
                Earn
                <Text
                  as="span"
                  background="linear-gradient(#FDAE8F, #FD1C68)"
                  backgroundClip="text"
                >
                  &nbsp;Crypto&nbsp;
                </Text>
                by completing small tasks.
              </Text>
              <Text fontSize="20px" fontWeight="400">
                Decentralized platform allows users to hire and find jobs here.
                The system ensures the salary for developers as well as
                transparent proof of work to the job owners.
              </Text>
              <Button
                variant="primary"
                leftIcon={<IoIosRocket size="25" />}
                fontSize="20px"
                padding="35px 50px"
                width={{ base: '100%', md: 'auto' }}
                onClick={btnLaunchAppOnClick}
              >
                Launch App
              </Button>
            </VStack>
          </GridItem>
          <GridItem zIndex="banner" colSpan={{ base: 2, md: 1 }}>
            <Center h="100%">
              <AspectRatio
                ratio={16 / 9}
                w="100%"
                borderRadius="md"
                borderWidth="0.7px"
                borderColor="#9B51E0"
                padding="30px 20px"
                cursor="pointer"
                overflow="hidden"
                onClick={demoVideoOnClick}
              >
                <Box pointerEvents="none" position="relative">
                  <HStack position="absolute" top="10px">
                    <Box w="12px" h="12px" borderRadius="full" bg="#FC1F6F" />
                    <Box w="12px" h="12px" borderRadius="full" bg="#FFCC18" />
                    <Box w="12px" h="12px" borderRadius="full" bg="#1DF359" />
                  </HStack>
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
              onClose={modalDemoVideoOnClose}
              isOpen={modalDemoVideoIsOpen}
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
                    <AspectRatio w="100%" ratio={16 / 9}>
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
      <Box h="150px" />
      <Box maxW="1400px" margin="auto" p="0 15px">
        <Grid
          templateColumns="repeat(4, 1fr)"
          gap="20px"
          padding="50px 0"
          borderRadius="xl"
          bg="linear-gradient(93.51deg, #9B51E0 2.84%, #3081ED 99.18%)"
          overflow="hidden"
        >
          <GridItem zIndex="banner" colSpan={{ base: 2, md: 1 }}>
            <Box textAlign="center">
              <Text fontSize="36px" fontWeight="600">
                10000+
              </Text>
              <Text fontSize="16px" fontWeight="500">
                Registered users
              </Text>
            </Box>
          </GridItem>
          <GridItem zIndex="banner" colSpan={{ base: 2, md: 1 }}>
            <Box textAlign="center">
              <Text fontSize="36px" fontWeight="600">
                1280+
              </Text>
              <Text fontSize="16px" fontWeight="500">
                Created tasks
              </Text>
            </Box>
          </GridItem>
          <GridItem zIndex="banner" colSpan={{ base: 2, md: 1 }}>
            <Box textAlign="center">
              <Text fontSize="36px" fontWeight="600">
                500+
              </Text>
              <Text fontSize="16px" fontWeight="500">
                Solved tasks
              </Text>
            </Box>
          </GridItem>
          <GridItem zIndex="banner" colSpan={{ base: 2, md: 1 }}>
            <Box textAlign="center">
              <Text fontSize="36px" fontWeight="600">
                5000$+
              </Text>
              <Text fontSize="16px" fontWeight="500">
                Paid money
              </Text>
            </Box>
          </GridItem>
        </Grid>
      </Box>
      <Box h="150px" />
      <Box maxW="1600px" margin="auto" p="0 15px" position="relative">
        <Box
          position="absolute"
          width="700px"
          height="700px"
          top="-20%"
          left="-20%"
          opacity="0.4"
          background="linear-gradient(75.96deg, #FFC83A 13.64%, #FF008A 46.53%, #6100FF 78.88%)"
          filter="blur(60px)"
          borderRadius="full"
        />
        <Grid templateColumns="repeat(4, 1fr)" gap="20px" padding="50px 0">
          <GridItem zIndex="banner" colSpan={4} mb="80px">
            <Text fontSize="36px" fontWeight="600" textAlign="center">
              WHY PEOPLE
              <Text
                as="span"
                bg="linear-gradient(93.51deg, #9B51E0 2.84%, #3081ED 99.18%)"
                bgClip="text"
              >
                &nbsp;CHOOSE&nbsp;
              </Text>
              US
            </Text>
          </GridItem>
          <GridItem zIndex="banner" colSpan={{ base: 4, md: 2, lg: 1 }}>
            <Box
              h="100%"
              padding="60px"
              borderWidth="1px"
              borderColor="#9B51E0"
              borderRadius="xl"
              position="relative"
            >
              <Center
                w="95px"
                h="95px"
                borderRadius="full"
                bg="linear-gradient(93.51deg, #9B51E0 2.84%, #3081ED 99.18%)"
                position="absolute"
                top="-50px"
                left="50%"
                transform="translateX(-50%)"
              >
                <IoIosCreate size="40px" />
              </Center>
              <Text
                fontSize="24px"
                fontWeight="500"
                textAlign="center"
                mb="20px"
              >
                Easy to post jobs
              </Text>
              <Text fontSize="16px" fontWeight="500">
                Post a job and hire a pro. We are solving your problem with
                pro-workers worldwide—no services fee for now. GME on their
                platform demonstrated.
              </Text>
            </Box>
          </GridItem>
          <GridItem zIndex="banner" colSpan={{ base: 4, md: 2, lg: 1 }}>
            <Box
              h="100%"
              padding="60px"
              borderWidth="1px"
              borderColor="#9B51E0"
              borderRadius="xl"
              position="relative"
            >
              <Center
                w="95px"
                h="95px"
                borderRadius="full"
                bg="linear-gradient(93.51deg, #9B51E0 2.84%, #3081ED 99.18%)"
                position="absolute"
                top="-50px"
                left="50%"
                transform="translateX(-50%)"
              >
                <BsCurrencyDollar size="40px" />
              </Center>
              <Text
                fontSize="24px"
                fontWeight="500"
                textAlign="center"
                mb="20px"
              >
                Earn Crypto
              </Text>
              <Text fontSize="16px" fontWeight="500">
                Make money by solving problems. As a worker, we can ensure your
                pay with smart-contract.
              </Text>
            </Box>
          </GridItem>
          <GridItem zIndex="banner" colSpan={{ base: 4, md: 2, lg: 1 }}>
            <Box
              h="100%"
              padding="60px"
              borderWidth="1px"
              borderColor="#9B51E0"
              borderRadius="xl"
              position="relative"
            >
              <Center
                w="95px"
                h="95px"
                borderRadius="full"
                bg="linear-gradient(93.51deg, #9B51E0 2.84%, #3081ED 99.18%)"
                position="absolute"
                top="-50px"
                left="50%"
                transform="translateX(-50%)"
              >
                <GiStarShuriken size="40px" />
              </Center>
              <Text
                fontSize="24px"
                fontWeight="500"
                textAlign="center"
                mb="20px"
              >
                Completely Decentralized
              </Text>
              <Text fontSize="16px" fontWeight="500">
                {`dWork is decentralized on the NEAR Blockchain - A 3rd generation
                blockchain with a meager network fee. Tasks and worker’s proof
                are stored on NEAR Blockchain and IPFS. Your money will be
                controlled with this protocol. We protect everyone's benefit.`}
              </Text>
            </Box>
          </GridItem>
          <GridItem zIndex="banner" colSpan={{ base: 4, md: 2, lg: 1 }}>
            <Box
              h="100%"
              padding="60px"
              borderWidth="1px"
              borderColor="#9B51E0"
              borderRadius="xl"
              position="relative"
            >
              <Center
                w="95px"
                h="95px"
                borderRadius="full"
                bg="linear-gradient(93.51deg, #9B51E0 2.84%, #3081ED 99.18%)"
                position="absolute"
                top="-50px"
                left="50%"
                transform="translateX(-50%)"
              >
                <RiUserStarLine size="40px" />
              </Center>
              <Text
                fontSize="24px"
                fontWeight="500"
                textAlign="center"
                mb="20px"
              >
                User Ranking
              </Text>
              <Text fontSize="16px" fontWeight="500">
                User ranking and penalty to someone trying to cheat or spam
                dWork protocol.
              </Text>
            </Box>
          </GridItem>
        </Grid>
      </Box>
      <Box h="150px" />
      <Box maxW="1600px" margin="auto" p="0 15px">
        <Grid templateColumns="repeat(2, 1fr)" gap="20px" padding="50px 0">
          <GridItem zIndex="banner" colSpan={2} mb="80px">
            <Text fontSize="36px" fontWeight="600" textAlign="center">
              EARLY
              <Text
                as="span"
                bg="linear-gradient(93.51deg, #9B51E0 2.84%, #3081ED 99.18%)"
                bgClip="text"
              >
                &nbsp;SUPPORTERS
              </Text>
            </Text>
          </GridItem>
          <GridItem zIndex="banner" colSpan={{ base: 2, md: 1 }}>
            <Image src={ourPartnersImg.src} alt="Out partners image" />
          </GridItem>
          <GridItem zIndex="banner" colSpan={{ base: 2, md: 1 }}>
            <VStack h="100%" justifyContent="center">
              <Image
                src={nearFoundationImg.src}
                alt="Near foundation brand"
                w="250px"
                mb="150px"
              />
              <Image src={lncBrandImg.src} alt="LNC brand" w="500px" />
            </VStack>
          </GridItem>
        </Grid>
      </Box>
      {/* <Box h="150px" />
      <Box maxW="1600px" margin="auto" p="0 15px">
        <Grid templateColumns="repeat(2, 1fr)" gap="20px" padding="50px 0">
          <GridItem colSpan={2} mb="80px">
            <Text fontSize="36px" fontWeight="600" textAlign="center">
              WHAT
              <Text
                as="span"
                bg="linear-gradient(93.51deg, #9B51E0 2.84%, #3081ED 99.18%)"
                bgClip="text"
              >
                &nbsp;PEOPLE TALKING&nbsp;
              </Text>
              ABOUT US
            </Text>
          </GridItem>
          <GridItem zIndex="banner"></GridItem>
        </Grid>
      </Box> */}
      <Box h="150px" />
    </>
  );
};

HomePage.getLayout = (page: ReactElement) => {
  return <MainLayout>{page}</MainLayout>;
};

export default HomePage;
