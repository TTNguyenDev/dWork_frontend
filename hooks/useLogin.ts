import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AuthModel } from '../models/authModel';
import { RootState } from '../store';

export type UseLoginOutput = {
    loading: boolean;
    requestLogin: () => void;
};

export const useLogin = (): UseLoginOutput => {
    const dispatch = useDispatch();
    const auth = useSelector((state: RootState) => state.auth);

    const requestLogin = useCallback(() => {
        dispatch(AuthModel.asyncActions.logIn());
    }, []);

    return {
        loading: auth.login.loading,
        requestLogin,
    };
};
