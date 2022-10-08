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
import { UserHeader } from '../user-header';
import { useWindowScroll } from 'react-use';
import { useMemo } from 'react';
import Link from 'next/link';

export const Header = () => {
  const { headerState, headerMethods } = useHeader();
  const { y } = useWindowScroll();

  const styles = useMemo(() => {
    if (y > 80)
      return {
        bg: 'rgba(3, 8, 18, 0.7)',
        backdropFilter: 'auto',
        backdropBlur: '50px',
      };
  }, [y]);

  return (
    <Box
      position="sticky"
      top="0"
      zIndex="overlay"
      transition="all"
      transitionDuration="0.15s"
      {...styles}
    >
      <Flex justifyContent="space-between" maxW="1200px" margin="auto" p="20px">
        <Box onClick={headerMethods.brandOnClick} cursor="pointer">
          <HStack spacing="20px">
            <Image src={logoImg.src} alt="Logo dWork" />
            <Flex display={{ base: 'none', sm: 'inherit' }}>
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
        </Box>
        <HStack spacing="30px">
          <HStack spacing="30px" display={{ base: 'none', md: 'flex' }}>
            <Text fontSize="16px" fontWeight="700" color="white">
              <Link href="/explore">Explore</Link>
            </Text>
            <Text fontSize="16px" fontWeight="700" color="white">
              How it work
            </Text>
          </HStack>
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
