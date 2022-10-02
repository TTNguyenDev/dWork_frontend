import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from '@tanstack/react-query';
import { TaskRepo } from '../repos';
import { useForm } from 'react-hook-form';
import { RejectWorkInput } from '../dtos';
import { useMemo } from 'react';
import { CachePrefixKeys } from '../constants';
import { useCurrentProposal } from './atoms';

export const useRejectWork = ({
  options,
}: {
  options?: Omit<
    UseMutationOptions<void, unknown, RejectWorkInput, unknown>,
    'mutationFn'
  >;
} = {}) => {
  const queryClient = useQueryClient();
  const { currentProposalState } = useCurrentProposal();
  const rejectWorkForm = useForm<RejectWorkInput>();

  const rejectWorkMutation = useMutation(
    (payload: RejectWorkInput) => TaskRepo.rejectWork(payload),
    options
  );

  const onSubmit = useMemo(
    () =>
      rejectWorkForm.handleSubmit(async (data) => {
        await rejectWorkMutation.mutateAsync({
          task_id: currentProposalState.taskId.value,
          worker_id: currentProposalState.workerId.value,
          reason: data.reason,
        });
        queryClient.invalidateQueries([
          CachePrefixKeys.PROPOSAL,
          currentProposalState.taskId.value,
        ]);
      }),
    [rejectWorkForm, currentProposalState.taskId.value]
  );

  return {
    rejectWorkState: {
      isLoading: rejectWorkMutation.isLoading,
      data: rejectWorkMutation.data,
      form: rejectWorkForm,
    },
    rejectWorkMethods: {
      onSubmit,
    },
  };
};
