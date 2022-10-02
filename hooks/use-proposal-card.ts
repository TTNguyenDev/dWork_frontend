import { useCallback, useMemo } from 'react';
import { ProposalDto, ProposalStatus } from '../dtos';
import { ModalUtils } from '../utils';

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

  const isShowAction = useMemo(
    () => data.status === ProposalStatus.Pending,
    [data.status]
  );

  const statusLabel = useMemo(() => {
    if (typeof data.status === 'string') return data.status.toLocaleUpperCase();
    if (typeof data.status === 'object') {
      if (data.status.Rejected) {
        return 'REJECTED';
      }
    }
  }, [data.status]);

  return {
    proposalCardState: {
      isShowAction,
      statusLabel,
    },
    proposalCardMethods: {
      btnApproveOnClick,
      btnRejectOnClick,
    },
  };
};
