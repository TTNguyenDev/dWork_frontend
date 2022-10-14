import {
  Flex,
  HStack,
  Button,
  Text,
  Box,
  Image,
  Center,
  Grid,
  GridItem,
  Heading,
  VStack,
} from '@chakra-ui/react';
import { BsDiscord, BsTelegram, BsTwitter, BsYoutube } from 'react-icons/bs';
import logoImg from '../../assets/dwork-logo.svg';
import logoLncImg from '../../assets/lnc-logo.svg';

export const Footer = () => {
  return (
    // <Flex justifyContent="space-between" maxW="1200px" margin="auto" p="20px">
    //   <Box>
    //     <HStack spacing="20px">
    //       <Image src={logoImg.src} alt="Logo dWork" />
    //       <Text fontSize="32px" fontWeight="700" color="white">
    //         dWork
    //       </Text>
    //     </HStack>
    //   </Box>
    //   <HStack spacing="30px">
    //     <Text fontSize="16px" fontWeight="700" color="white">
    //       Explore
    //     </Text>
    //     <Text fontSize="16px" fontWeight="700" color="white">
    //       How it work
    //     </Text>
    //   </HStack>
    // </Flex>

    <Box position="relative" overflowX="clip">
      {/* <Box
        position="absolute"
        width="700px"
        height="700px"
        top="-200%"
        right="-20%"
        opacity="0.4"
        background="linear-gradient(75.96deg, #FFC83A 13.64%, #FF008A 46.53%, #6100FF 78.88%)"
        filter="blur(60px)"
        borderRadius="full"
      /> */}
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
              <VStack spacing="40px">
                <HStack spacing="20px">
                  <Image src={logoImg.src} alt="Logo dWork" />
                  <Flex>
                    <Text
                      fontSize="32px"
                      fontWeight="700"
                      color="white"
                      whiteSpace="nowrap"
                    >
                      dWork
                    </Text>
                  </Flex>
                </HStack>
                <HStack
                  spacing="40px"
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
              <VStack
                alignItems="start"
                spacing="20px"
                fontSize="14px"
                fontWeight="700"
              >
                <Heading
                  as="h5"
                  fontSize="20px"
                  fontWeight="400"
                  mb="10px"
                  color="white"
                >
                  Learn
                </Heading>
                <Text color="#8393AF">Source code</Text>
                <Text color="#8393AF">API document</Text>
              </VStack>
            </Center>
          </GridItem>
          <GridItem colSpan={{ base: 2, md: 1 }}>
            <Center h="100%">
              <VStack
                alignItems="start"
                spacing="20px"
                fontSize="14px"
                fontWeight="700"
                color="#8393AF"
              >
                <Heading
                  as="h5"
                  fontSize="20px"
                  fontWeight="400"
                  mb="10px"
                  color="white"
                >
                  Community
                </Heading>
                <Text color="#8393AF">Join Discord</Text>
                <Text color="#8393AF">Join Telegram</Text>
              </VStack>
            </Center>
          </GridItem>
        </Grid>
        <HStack justifyContent="center">
          <Text fontSize="14px" fontWeight="700" color="#8393AF">
            dWork | Project from LNC Barrel | Powered by NEAR
          </Text>
        </HStack>
      </Box>
    </Box>
  );
};
