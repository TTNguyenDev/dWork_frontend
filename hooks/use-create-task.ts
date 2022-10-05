import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { TaskRepo } from '../repos';
import { useForm } from 'react-hook-form';
import { TaskCreateInput } from '../dtos';
import { useMemo } from 'react';
import { useTaskCategories } from './use-task-categories';
import { useRouter } from 'next/router';
import { useWalletAccountId } from '../core/hooks';

export const useCreateTask = ({
  options,
}: {
  options?: Omit<
    UseMutationOptions<void, unknown, TaskCreateInput, unknown>,
    'mutationFn'
  >;
} = {}) => {
  const router = useRouter();
  const { accountId } = useWalletAccountId();
  const { taskCategoriesState } = useTaskCategories();

  const isAllowedToCreateTask = useMemo(() => true, []);

  const createTaskForm = useForm<TaskCreateInput>({
    defaultValues: {
      max_participants: 1,
      price: '1',
    },
  });

  const createTaskMutation = useMutation(
    (payload: TaskCreateInput) => TaskRepo.create(payload),
    options
  );

  const onSubmit = useMemo(
    () =>
      createTaskForm.handleSubmit(async (data) => {
        await createTaskMutation.mutateAsync(data);
        router.push(`/account/${accountId}`);
      }),
    [createTaskForm]
  );

  return {
    createTaskState: {
      isLoading: createTaskMutation.isLoading,
      data: createTaskMutation.data,
      form: createTaskForm,
      taskCategoriesState,
      isAllowedToCreateTask,
    },
    createTaskMethods: {
      onSubmit,
    },
  };
};
