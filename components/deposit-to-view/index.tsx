import { Button, Center, Text, VStack } from '@chakra-ui/react';
import { useWallet } from '../../core/hooks';
import { useIsRegistered, useStorageDeposit } from '../../hooks';
import { ModalUtils } from '../../utils';

export const DepositToView = ({ message }: { message?: string }) => {
  const { wallet } = useWallet();
  const { isRegistered } = useIsRegistered();

  return wallet.logged && !isRegistered ? (
    <Center borderStyle="dotted" borderWidth="2px" p="20px" borderRadius="2xl">
      <VStack spacing="20px">
        <Text fontSize="20px">
          {message ??
            'Deposit from just 0.2 NEAR to join the job and earn more NEAR'}
        </Text>
        <Button onClick={ModalUtils.storageDeposit.onOpen}>DEPOSIT</Button>
      </VStack>
    </Center>
  ) : null;
};
