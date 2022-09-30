import { useDisclosure } from '@chakra-ui/react';
import { useEffect } from 'react';
import { ModalUtils } from '../utils';
import { useStorageDeposit } from './use-storage-deposit';

export const useStorageDepositModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { storageDepositState, storageDepositMethods } = useStorageDeposit();

  useEffect(() => {
    ModalUtils.storageDeposit.onOpen = onOpen;
    ModalUtils.storageDeposit.onClose = onClose;
  }, []);

  return {
    storageDepositModalState: { isOpen, storageDepositState },
    storageDepositModalMethods: { onOpen, onClose, storageDepositMethods },
  };
};
