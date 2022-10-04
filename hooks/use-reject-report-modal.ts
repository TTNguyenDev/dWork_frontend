import { useDisclosure, useToast } from '@chakra-ui/react';
import { useCallback, useEffect } from 'react';
import { CurrentReportState } from '../store';
import { ModalUtils } from '../utils';
import { useCurrentReport } from './atoms';
import { useRejectReport } from './use-reject-report';

export const useRejectReportModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const { rejectReportState, rejectReportMethods } = useRejectReport({
    options: {
      onSuccess: () => {
        toast({
          title: 'Reject report successfully',
          status: 'success',
          position: 'top',
        });
        onClose();
      },
      onError: () => {
        toast({
          title: 'Reject report failed',
          status: 'error',
          position: 'top',
        });
      },
    },
  });
  const { currentReportState } = useCurrentReport();

  const handleOpen = useCallback((payload: CurrentReportState) => {
    currentReportState.merge(payload);
    onOpen();
  }, []);

  const handleClose = useCallback(() => {
    currentReportState.merge({ reportId: '' });
    onClose();
  }, []);

  useEffect(() => {
    ModalUtils.rejectReport.onOpen = handleOpen;
    ModalUtils.rejectReport.onClose = handleClose;
  }, []);

  return {
    rejectReportModalState: {
      isOpen,
      rejectReportState,
      currentReportState,
    },
    rejectReportModalMethods: {
      onOpen: handleOpen,
      onClose: handleClose,
      rejectReportMethods,
    },
  };
};
