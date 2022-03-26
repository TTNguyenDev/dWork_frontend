import { useCallback, useMemo, useRef, useState } from 'react';
import { Schema } from 'rsuite';
import { TaskService } from '../services/jobService';
import { toast } from 'react-toastify';
import { useQueryClient } from 'react-query';
import { useForm, UseFormReturn } from 'react-hook-form';

const { StringType, NumberType } = Schema.Types;

const model = Schema.Model({
    title: StringType().isRequired('Title is a required field'),
    price: NumberType().isRequired('Price is a required field'),
    maxParticipants: NumberType().isRequired(
        'Max participants is a required field'
    ),
    duration: NumberType().isRequired('Deadline is a required field'),
    categoryId: StringType().isRequired('Category is a required field'),
    description: StringType().isRequired('Description is a required field'),
});

type CreateTaskFormInput = {
    title: string;
    price: number;
    maxParticipants: number;
    duration: number;
    categoryId: string;
    description: string;
};

export type UseCreateTaskOutput = {
    model: typeof model;
    createTaskLoading: boolean;
    handleFormChange: (payload: any) => void;
    handleFormSubmit: () => void;
    formValue: any;
    setFormValue: (payload: any) => void;
    createTaskForm: UseFormReturn<CreateTaskFormInput>;
};

export const useCreateTask = (): UseCreateTaskOutput => {
    const queryClient = useQueryClient();
    const createTaskForm = useForm<CreateTaskFormInput>();

    const [createTaskLoading, setCreateTaskLoading] = useState(false);

    const [formValue, setFormValue] = useState<any>({
        maxParticipants: 1,
    });

    const handleFormChange = useCallback((formData) => {
        setFormValue(formData);
    }, []);

    const handleFormSubmit = useMemo(
        () =>
            createTaskForm.handleSubmit(async (data: any) => {
                console.log(data);
                setCreateTaskLoading(true);
                try {
                    await TaskService.createTask(data);
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
        [formValue]
    );

    return {
        model,
        createTaskLoading,
        handleFormChange,
        handleFormSubmit,
        formValue,
        setFormValue,
        createTaskForm,
    };
};
