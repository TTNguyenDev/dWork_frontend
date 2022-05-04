import { useMemo, useState } from 'react';
import { CreateTaskInput, TaskService } from '../services/jobService';
import { toast } from 'react-toastify';
import { useQueryClient } from 'react-query';
import { useForm, UseFormReturn } from 'react-hook-form';
import { IPFSUtils } from '../utils/ipfsUtils';
import { BlockChainConnector } from '../utils/blockchain';

export type UseCreateTaskOutput = {
    createTaskLoading: boolean;
    handleFormSubmit: () => void;
    createTaskForm: UseFormReturn<CreateTaskInput>;
};

export const useCreateTask = (): UseCreateTaskOutput => {
    const queryClient = useQueryClient();
    const createTaskForm = useForm<CreateTaskInput>();

    const [createTaskLoading, setCreateTaskLoading] = useState(false);

    const handleFormSubmit = useMemo(
        () =>
            createTaskForm.handleSubmit(async (data: any) => {
                setCreateTaskLoading(true);
                const ipfsData = await IPFSUtils.client.add(data.description);
                data.description = ipfsData.path;

                try {
                    window.history.replaceState(
                        'create_task_redirect',
                        'task',
                        `/account/${BlockChainConnector.instance.account.accountId}`
                    );
                    await TaskService.createTask(
                        data,
                        data.newCategory
                            ? {
                                  name: data.newCategory,
                              }
                            : undefined
                    );
                    queryClient.invalidateQueries('jobs');
                    queryClient.invalidateQueries('jobsAvailable');
                    toast('Create task successfully', {
                        type: 'success',
                    });
                } catch (error) {
                    console.error(error);
                    toast('Create task failed', {
                        type: 'error',
                    });
                } finally {
                    setCreateTaskLoading(false);
                }
            }),
        []
    );

    return {
        createTaskLoading,
        handleFormSubmit,
        createTaskForm,
    };
};
