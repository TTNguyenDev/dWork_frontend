import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from '@tanstack/react-query';
import { TaskRepo } from '../repos';
import { useCallback, useMemo } from 'react';
import { CachePrefixKeys } from '../constants';
import { useAccount } from './atoms';

export const useMarkTaskCompleted = ({
  taskId,
  options,
}: {
  taskId?: string;
  options?: Omit<
    UseMutationOptions<void, unknown, void, unknown>,
    'mutationFn'
  >;
}) => {
  const queryClient = useQueryClient();
  const { accountState, accountMethods } = useAccount();
  const markTaskCompleteMutation = useMutation(
    () =>
      TaskRepo.markTaskAsCompleted({
        task_id: taskId!,
      }),
    options
  );

  const submit = useCallback(async () => {
    await markTaskCompleteMutation.mutateAsync();
    await accountMethods.fetchProfile();
    queryClient.invalidateQueries([CachePrefixKeys.TASK, taskId]);
  }, [taskId]);

  const isCompleted = useMemo(
    () => accountState.profile.value?.completed_jobs.includes(taskId ?? ''),
    [accountState.profile.value?.completed_jobs, taskId]
  );

  return {
    markTaskCompleteState: {
      isLoading: markTaskCompleteMutation.isLoading,
      data: markTaskCompleteMutation.data,
      isCompleted,
    },
    markTaskCompleteMethods: {
      submit,
    },
  };
};
