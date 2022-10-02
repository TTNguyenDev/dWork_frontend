import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from '@tanstack/react-query';
import { TaskRepo } from '../repos';
import { useForm } from 'react-hook-form';
import { SubmitWorkInput } from '../dtos';
import { useMemo } from 'react';
import { useAccount } from './atoms';

export const useSubmitWork = ({
  taskId,
  options,
}: {
  taskId?: string;
  options?: Omit<
    UseMutationOptions<void, unknown, SubmitWorkInput, unknown>,
    'mutationFn'
  >;
}) => {
  const { accountMethods } = useAccount();
  const submitWorkForm = useForm<SubmitWorkInput>({
    defaultValues: {
      task_id: taskId,
    },
  });

  const submitWorkMutation = useMutation(
    (payload: SubmitWorkInput) => TaskRepo.submitWork(payload),
    options
  );

  const onSubmit = useMemo(
    () =>
      submitWorkForm.handleSubmit(async (data) => {
        await submitWorkMutation.mutateAsync(data);
        await accountMethods.fetchProfile();
      }),
    [submitWorkForm]
  );

  return {
    submitWorkState: {
      isLoading: submitWorkMutation.isLoading,
      data: submitWorkMutation.data,
      form: submitWorkForm,
    },
    submitWorkMethods: {
      onSubmit,
    },
  };
};
