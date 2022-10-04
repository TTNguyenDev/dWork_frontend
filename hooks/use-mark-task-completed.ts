import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from '@tanstack/react-query';
import { TaskRepo } from '../repos';
import { useCallback } from 'react';
import { CachePrefixKeys } from '../constants';
import { useCurrentProposal } from './atoms';

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
  const markTaskCompleteMutation = useMutation(
    () =>
      TaskRepo.markTaskAsCompleted({
        task_id: taskId!,
      }),
    options
  );

  const submit = useCallback(async () => {
    await markTaskCompleteMutation.mutateAsync();
    queryClient.invalidateQueries([CachePrefixKeys.TASK, taskId]);
  }, [taskId]);

  return {
    markTaskCompleteState: {
      isLoading: markTaskCompleteMutation.isLoading,
      data: markTaskCompleteMutation.data,
    },
    markTaskCompleteMethods: {
      submit,
    },
  };
};
