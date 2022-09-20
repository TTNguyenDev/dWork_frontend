import { Box, Button, Flex, HStack } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useBlockchain } from '../../core/hooks';
import { useHeader } from '../../hooks';

export const Header = () => {
  const { headerState, headerMethods } = useHeader();

  return (
    <Flex justifyContent="space-between">
      <Box>dWork</Box>
      <Box>
        {headerState.logged ? (
          <Box>
            <Box>Logged</Box>
            <Button
              isLoading={headerState.loading}
              onClick={() => headerMethods.signOut()}
            >
              Logout
            </Button>
          </Box>
        ) : (
          <Button
            isLoading={headerState.loading}
            onClick={() => headerMethods.signIn()}
          >
            Connect to Wallet
          </Button>
        )}
      </Box>
    </Flex>
  );
};
