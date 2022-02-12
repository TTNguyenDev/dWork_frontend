import {
    AnyAction,
    createSlice,
    PayloadAction,
    Reducer,
} from '@reduxjs/toolkit';
import { StateWithLoading } from '../common';
import { AppThunk, Model } from '../store';
import { BlockChainConnector } from '../utils/blockchain';

export type AppState = {
    data: StateWithLoading<{
        ready: boolean,
    }>
};

const initialState: AppState = {
    data: {
        ready: false,
        loading: true,
    }
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
    },
});

const asyncActions: {
    init: () => AppThunk
} = {
    init: () =>
        async (dispatch) => {
            dispatch(appSlice.actions.initStart());
            await BlockChainConnector.instance.initNear();
            dispatch(appSlice.actions.initSuccess());
        }
}

export const AppModel: Model<
    typeof appSlice.actions,
    typeof asyncActions,
    Reducer<AppState, AnyAction>
> = {
    actions: appSlice.actions,
    asyncActions,
    reducer: appSlice.reducer,
};
