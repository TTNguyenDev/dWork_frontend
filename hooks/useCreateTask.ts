import { useCallback, useRef, useState } from 'react';
import { Schema } from 'rsuite';
import { JobService } from '../services/jobService';
import { toast } from 'react-toastify';
import { useQueryClient } from 'react-query';

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

export type UseCreateTaskOutput = {
    model: typeof model;
    createTaskLoading: boolean;
    handleFormChange: (payload: any) => void;
    handleFormSubmit: (isValid: boolean, afterSubmit: () => void) => void;
    formValue: any;
    setFormValue: (payload: any) => void;
};

export const useCreateTask = (): UseCreateTaskOutput => {
    const queryClient = useQueryClient();

    const [createTaskLoading, setCreateTaskLoading] = useState(false);

    const [formValue, setFormValue] = useState<any>({
        maxParticipants: 1,
    });

    const handleFormChange = useCallback((formData) => {
        setFormValue(formData);
    }, []);

    const handleFormSubmit = useCallback(
        async (isValid, afterSubmit) => {
            if (isValid) {
                setCreateTaskLoading(true);
                try {
                    await JobService.createTask(formValue);
                    queryClient.invalidateQueries('jobs');
                    queryClient.invalidateQueries('jobsAvailable');
                    toast('Create task successfully', {
                        type: 'success',
                    });
                    afterSubmit();
                } catch (error) {
                    console.error(error);
                    toast('Create task failed', {
                        type: 'error',
                    });
                } finally {
                    setCreateTaskLoading(false);
                }
            }
        },
        [formValue]
    );

    return {
        model,
        createTaskLoading,
        handleFormChange,
        handleFormSubmit,
        formValue,
        setFormValue,
    };
};
