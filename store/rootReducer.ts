import { combineReducers } from '@reduxjs/toolkit';
import { AppModel } from '../models/appModel';
import { AuthModel } from '../models/authModel';
import { BalanceModel } from '../models/balanceModel';
import { ProfileModel } from '../models/profileModel';

export const rootReducer = combineReducers({
    app: AppModel.reducer,
    auth: AuthModel.reducer,
    balance: BalanceModel.reducer,
    profile: ProfileModel.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
