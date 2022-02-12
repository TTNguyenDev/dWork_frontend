import { combineReducers } from '@reduxjs/toolkit';
import { AppModel } from '../models/appModel';
import { AuthModel } from '../models/authModel';
import { BalanceModel } from '../models/balanceModel';

export const rootReducer = combineReducers({
    app: AppModel.reducer,
    auth: AuthModel.reducer,
    balance: BalanceModel.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
