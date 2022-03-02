import { useCallback, useRef, useState } from 'react';
import { Schema } from 'rsuite';
import { JobService } from '../services/jobService';
import { toast } from 'react-toastify';
import { useQueryClient } from 'react-query';

const { StringType, NumberType } = Schema.Types;

const model = Schema.Model({
    title: StringType().isRequired('This field is required.'),
    // description: StringType().isRequired('This field is required.'),
    price: NumberType().isRequired('This field is required.'),
    maxParticipants: NumberType().isRequired('This field is required.'),
    // duration: NumberType().isRequired('This field is required.'),
});

export type UseCreateTaskOutput = {
    model: typeof model;
    createTaskLoading: boolean;
    handleFormChange: (payload: any) => void;
    handleFormSubmit: (
        isValid: boolean,
        description: string,
        duration: number,
        afterSubmit: () => void
    ) => void;
};

export const useCreateTask = (): UseCreateTaskOutput => {
    const queryClient = useQueryClient();

    const formValueRef = useRef<any>({});
    const [createTaskLoading, setCreateTaskLoading] = useState(false);

    const handleFormChange = useCallback((formValue) => {
        formValueRef.current = formValue;
    }, []);

    const handleFormSubmit = useCallback(
        async (isValid, description, duration, afterSubmit) => {
            if (!description?.replace(/<(.|\n)*?>/g, '').trim()) {
                toast('Description is required!', {
                    type: 'error',
                });
                return;
            }

            if (!duration) {
                toast('Deadline is required!', {
                    type: 'error',
                });
                return;
            }

            if (isValid) {
                setCreateTaskLoading(true);
                try {
                    await JobService.createTask({
                        ...formValueRef.current,
                        description,
                        duration,
                    });
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
        []
    );

    return {
        model,
        createTaskLoading,
        handleFormChange,
        handleFormSubmit,
    };
};
