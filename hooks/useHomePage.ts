import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Nullable, Optional } from '../common';
import { Account } from '../models/types/accountType';
import { Task } from '../models/types/jobType';
import { AccountService } from '../services/accountService';
import { RootState } from '../store';
import { useListJobs } from './useListJobs';
import { toast } from 'react-toastify';
import { ModalsController } from '../utils/modalsController';
import { TaskService } from '../services/jobService';
import { useQuery, useQueryClient } from 'react-query';
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
    jobs: Optional<Task[]>;
    listJobsLoading: boolean;
    jobsAvailableLoading: boolean;
    jobsAvailable: Optional<Task[]>;
    jobsProcessingLoading: boolean;
    jobsProcessing: Optional<Task[]>;
    jobsCompletedLoading: boolean;
    jobsCompleted: Optional<Task[]>;
    fetchNextPage: () => Promise<void>;
    isFetchingNextPage: boolean;
    hasNextPage: Optional<boolean>;
    filter: any;
    setTaskFilter: (payload: Record<string, any>) => void;
    applyTaskFilter: () => void;
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
        filter,
        setTaskFilter,
        applyTaskFilter,
    } = useListJobs();

    const { isLoading: jobsAvailableLoading, data: jobsAvailable } = useQuery<
        Task[]
    >('jobsAvailable', async () => {
        const res = await TaskService.fetchAvailableJobs();
        return res.filter(
            (r) => r.owner === BlockChainConnector.instance.account.accountId
        );
    });

    const { isLoading: jobsProcessingLoading, data: jobsProcessing } = useQuery<
        Task[]
    >('jobsProcessing', () => TaskService.fetchJobByAccountId());

    const { isLoading: jobsCompletedLoading, data: jobsCompleted } = useQuery<
        Task[]
    >('jobsCompleted', () => TaskService.fetchJobCompletedByAccountId());

    const [createTaskBtnLoading, setCreateTaskBtnLoading] =
        useState<boolean>(false);
    const [makeMoneyBtnLoading, setMakeMoneyBtnLoading] =
        useState<boolean>(false);

    const handleCreateTaskBtnClick = useCallback(async () => {
        if (!auth.data.logged) {
            ModalsController.controller.openConnectWalletModal();
            return;
        }

        ModalsController.controller.setDataDepositInfomationModal({
            amount: 0.5,
            reason: 'create a requester account',
            action: () => AccountService.register(true),
        });
        ModalsController.controller.openDepositInfomationModal();
    }, [auth.data.logged]);

    const handleMakeMoneyBtnClick = useCallback(async () => {
        if (!auth.data.logged) {
            ModalsController.controller.openConnectWalletModal();
            return;
        }

        ModalsController.controller.setDataDepositInfomationModal({
            amount: 0.5,
            reason: 'create a worker account',
            action: () => AccountService.register(false),
        });
        ModalsController.controller.openDepositInfomationModal();
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
        filter,
        setTaskFilter,
        applyTaskFilter,
    };
};
