import { useDisclosure, useToast } from '@chakra-ui/react';
import { useCallback, useEffect } from 'react';
import { CurrentReportState } from '../store';
import { ModalUtils } from '../utils';
import { useCurrentReport } from './atoms';
import { useApproveReport } from './use-approve-report';

export const useApproveReportModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const { approveReportState, approveReportMethods } = useApproveReport({
    options: {
      onSuccess: () => {
        toast({
          title: 'Approve report successfully',
          status: 'success',
          position: 'top',
        });
        onClose();
      },
      onError: () => {
        toast({
          title: 'Approve report failed',
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
    ModalUtils.approveReport.onOpen = handleOpen;
    ModalUtils.approveReport.onClose = handleClose;
  }, []);

  return {
    approveReportModalState: {
      isOpen,
      approveReportState,
      currentReportState,
    },
    approveReportModalMethods: {
      onOpen: handleOpen,
      onClose: handleClose,
      approveReportMethods,
    },
  };
};
