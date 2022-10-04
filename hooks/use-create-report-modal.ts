import { useDisclosure, useToast } from '@chakra-ui/react';
import { useCallback, useEffect } from 'react';
import { CurrentProposalState } from '../store';
import { ModalUtils } from '../utils';
import { useCurrentProposal } from './atoms';
import { useCreateReport } from './use-create-report';

export const useCreateReportModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const { currentProposalState } = useCurrentProposal();
  const { createReportState, createReportMethods } = useCreateReport({
    options: {
      onSuccess: () => {
        toast({
          title: 'Report successfully',
          status: 'success',
          position: 'top',
        });
        onClose();
      },
      onError: () => {
        toast({
          title: 'Report failed',
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
    currentProposalState.merge({ taskId: '' });
    onClose();
  }, []);

  useEffect(() => {
    ModalUtils.createReport.onOpen = handleOpen;
    ModalUtils.createReport.onClose = handleClose;
  }, []);

  return {
    createReportModalState: { isOpen, createReportState, currentProposalState },
    createReportModalMethods: {
      onOpen: handleOpen,
      onClose: handleClose,
      createReportMethods,
    },
  };
};
