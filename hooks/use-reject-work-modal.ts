import { useDisclosure, useToast } from '@chakra-ui/react';
import { useCallback, useEffect } from 'react';
import { CurrentProposalState } from '../store';
import { ModalUtils } from '../utils';
import { useCurrentProposal } from './atoms';
import { useRejectWork } from './use-reject-work';

export const useRejectWorkModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const { currentProposalState } = useCurrentProposal();
  const { rejectWorkState, rejectWorkMethods } = useRejectWork({
    options: {
      onSuccess: () => {
        toast({
          title: 'Reject proposal successfully',
          status: 'success',
          position: 'top',
        });
        onClose();
      },
      onError: () => {
        toast({
          title: 'Reject proposal failed',
          status: 'error',
          position: 'top',
        });
      },
    },
  });

  const handleOpen = useCallback((payload: CurrentProposalState) => {
    currentProposalState.merge(payload);
    onOpen();
  }, []);

  const handleClose = useCallback(() => {
    currentProposalState.merge({ taskId: '', workerId: '' });
    onClose();
  }, []);

  useEffect(() => {
    ModalUtils.rejectWork.onOpen = handleOpen;
    ModalUtils.rejectWork.onClose = handleClose;
  }, []);

  return {
    rejectWorkModalState: { isOpen, rejectWorkState, currentProposalState },
    rejectWorkModalMethods: {
      onOpen: handleOpen,
      onClose: handleClose,
      rejectWorkMethods,
    },
  };
};
