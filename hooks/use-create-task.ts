import {
  MutationOptions,
  useMutation,
  UseMutationOptions,
} from '@tanstack/react-query';
import { TaskRepo } from '../repos';
import { useForm, SubmitHandler } from 'react-hook-form';
import { TaskCreateInput } from '../dtos';
import { useCallback, useMemo } from 'react';

export const useCreateTask = ({
  options,
}: {
  options?: Omit<
    UseMutationOptions<void, unknown, TaskCreateInput, unknown>,
    'mutationFn'
  >;
} = {}) => {
  const createTaskForm = useForm<TaskCreateInput>();
  const createTaskMutation = useMutation(
    (payload: TaskCreateInput) => TaskRepo.create(payload),
    options
  );

  const onSubmit = useMemo(
    () =>
      createTaskForm.handleSubmit(async (data) => {
        console.log(data);
        await createTaskMutation.mutateAsync(data);
      }),
    [createTaskForm]
  );

  return {
    createTaskState: {
      isLoading: createTaskMutation.isLoading,
      data: createTaskMutation.data,
      form: createTaskForm,
    },
    createTaskMethods: {
      onSubmit,
    },
  };
};
