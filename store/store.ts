import { configureStore, Action } from '@reduxjs/toolkit';
import { ThunkAction } from 'redux-thunk';
import { rootReducer, RootState } from './rootReducer';

export const store = configureStore({
    reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;
export type Model<
    T,
    K extends Record<string, (...args: any) => AppThunk>,
    L
    > = {
        actions: T;
        asyncActions: K;
        reducer: L;
    };
