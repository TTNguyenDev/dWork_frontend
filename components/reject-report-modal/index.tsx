import {
  ModalFooter,
  Button,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';
import { useRejectReportModal } from '../../hooks';

export const RejectReportModal = () => {
  const {
    rejectReportModalState: { isOpen, rejectReportState, currentReportState },
    rejectReportModalMethods: { onClose, rejectReportMethods },
  } = useRejectReportModal();

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      closeOnOverlayClick={!rejectReportState.isLoading}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Confirm</ModalHeader>
        <ModalCloseButton
          _focus={{ boxShadow: 'none' }}
          isDisabled={rejectReportState.isLoading}
        />
        <ModalBody>
          <Text fontSize="16px">{`Reject the report ${currentReportState.reportId.value}`}</Text>
        </ModalBody>
        <ModalFooter>
          <HStack>
            <Button
              variant="primary"
              size="sm"
              isLoading={rejectReportState.isLoading}
              onClick={rejectReportMethods.submit}
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
              isDisabled={rejectReportState.isLoading}
            >
              CANCEL
            </Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
