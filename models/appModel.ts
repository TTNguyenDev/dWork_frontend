import {
    AnyAction,
    createSlice,
    PayloadAction,
    Reducer,
} from '@reduxjs/toolkit';
import { StateWithLoading } from '../common';
import { TaskService } from '../services/jobService';
import { AppThunk, Model } from '../store';
import { BlockChainConnector } from '../utils/blockchain';

export type AppState = {
    data: StateWithLoading<{
        ready: boolean;
        loading: boolean;
        cacheReady: boolean;
    }>;
};

const initialState: AppState = {
    data: {
        ready: false,
        loading: true,
        cacheReady: false,
    },
};

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        clearData(state) {
            state = initialState;
        },
        initStart(state) {
            state.data.loading = true;
        },
        initSuccess(state, action: PayloadAction<void>) {
            state.data.ready = true;
            state.data.loading = false;
        },
        cacheSuccess(state, action: PayloadAction<void>) {
            state.data.cacheReady = true;
        },
    },
});

const asyncActions: {
    init: () => AppThunk;
    cache: () => AppThunk;
} = {
    init: () => async (dispatch) => {
        dispatch(appSlice.actions.initStart());
        await BlockChainConnector.instance.initNear();
        dispatch(appSlice.actions.initSuccess());
    },
    cache: () => async (dispatch) => {
        await TaskService.fetchAndCacheTasks();
        dispatch(appSlice.actions.cacheSuccess());
    },
};

export const AppModel: Model<
    typeof appSlice.actions,
    typeof asyncActions,
    Reducer<AppState, AnyAction>
> = {
    actions: appSlice.actions,
    asyncActions,
    reducer: appSlice.reducer,
};
