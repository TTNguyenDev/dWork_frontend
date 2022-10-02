import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from '@tanstack/react-query';
import { TaskRepo } from '../repos';
import { useCallback } from 'react';
import { CachePrefixKeys } from '../constants';
import { useCurrentProposal } from './atoms';

export const useApproveWork = ({
  options,
}: {
  options?: Omit<
    UseMutationOptions<void, unknown, void, unknown>,
    'mutationFn'
  >;
} = {}) => {
  const queryClient = useQueryClient();
  const { currentProposalState } = useCurrentProposal();
  const approveWorkMutation = useMutation(
    () =>
      TaskRepo.approveWork({
        task_id: currentProposalState.taskId.value,
        worker_id: currentProposalState.workerId.value,
      }),
    options
  );

  const submit = useCallback(async () => {
    await approveWorkMutation.mutateAsync();
    queryClient.invalidateQueries([
      CachePrefixKeys.PROPOSAL,
      currentProposalState.taskId.value,
    ]);
  }, [currentProposalState.taskId.value]);

  return {
    approveWorkState: {
      isLoading: approveWorkMutation.isLoading,
      data: approveWorkMutation.data,
    },
    approveWorkMethods: {
      submit,
    },
  };
};
