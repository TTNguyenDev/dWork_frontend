import { useCallback } from 'react';
import { ReportDto } from '../dtos';
import { ModalUtils } from '../utils';

export const useReportCard = ({ data }: { data: ReportDto }) => {
  const btnApproveOnClick = useCallback(() => {
    ModalUtils.approveReport.onOpen({
      reportId: data.report_id,
    });
  }, []);
  const btnRejectOnClick = useCallback(() => {
    ModalUtils.rejectReport.onOpen({
      reportId: data.report_id,
    });
  }, []);

  return {
    reportCardState: {},
    reportCardMethods: {
      btnApproveOnClick,
      btnRejectOnClick,
    },
  };
};
