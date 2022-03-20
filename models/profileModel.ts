import {
    AnyAction,
    createSlice,
    PayloadAction,
    Reducer,
} from '@reduxjs/toolkit';
import { Nullable, StateWithLoading } from '../common';
import { AccountService } from '../services/accountService';
import { TaskService } from '../services/jobService';
import { AppThunk, Model } from '../store';
import { Account } from './types/accountType';
import { Task } from './types/jobType';

export type ProfileState = {
    data: StateWithLoading<{
        info: Nullable<Account>;
    }>;
    jobsJoined: StateWithLoading<{
        jobs: Task[];
    }>;
};

const initialState: ProfileState = {
    data: {
        info: null,
        loading: true,
    },
    jobsJoined: {
        jobs: [],
        loading: true,
    },
};

const profile = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        clearData(state) {
            state = initialState;
        },
        getProfileStarted(state) {
            state.data.loading = true;
        },
        getProfileSuccess(state, action: PayloadAction<Account>) {
            state.data.info = action.payload;
            state.data.loading = false;
        },
        getProfileFailed(state, action: PayloadAction<string>) {
            state.data.error = action.payload;
            state.data.loading = false;
        },
        getJobsJoinedStarted(state) {
            state.jobsJoined.loading = true;
        },
        getJobsJoinedSuccess(state, action: PayloadAction<Task[]>) {
            state.jobsJoined.jobs = action.payload;
            state.jobsJoined.loading = false;
        },
        getJobsJoinedFailed(state, action: PayloadAction<string>) {
            state.jobsJoined.error = action.payload;
            state.jobsJoined.loading = false;
        },
    },
});

const asyncActions: {
    fetchProfile: () => AppThunk;
    fetchJobsJoined: () => AppThunk;
} = {
    fetchProfile: () => async (dispatch, getState) => {
        const { auth } = getState();

        if (!auth.data.userId) return;

        dispatch(profile.actions.getProfileStarted());

        try {
            const res = await AccountService.fetchUser(auth.data.userId);
            dispatch(profile.actions.getProfileSuccess(res));
        } catch (error: any) {
            console.error('fetchProfile', error);
            dispatch(profile.actions.getProfileFailed(error.message));
        }
    },
    fetchJobsJoined: () => async (dispatch, getState) => {
        const { auth } = getState();

        if (!auth.data.userId) return;

        dispatch(profile.actions.getJobsJoinedStarted());

        try {
            const res = await TaskService.fetchJobByAccountId(auth.data.userId);
            dispatch(profile.actions.getJobsJoinedSuccess(res));
        } catch (error: any) {
            console.error('fetchJobsJoined', error);
            dispatch(profile.actions.getJobsJoinedFailed(error.message));
        }
    },
};

export const ProfileModel: Model<
    typeof profile.actions,
    typeof asyncActions,
    Reducer<ProfileState, AnyAction>
> = Object.freeze({
    actions: profile.actions,
    asyncActions,
    reducer: profile.reducer,
});
