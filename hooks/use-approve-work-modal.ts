import { useDisclosure, useToast } from '@chakra-ui/react';
import { useCallback, useEffect } from 'react';
import { CurrentProposalState } from '../store';
import { ModalUtils } from '../utils';
import { useCurrentProposal } from './atoms';
import { useApproveWork } from './use-approve-work';

export const useApproveWorkModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const { approveWorkState, approveWorkMethods } = useApproveWork({
    options: {
      onSuccess: () => {
        toast({
          title: 'Approve proposal successfully',
          status: 'success',
          position: 'top',
        });
        onClose();
      },
      onError: () => {
        toast({
          title: 'Approve proposal failed',
          status: 'error',
          position: 'top',
        });
      },
    },
  });
  const { currentProposalState } = useCurrentProposal();

  const handleOpen = useCallback((payload: CurrentProposalState) => {
    currentProposalState.merge(payload);
    onOpen();
  }, []);

  const handleClose = useCallback(() => {
    currentProposalState.merge({ taskId: '', workerId: '' });
    onClose();
  }, []);

  useEffect(() => {
    ModalUtils.approveWork.onOpen = handleOpen;
    ModalUtils.approveWork.onClose = handleClose;
  }, []);

  return {
    approveWorkModalState: { isOpen, approveWorkState, currentProposalState },
    approveWorkModalMethods: {
      onOpen: handleOpen,
      onClose: handleClose,
      approveWorkMethods,
    },
  };
};
