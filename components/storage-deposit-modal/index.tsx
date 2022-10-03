import {
  AlertDescription,
  AlertIcon,
  AlertTitle,
  ModalFooter,
  Alert,
  Button,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import { useStorageDepositModal } from '../../hooks';

export const StorageDepositModal = () => {
  const {
    storageDepositModalState: { isOpen, storageDepositState },
    storageDepositModalMethods: { onClose, storageDepositMethods },
  } = useStorageDepositModal();

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Confirm</ModalHeader>
        <ModalCloseButton _focus={{ boxShadow: 'none' }} />
        <ModalBody>
          <Alert
            status="info"
            variant="subtle"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            height="200px"
            borderRadius="8px"
            bg="transparent"
          >
            <AlertIcon boxSize="40px" mr={0} />
            <AlertTitle mt={4} mb={1} fontSize="lg">
              Add storage balance to be able to interact with this dapp
            </AlertTitle>
            <AlertDescription maxWidth="sm" mb="15px"></AlertDescription>
          </Alert>
        </ModalBody>
        <ModalFooter>
          <HStack>
            <Button
              variant="primary"
              size="sm"
              isLoading={storageDepositState.isLoading}
              onClick={storageDepositMethods.deposit}
              padding="8px 16px"
            >
              Continue
            </Button>
            <Button
              borderColor="#333"
              variant="secondary"
              size="sm"
              onClick={onClose}
              padding="8px 16px"
            >
              Cancel
            </Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
