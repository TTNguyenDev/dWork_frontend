import { useCallback, useRef, useState } from 'react';
import { JobService } from '../services/jobService';
import { toast } from 'react-toastify';
import { useQueryClient } from 'react-query';

export type UseSelectProposalOutput = {
    selectProposalLoading: boolean;
    handleSelectProposal: (payload: any) => void;
};

export const useSelectProposal = (): UseSelectProposalOutput => {
    const queryClient = useQueryClient();

    const [selectProposalLoading, setSelectProposalLoading] = useState(false);

    const handleSelectProposal = useCallback(
        async (payload: { taskId: string; index: number }) => {
            console.log(payload);
            setSelectProposalLoading(true);
            try {
                await JobService.selectProposal(payload);
                queryClient.invalidateQueries('jobs');
                toast('Choose proposal successfully', {
                    type: 'success',
                });
            } catch (error) {
                toast('Choose proposal failed', {
                    type: 'error',
                });
            } finally {
                setSelectProposalLoading(false);
            }
        },
        []
    );

    return {
        selectProposalLoading,
        handleSelectProposal,
    };
};
