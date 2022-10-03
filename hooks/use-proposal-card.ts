import { useCallback, useMemo } from 'react';
import { ProposalDto, ProposalStatus } from '../dtos';
import { getProposalStatus, ModalUtils } from '../utils';

export const useProposalCard = ({
  data,
  taskId,
}: {
  data: ProposalDto;
  taskId?: string;
}) => {
  const btnApproveOnClick = useCallback(() => {
    ModalUtils.approveWork.onOpen({
      taskId,
      workerId: data.account_id,
    });
  }, []);
  const btnRejectOnClick = useCallback(() => {
    ModalUtils.rejectWork.onOpen({
      taskId,
      workerId: data.account_id,
    });
  }, []);

  const btnReportOnClick = useCallback(() => {
    ModalUtils.createReport.onOpen({
      taskId,
    });
  }, []);

  const isShowAction = useMemo(
    () => data.status === ProposalStatus.Pending,
    [data.status]
  );

  const status = useMemo(() => {
    return getProposalStatus(data.status);
  }, [data.status]);

  const statusLabel = useMemo(() => {
    return status.toLocaleUpperCase();
  }, [status]);

  const rejectData = useMemo(() => {
    if (typeof data.status === 'object') return data.status.Rejected;
  }, [data.status]);

  return {
    proposalCardState: {
      isShowAction,
      status,
      statusLabel,
      rejectData,
    },
    proposalCardMethods: {
      btnApproveOnClick,
      btnRejectOnClick,
      btnReportOnClick,
    },
  };
};
