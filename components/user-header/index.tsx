import {
  Avatar,
  Box,
  Button,
  Divider,
  HStack,
  Menu,
  MenuButton,
  MenuList,
  Text,
  VStack,
} from '@chakra-ui/react';
import Link from 'next/link';
import { BsPlusLg } from 'react-icons/bs';
import { useUserHeader } from '../../hooks';

export const UserHeader = () => {
  const { userHeaderState, userHeaderMethods } = useUserHeader();

  return (
    <Box>
      <Menu isLazy>
        <MenuButton
          p="4px"
          pr="10px"
          borderRadius="3xl"
          borderWidth="2px"
          borderColor="#353945"
          cursor="pointer"
          alignItems="center"
          transitionDuration="0.2s"
          _hover={{
            borderColor: '#9B51E0',
          }}
          _active={{
            borderColor: '#9B51E0',
          }}
        >
          <HStack>
            <Avatar name={userHeaderState.account?.username} size="sm" />
            <Text fontSize="16px" fontWeight="800">
              {userHeaderState.account?.balance.available}
            </Text>
            <Text
              fontSize="16px"
              fontWeight="800"
              bg="linear-gradient(93.51deg, #9B51E0 2.84%, #3081ED 99.18%)"
              bgClip="text"
            >
              NEAR
            </Text>
          </HStack>
        </MenuButton>
        <MenuList
          border="none"
          bg="#23262f"
          boxShadow="0 16px 64px 0 rgb(31 47 70 / 40%)"
          padding="20px 0 0"
          overflow="hidden"
        >
          <Box p="0 20px" mb="20px">
            <Box mb="20px">
              <Text fontSize="24px" fontWeight="600">
                {userHeaderState.account?.username}
              </Text>
              <Text fontSize="14px" fontWeight="500" color="#aaa">
                @{userHeaderState.account?.id}
              </Text>
            </Box>
            <Button
              leftIcon={<BsPlusLg />}
              variant="primary"
              size="sm"
              w="100%"
              onClick={userHeaderMethods.btnCreateNewTaskOnClick}
            >
              CREATE NEW TASK
            </Button>
          </Box>
          <Divider opacity="0.1" />
          <VStack
            spacing="0"
            alignItems="stretch"
            divider={<Divider opacity="0.5" />}
          >
            <Button
              variant="solid"
              borderRadius="none"
              bg="#23262f"
              onClick={userHeaderMethods.btnProfileOnClick}
            >
              <Text w="100%">My Profile</Text>
            </Button>
            <Button
              variant="solid"
              borderRadius="none"
              bg="#23262f"
              onClick={userHeaderMethods.signOut}
            >
              <Text w="100%">Sign out</Text>
            </Button>
          </VStack>
        </MenuList>
      </Menu>
    </Box>
  );
};
