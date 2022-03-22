import {
    AnyAction,
    createSlice,
    PayloadAction,
    Reducer,
} from '@reduxjs/toolkit';
import { Nullable, StateWithLoading } from '../common';
import { db } from '../db';
import { AuthService } from '../services/authService';
import { AppThunk, Model } from '../store';
import { BlockChainConnector } from '../utils/blockchain';

export type AuthState = {
    data: StateWithLoading<{
        logged: boolean;
        userId: Nullable<string>;
    }>;
    login: StateWithLoading;
    logout: StateWithLoading;
};

const initialState: AuthState = {
    data: {
        logged: false,
        userId: null,
        loading: true,
    },
    login: {
        loading: false,
    },
    logout: {
        loading: false,
    },
};

const topics = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        clearData(state) {
            state = initialState;
        },
        logInStart(state) {
            state.login.loading = true;
        },
        logInSuccess(
            state,
            action: PayloadAction<{
                userId: string;
            }>
        ) {
            state.data.logged = true;
            state.data.userId = action.payload.userId;
            state.login.loading = false;
        },
        logOutStart(state) {
            state.logout.loading = true;
        },
        logOutSuccess(state) {
            state.data.logged = false;
            state.data.userId = null;
            state.logout.loading = false;
        },
        checkLoginStatus(state) {
            state.data.logged =
                !!BlockChainConnector.instance.account.accountId;
            state.data.userId = BlockChainConnector.instance.account.accountId;
            state.data.loading = false;
        },
    },
});

const asyncActions: {
    logIn: () => AppThunk;
    logOut: () => AppThunk;
} = {
    logIn: () => async (dispatch) => {
        dispatch(topics.actions.logInStart());
        await AuthService.logIn();
    },
    logOut: () => async (dispatch) => {
        dispatch(topics.actions.logOutStart());
        await AuthService.logOut();
        await Promise.all([
            db.tasks.clear(),
            db.accountTasks.clear(),
            db.accountCompletedTasks.clear(),
        ]);
        window.location.replace('/');
    },
};

export const AuthModel: Model<
    typeof topics.actions,
    typeof asyncActions,
    Reducer<AuthState, AnyAction>
> = Object.freeze({
    actions: topics.actions,
    reducer: topics.reducer,
    asyncActions,
});
