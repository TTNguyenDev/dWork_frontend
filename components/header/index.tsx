import {
  Box,
  Button,
  Center,
  Flex,
  HStack,
  Image,
  Spinner,
  Text,
} from '@chakra-ui/react';
import { useHeader } from '../../hooks';
import logoImg from '../../assets/dwork-logo.svg';
import logoLncImg from '../../assets/lnc-logo.svg';
import { BsPlusLg } from 'react-icons/bs';
import { Container } from '../../core';
import { UserHeader } from '../user-header';

export const Header = () => {
  const { headerState, headerMethods } = useHeader();

  return (
    <Box
      bg="blackAlpha.700"
      position="sticky"
      top="0"
      zIndex="sticky"
      backdropFilter="auto"
      backdropBlur="50px"
    >
      <Flex justifyContent="space-between" maxW="1200px" margin="auto" p="20px">
        <Box>
          <HStack spacing="20px">
            <Image src={logoImg.src} alt="Logo dWork" />
            <Flex>
              <Text fontSize="32px" fontWeight="700" color="white">
                dWork | &nbsp;
              </Text>
              <Image src={logoLncImg.src} alt="Logo LNC" w="60px" />
            </Flex>
          </HStack>
        </Box>
        <HStack spacing="30px">
          <Text fontSize="16px" fontWeight="700" color="white">
            Explore
          </Text>
          <Text fontSize="16px" fontWeight="700" color="white">
            How it work
          </Text>
          {headerState.blockchainLoading ||
          (headerState.logged && headerState.walletLoading) ? (
            <Center w="100px">
              <Spinner />
            </Center>
          ) : headerState.logged ? (
            <Box>
              <UserHeader />
            </Box>
          ) : (
            <Button
              variant="connectWallet"
              leftIcon={<BsPlusLg />}
              isLoading={headerState.walletLoading}
              onClick={() => headerMethods.signIn()}
            >
              Connect Wallet
            </Button>
          )}
        </HStack>
      </Flex>
    </Box>
  );
};
