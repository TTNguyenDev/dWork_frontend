import { useQuery } from '@tanstack/react-query';
import { TaskRepo } from '../repos';
import { CachePrefixKeys } from '../constants';
import { useMemo, useState } from 'react';

export const useTaskProposals = ({ taskId }: { taskId?: string }) => {
  const [status, setStatus] = useState();

  const taskProposalsQuery = useQuery(
    [CachePrefixKeys.CATEGORY],
    () => TaskRepo.getProposals(taskId!),
    {
      enabled: !!taskId,
    }
  );

  const data = useMemo(
    () => taskProposalsQuery.data,
    [taskProposalsQuery.data, status]
  );

  return {
    taskProposalsState: {
      isLoading: taskProposalsQuery.isLoading,
      data,
    },
    taskProposalsMethods: {},
  };
};
