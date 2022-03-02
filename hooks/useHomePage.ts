import { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { Nullable, Optional } from '../common';
import { Account } from '../models/types/accountType';
import { Job } from '../models/types/jobType';
import { AccountService } from '../services/accountService';
import { RootState } from '../store';
import { useListJobs } from './useListJobs';
import { toast } from 'react-toastify';
import { ModalsController } from '../utils/modalsController';
import { JobService } from '../services/jobService';
import { useQuery } from 'react-query';
import { BlockChainConnector } from '../utils/blockchain';

export type UseHomePageOutput = {
    authLoading: boolean;
    logged: boolean;
    userId: Nullable<string>;
    profileLoading: boolean;
    profileInfo: Nullable<Account>;
    createTaskBtnLoading: boolean;
    makeMoneyBtnLoading: boolean;
    handleCreateTaskBtnClick: () => void;
    handleMakeMoneyBtnClick: () => void;
    jobs: Optional<Job[]>;
    listJobsLoading: boolean;
    jobsAvailableLoading: boolean;
    jobsAvailable: Optional<Job[]>;
    jobsProcessingLoading: boolean;
    jobsProcessing: Optional<Job[]>;
    jobsCompletedLoading: boolean;
    jobsCompleted: Optional<Job[]>;
    fetchNextPage: () => Promise<void>;
    isFetchingNextPage: boolean;
    hasNextPage: Optional<boolean>;
};

export const useHomePage = (): UseHomePageOutput => {
    const auth = useSelector((state: RootState) => state.auth);
    const profile = useSelector((state: RootState) => state.profile);

    const {
        loading: listJobsLoading,
        jobs,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useListJobs();

    const { isLoading: jobsAvailableLoading, data: jobsAvailable } = useQuery<
        Job[]
    >('jobsAvailable', async () => {
        const res = await JobService.fetchAvailableJobs();
        return res.filter(
            (r) => r.owner === BlockChainConnector.instance.account.accountId
        );
    });

    const { isLoading: jobsProcessingLoading, data: jobsProcessing } = useQuery<
        Job[]
    >('jobsProcessing', () => JobService.fetchJobByAccountId());

    const { isLoading: jobsCompletedLoading, data: jobsCompleted } = useQuery<
        Job[]
    >('jobsCompleted', () => JobService.fetchJobCompletedByAccountId());

    const [createTaskBtnLoading, setCreateTaskBtnLoading] =
        useState<boolean>(false);
    const [makeMoneyBtnLoading, setMakeMoneyBtnLoading] =
        useState<boolean>(false);

    const handleCreateTaskBtnClick = useCallback(async () => {
        if (!auth.data.logged) {
            ModalsController.controller.openConnectWalletModal();
            return;
        }

        setCreateTaskBtnLoading(true);
        try {
            await AccountService.register(true);
            toast('Register as a requester successfully', {
                type: 'success',
            });
        } catch (error) {
            toast('Register as a requester failed', {
                type: 'error',
            });
        }
        setCreateTaskBtnLoading(false);
    }, [auth.data.logged]);

    const handleMakeMoneyBtnClick = useCallback(async () => {
        if (!auth.data.logged) {
            ModalsController.controller.openConnectWalletModal();
            return;
        }

        setMakeMoneyBtnLoading(true);
        try {
            await AccountService.register(false);
            toast('Register as a worker successfully', {
                type: 'success',
            });
        } catch (error) {
            toast('Register as a worker failed', {
                type: 'error',
            });
        }
        setMakeMoneyBtnLoading(false);
    }, [auth.data.logged]);

    return {
        authLoading: auth.data.loading,
        logged: auth.data.logged,
        userId: auth.data.userId,
        profileLoading: profile.data.loading,
        profileInfo: profile.data.info,
        createTaskBtnLoading,
        makeMoneyBtnLoading,
        handleCreateTaskBtnClick,
        handleMakeMoneyBtnClick,
        listJobsLoading,
        jobs,
        jobsAvailableLoading,
        jobsAvailable,
        jobsProcessingLoading,
        jobsProcessing,
        jobsCompletedLoading,
        jobsCompleted,
        fetchNextPage,
        isFetchingNextPage,
        hasNextPage,
    };
};
