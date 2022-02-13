import {
    AnyAction,
    createSlice,
    PayloadAction,
    Reducer,
} from '@reduxjs/toolkit';
import { Nullable, StateWithLoading } from '../common';
import { AccountService } from '../services/accountService';
import { AppThunk, Model } from '../store';
import { Account } from './types/accountType';

export type ProfileState = {
    data: StateWithLoading<{
        info: Nullable<Account>
    }>
};

const initialState: ProfileState = {
    data: {
        info: null,
        loading: true,
    },
};

const balance = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        clearData(state) {
            state = initialState
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
    },
});

const asyncActions: {
    fetchProfile: () => AppThunk;
} = {
    fetchProfile: () => async (dispatch, getState) => {
        const { auth } = getState();

        if (!auth.data.userId)
            return;

        dispatch(balance.actions.getProfileStarted());

        try {
            const res = await AccountService.fetchUser(auth.data.userId);
            dispatch(balance.actions.getProfileSuccess(res));
        } catch (error: any) {
            console.error('fetchProfile', error)
            dispatch(balance.actions.getProfileFailed(error.message));
        }
    }
}

export const ProfileModel: Model<
    typeof balance.actions,
    typeof asyncActions,
    Reducer<ProfileState, AnyAction>
> = Object.freeze({
    actions: balance.actions,
    asyncActions,
    reducer: balance.reducer,
});
