import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { CachePrefixKeys } from '../constants';
import { useWalletAccountId } from '../core/hooks';
import { TaskRepo } from '../repos';
import { useTaskProposals } from './use-task-proposals';

export const useTaskDetailPage = () => {
  const router = useRouter();
  const { accountId } = useWalletAccountId();

  const taskId = useMemo(
    () => router.query.taskId as string | undefined,
    [router.query.taskId]
  );

  const ownerId = useMemo(
    () => (taskId ? taskId.split('_')[0] : undefined),
    [taskId]
  );

  const isOwner = useMemo(() => accountId === ownerId, [accountId, ownerId]);

  const { taskProposalsState } = useTaskProposals({ taskId });

  const taskQuery = useQuery(
    [CachePrefixKeys.TASK, taskId],
    () => TaskRepo.get(taskId!),
    {
      enabled: !!taskId,
    }
  );

  const isFullApproved = useMemo(
    () =>
      taskQuery.data &&
      taskProposalsState.total >= taskQuery.data?.max_participants,
    [taskQuery.data, taskProposalsState.total]
  );

  const ownerProposal = useMemo(() => {
    if (!isOwner && accountId) {
      return taskProposalsState.allItems.find(
        (i) => i.account_id === accountId
      );
    }
  }, [taskProposalsState.allItems, accountId, isOwner]);

  return {
    taskDetailPageState: {
      taskId,
      ownerId,
      isOwner,
      data: taskQuery.data,
      isLoading: taskQuery.isLoading,
      taskProposalsState,
      isFullApproved,
      ownerProposal,
    },
    taskDetailPageMethods: {},
  };
};
