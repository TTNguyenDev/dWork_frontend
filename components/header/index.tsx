import { Box, Button, Flex, HStack } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useBlockchain } from '../../core/hooks';

export const Header = () => {
  const { blockchainState, blockchainMethods } = useBlockchain();

  useEffect(() => {
    blockchainMethods.connect();
  }, []);

  return (
    <Flex justifyContent="space-between">
      <Box>dWork</Box>
      <Box>
        {blockchainState.wallet.logged.get() ? (
          <Box>Logged</Box>
        ) : (
          <Button
            isLoading={
              blockchainState.loading.get() ||
              blockchainState.wallet.loading.get()
            }
            onClick={() => blockchainMethods.signIn()}
          >
            Connect to Wallet
          </Button>
        )}
      </Box>
    </Flex>
  );
};
