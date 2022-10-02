import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { CachePrefixKeys } from '../constants';
import { useBlockchain } from '../core/hooks';
import { TaskRepo } from '../repos';

export const useTaskDetailPage = () => {
  const router = useRouter();
  const {
    blockchainState: { accountId },
  } = useBlockchain();

  const taskId = useMemo(
    () => router.query.taskId as string | undefined,
    [router.query.taskId]
  );

  const ownerId = useMemo(
    () => (taskId ? taskId.split('_')[0] : undefined),
    [taskId]
  );

  const isOwner = useMemo(
    () => accountId.value === ownerId,
    [accountId.value, ownerId]
  );

  const taskQuery = useQuery(
    [CachePrefixKeys.TASK, taskId],
    () => TaskRepo.get(taskId!),
    {
      enabled: !!taskId,
    }
  );

  return {
    taskDetailPageState: {
      taskId,
      ownerId,
      isOwner,
      data: taskQuery.data,
      isLoading: taskQuery.isLoading,
    },
    taskDetailPageMethods: {},
  };
};
