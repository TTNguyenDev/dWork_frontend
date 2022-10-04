import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { CachePrefixKeys } from '../constants';
import { useWallet, useWalletAccountId } from '../core/hooks';
import { TaskRepo } from '../repos';
import { useIsRegistered } from './atoms';
import { useTaskProposals } from './use-task-proposals';

export const useTaskDetailPage = () => {
  const router = useRouter();
  const { wallet } = useWallet();
  const { accountId } = useWalletAccountId();
  const { isRegistered } = useIsRegistered();

  const taskId = useMemo(
    () => router.query.taskId as string | undefined,
    [router.query.taskId]
  );

  const ownerId = useMemo(() => {
    if (!taskId) return;
    const index = taskId.lastIndexOf('_');
    return taskId.substring(0, index);
  }, [taskId]);

  const isOwner = useMemo(() => accountId === ownerId, [accountId, ownerId]);
  console.log(accountId);
  console.log(ownerId);

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
      taskProposalsState.approvedItems.length >=
        taskQuery.data?.max_participants,
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
      isRegistered,
      logged: wallet.logged,
    },
    taskDetailPageMethods: {},
  };
};
