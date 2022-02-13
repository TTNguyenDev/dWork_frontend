import { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { Nullable, Optional } from "../common";
import { Account } from "../models/types/accountType";
import { Job } from "../models/types/jobType";
import { AccountService } from "../services/accountService";
import { RootState } from "../store";
import { useListJobs } from "./useListJobs";
import { useLogin } from "./useLogin";
import { toast } from 'react-toastify';


export type UseHomePageOutput = {
    authLoading: boolean,
    logged: boolean,
    profileLoading: boolean,
    profileInfo: Nullable<Account>,
    createTaskBtnLoading: boolean,
    makeMoneyBtnLoading: boolean,
    handleCreateTaskBtnClick: () => void;
    handleMakeMoneyBtnClick: () => void;
    jobs: Optional<Job[]>;
    listJobsLoading: boolean;
}

export const useHomePage = (): UseHomePageOutput => {
    const auth = useSelector((state: RootState) => state.auth);
    const profile = useSelector((state: RootState) => state.profile);

    const { loading: loginLoading, requestLogin } = useLogin();
    const { loading: listJobsLoading, jobs } = useListJobs();

    const [createTaskBtnLoading, setCreateTaskBtnLoading] = useState<boolean>(false);
    const [makeMoneyBtnLoading, setMakeMoneyBtnLoading] = useState<boolean>(false);

    const handleCreateTaskBtnClick = useCallback(async () => {
        setCreateTaskBtnLoading(true);
        try {
            await AccountService.register(true);
            toast('Register as a requester successfully')
        } catch (error) {
            toast('Register as a requester failed')
        }
        setCreateTaskBtnLoading(false);
    }, [])

    const handleMakeMoneyBtnClick = useCallback(async () => {
        setMakeMoneyBtnLoading(true);
        try {
            await AccountService.register(false);
            toast('Register as a worker successfully', {
                type: 'success'
            })
        } catch (error) {
            toast('Register as a worker failed', {
                type: 'error'
            })
        }
        setMakeMoneyBtnLoading(false);
    }, []);

    return {
        authLoading: auth.data.loading,
        logged: auth.data.logged,
        profileLoading: profile.data.loading,
        profileInfo: profile.data.info,
        createTaskBtnLoading,
        makeMoneyBtnLoading,
        handleCreateTaskBtnClick,
        handleMakeMoneyBtnClick,
        jobs,
        listJobsLoading,
    }
}