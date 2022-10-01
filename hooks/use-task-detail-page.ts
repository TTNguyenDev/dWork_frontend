import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { CachePrefixKeys } from '../constants';
import { TaskRepo } from '../repos';

export const useTaskDetailPage = () => {
  const router = useRouter();

  const taskId = useMemo(
    () => router.query.taskId as string,
    [router.query.taskId]
  );

  const taskQuery = useQuery(
    [CachePrefixKeys.TASK, taskId],
    () => TaskRepo.get(taskId),
    {
      enabled: !!taskId,
    }
  );

  return {
    taskDetailPageState: {
      taskId,
      data: taskQuery.data,
      isLoading: taskQuery.isLoading,
    },
    taskDetailPageMethods: {},
  };
};
