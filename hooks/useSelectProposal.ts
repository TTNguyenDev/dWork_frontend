import { useCallback, useRef, useState } from 'react';
import { JobService } from '../services/jobService';
import { toast } from 'react-toastify';
import { useQueryClient } from 'react-query';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { AccountTypes } from '../models/types/accountType';

export type UseSelectProposalOutput = {
    accountType?: AccountTypes;
    selectProposalLoading: boolean;
    handleSelectProposal: (payload: {
        taskId: string;
        index: number;
        totalReceived: string;
    }) => void;
};

export const useSelectProposal = (): UseSelectProposalOutput => {
    const profile = useSelector((state: RootState) => state.profile);

    const queryClient = useQueryClient();

    const [selectProposalLoading, setSelectProposalLoading] = useState(false);

    const handleSelectProposal = useCallback(async (payload) => {
        setSelectProposalLoading(true);
        try {
            await JobService.selectProposal(payload);
            queryClient.invalidateQueries('jobs');
            queryClient.invalidateQueries('jobsAvailable');
            queryClient.invalidateQueries('jobsProcessing');
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
    }, []);

    return {
        accountType: profile.data.info?.type,
        selectProposalLoading,
        handleSelectProposal,
    };
};
