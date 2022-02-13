import {
    AnyAction,
    createSlice,
    PayloadAction,
    Reducer,
} from '@reduxjs/toolkit';
import BN from 'bn.js';
import { Nullable, StateWithLoading } from '../common';
import { BalanceService } from '../services/balanceService';
import { AppThunk, Model } from '../store';

export type Balance = {
    total: BN;
    available: BN;
    isEnough: boolean;
}

export type BalanceState = {
    data: StateWithLoading<{
        balance: Nullable<Balance>
    }>
};

const initialState: BalanceState = {
    data: {
        balance: null,
        loading: true,
    },
};

const balance = createSlice({
    name: 'balance',
    initialState,
    reducers: {
        clearData(state) {
            state = initialState
        },
        getBalanceStart(state) {
            state.data.loading = true;
        },
        getBalanceSuccess(state, action: PayloadAction<Balance>) {
            state.data.balance = action.payload;
            state.data.loading = false;
        },
    },
});

const asyncActions: {
    fetchBalance: () => AppThunk;
} = {
    fetchBalance: () => async (dispatch) => {
        dispatch(balance.actions.getBalanceStart());
        const res = await BalanceService.fetchBalance();
        dispatch(balance.actions.getBalanceSuccess(res));
    }
}

export const BalanceModel: Model<
    typeof balance.actions,
    typeof asyncActions,
    Reducer<BalanceState, AnyAction>
> = Object.freeze({
    actions: balance.actions,
    asyncActions,
    reducer: balance.reducer,
});
