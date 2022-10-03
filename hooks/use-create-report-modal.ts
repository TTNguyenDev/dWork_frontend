import { useDisclosure, useToast } from '@chakra-ui/react';
import { useCallback, useEffect } from 'react';
import { CurrentReportState } from '../store';
import { ModalUtils } from '../utils';
import { useCurrentReport } from './atoms';
import { useCreateReport } from './use-create-report';

export const useCreateReportModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const { currentReportState } = useCurrentReport();
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

  const handleOpen = useCallback((payload: CurrentReportState) => {
    currentReportState.merge(payload);
    onOpen();
  }, []);

  const handleClose = useCallback(() => {
    currentReportState.merge({ taskId: '', reportId: '' });
    onClose();
  }, []);

  useEffect(() => {
    ModalUtils.createReport.onOpen = handleOpen;
    ModalUtils.createReport.onClose = handleClose;
  }, []);

  return {
    createReportModalState: { isOpen, createReportState, currentReportState },
    createReportModalMethods: {
      onOpen: handleOpen,
      onClose: handleClose,
      createReportMethods,
    },
  };
};
