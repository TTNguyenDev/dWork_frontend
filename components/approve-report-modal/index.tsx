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
import { useApproveReportModal } from '../../hooks';

export const ApproveReportModal = () => {
  const {
    approveReportModalState: { isOpen, approveReportState, currentReportState },
    approveReportModalMethods: { onClose, approveReportMethods },
  } = useApproveReportModal();

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      closeOnOverlayClick={!approveReportState.isLoading}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Confirm</ModalHeader>
        <ModalCloseButton
          _focus={{ boxShadow: 'none' }}
          isDisabled={approveReportState.isLoading}
        />
        <ModalBody>
          <Text fontSize="16px">{`Approve the report ${currentReportState.reportId.value}`}</Text>
        </ModalBody>
        <ModalFooter>
          <HStack>
            <Button
              variant="primary"
              size="sm"
              isLoading={approveReportState.isLoading}
              onClick={approveReportMethods.submit}
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
              isDisabled={approveReportState.isLoading}
            >
              CANCEL
            </Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
