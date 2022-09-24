import { Avatar, Box, HStack, Text } from '@chakra-ui/react';
import { useHeader, useUserHeader } from '../../hooks';
import { Container } from '../../core';

export const UserHeader = () => {
  const { userHeaderState, userHeaderMethods } = useUserHeader();

  return (
    <Box>
      <HStack
        p="4px"
        pr="10px"
        borderRadius="3xl"
        borderWidth="2px"
        borderColor="#353945"
        cursor="pointer"
        alignItems="center"
        transitionDuration="0.2"
        _hover={{
          borderColor: '#9B51E0',
        }}
      >
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
    </Box>
  );
};
