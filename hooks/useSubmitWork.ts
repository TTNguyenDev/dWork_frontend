import { useCallback, useRef, useState } from 'react';
import { Schema } from 'rsuite';
import { TaskService } from '../services/jobService';
import { toast } from 'react-toastify';
import { useQueryClient } from 'react-query';

const { StringType, NumberType } = Schema.Types;

const model = Schema.Model({
    // proof: StringType().isRequired('This field is required.'),
});

export type UseSubmitWorkOutput = {
    model: typeof model;
    submitWorkLoading: boolean;
    handleFormChange: (payload: any) => void;
    handleFormSubmit: (
        isValid: boolean,
        taskId: string,
        proof: string,
        afterSubmit: () => void
    ) => void;
};

export const useSubmitWork = (): UseSubmitWorkOutput => {
    const queryClient = useQueryClient();

    const formValueRef = useRef<any>({});
    const [submitWorkLoading, setSubmitWorkLoading] = useState(false);

    const handleFormChange = useCallback((formValue) => {
        formValueRef.current = formValue;
    }, []);

    const handleFormSubmit = useCallback(
        async (isValid, taskId, proof, afterSubmit) => {
            if (isValid) {
                if (!proof?.replace(/<(.|\n)*?>/g, '').trim()) {
                    toast('Proof is required!', {
                        type: 'error',
                    });
                    return;
                }

                setSubmitWorkLoading(true);
                try {
                    await TaskService.submitWork({
                        taskId,
                        proof,
                    });
                    queryClient.invalidateQueries('jobsAvailable');
                    queryClient.invalidateQueries('jobsProcessing');
                    queryClient.invalidateQueries('jobsCompleted');
                    toast('Submit work successfully', {
                        type: 'success',
                    });
                    afterSubmit();
                } catch (error) {
                    toast('Submit work failed', {
                        type: 'error',
                    });
                } finally {
                    setSubmitWorkLoading(false);
                }
            }
        },
        []
    );

    return {
        model,
        submitWorkLoading,
        handleFormChange,
        handleFormSubmit,
    };
};
