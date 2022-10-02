import { useQuery } from '@tanstack/react-query';
import { TaskRepo } from '../repos';
import { CachePrefixKeys, ProposalStatusFilter } from '../constants';
import { useCallback, useMemo, useState } from 'react';
import { ProposalStatus } from '../dtos';

export const useTaskProposals = ({ taskId }: { taskId?: string }) => {
  const [status, setStatus] = useState<ProposalStatusFilter>(
    ProposalStatusFilter.PENDING
  );

  const taskProposalsQuery = useQuery(
    [CachePrefixKeys.CATEGORY],
    () => TaskRepo.getProposals(taskId!),
    {
      enabled: !!taskId,
    }
  );

  const data = useMemo(() => {
    const items = taskProposalsQuery.data;
    if (!items) return [];

    switch (status) {
      case ProposalStatusFilter.PENDING:
        return items.filter((i) => i.status === ProposalStatus.Pending);

      case ProposalStatusFilter.APPROVED:
        return items.filter((i) => i.status === ProposalStatus.Approved);

      case ProposalStatusFilter.REJECTED:
        return items.filter((i) => i.status === ProposalStatus.Approved);
    }
  }, [taskProposalsQuery.data, status]);

  const btnStatusFilterOnClick = useCallback(
    (value: ProposalStatusFilter) => setStatus(value),
    []
  );

  return {
    taskProposalsState: {
      isLoading: taskProposalsQuery.isLoading,
      data,
      status,
    },
    taskProposalsMethods: { btnStatusFilterOnClick },
  };
};
