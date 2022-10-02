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
  Box,
  Text,
} from '@chakra-ui/react';
import { useApproveWorkModal } from '../../hooks';

export const ApproveWorkModal = () => {
  const {
    approveWorkModalState: { isOpen, approveWorkState, currentProposalState },
    approveWorkModalMethods: { onClose, approveWorkMethods },
  } = useApproveWorkModal();

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      closeOnOverlayClick={!approveWorkState.isLoading}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Confirm</ModalHeader>
        <ModalCloseButton
          _focus={{ boxShadow: 'none' }}
          isDisabled={approveWorkState.isLoading}
        />
        <ModalBody>
          <Text fontSize="16px">{`Approve the proof of ${currentProposalState.workerId.value}`}</Text>
        </ModalBody>
        <ModalFooter>
          <HStack>
            <Button
              variant="primary"
              size="sm"
              isLoading={approveWorkState.isLoading}
              onClick={approveWorkMethods.submit}
              padding="8px 16px"
            >
              SUBMIT
            </Button>
            <Button
              borderColor="#333"
              variant="secondary"
              size="sm"
              onClick={onClose}
              padding="8px 16px"
              isDisabled={approveWorkState.isLoading}
            >
              CANCLE
            </Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
