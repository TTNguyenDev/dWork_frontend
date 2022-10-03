import { useQuery } from '@tanstack/react-query';
import { TaskRepo } from '../repos';
import { CachePrefixKeys, ProposalStatusFilter } from '../constants';
import { useCallback, useMemo, useState } from 'react';
import { ProposalStatus } from '../dtos';
import { getProposalStatus } from '../utils';

export const useTaskProposals = ({ taskId }: { taskId?: string }) => {
  const [status, setStatus] = useState<ProposalStatusFilter>(
    ProposalStatusFilter.PENDING
  );

  const taskProposalsQuery = useQuery(
    [CachePrefixKeys.PROPOSAL, taskId],
    () => TaskRepo.getProposals(taskId!),
    {
      enabled: !!taskId,
    }
  );

  const allItems = useMemo(() => {
    return taskProposalsQuery.data ?? [];
  }, [taskProposalsQuery.data]);

  const total = useMemo(() => {
    return taskProposalsQuery.data?.length ?? 0;
  }, [taskProposalsQuery.data]);

  const pendingItems = useMemo(() => {
    return (
      taskProposalsQuery.data?.filter(
        (i) => getProposalStatus(i.status) === ProposalStatus.Pending
      ) ?? []
    );
  }, [taskProposalsQuery.data]);

  const approvedItems = useMemo(() => {
    return (
      taskProposalsQuery.data?.filter(
        (i) => getProposalStatus(i.status) === ProposalStatus.Approved
      ) ?? []
    );
  }, [taskProposalsQuery.data]);

  const rejectedItems = useMemo(() => {
    return (
      taskProposalsQuery.data?.filter(
        (i) => getProposalStatus(i.status) === ProposalStatus.Rejected
      ) ?? []
    );
  }, [taskProposalsQuery.data]);

  const reportingItems = useMemo(() => {
    return (
      taskProposalsQuery.data?.filter(
        (i) => getProposalStatus(i.status) === ProposalStatus.Reporting
      ) ?? []
    );
  }, [taskProposalsQuery.data]);

  const data = useMemo(() => {
    const items = taskProposalsQuery.data;
    if (!items) return [];

    switch (status) {
      case ProposalStatusFilter.PENDING:
        return pendingItems;

      case ProposalStatusFilter.APPROVED:
        return approvedItems;

      case ProposalStatusFilter.REJECTED:
        return rejectedItems;

      case ProposalStatusFilter.REPORTING:
        return reportingItems;
    }
  }, [taskProposalsQuery.data, status]);

  const btnStatusFilterOnClick = useCallback(
    (value: ProposalStatusFilter) => setStatus(value),
    []
  );

  return {
    taskProposalsState: {
      isLoading: taskProposalsQuery.isLoading,
      allItems,
      total,
      data,
      status,
      pendingItems,
      approvedItems,
      rejectedItems,
      reportingItems,
    },
    taskProposalsMethods: { btnStatusFilterOnClick },
  };
};
