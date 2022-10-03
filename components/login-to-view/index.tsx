import { Button, Center, Text, VStack } from '@chakra-ui/react';
import { useBlockchain, useWallet } from '../../core/hooks';

export const LoginToView = ({ message }: { message?: string }) => {
  const { blockchainMethods } = useBlockchain();
  const { wallet } = useWallet();

  return !wallet.logged ? (
    <Center borderStyle="dotted" borderWidth="2px" p="20px" borderRadius="2xl">
      <VStack spacing="20px">
        <Text fontSize="20px">{message ?? 'Login and earn more NEAR'}</Text>
        <Button onClick={blockchainMethods.signIn}>LOGIN NOW</Button>
      </VStack>
    </Center>
  ) : null;
};
