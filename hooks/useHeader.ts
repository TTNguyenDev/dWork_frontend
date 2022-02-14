import { useSelector } from 'react-redux';
import { Nullable } from '../common';
import { AccountTypes } from '../models/types/accountType';
import { RootState } from '../store';
import { useLogin } from './useLogin';
import { useLogout } from './useLogout';

export type UseHeaderOutput = {
    authLoading: boolean;
    logged: boolean;
    userId: Nullable<string>;
    accountType: AccountTypes;
    loginLoading: boolean;
    requestLogin: () => void;
    logoutLoading: boolean;
    requestLogout: () => void;
};

export const useHeader = (): UseHeaderOutput => {
    const auth = useSelector((state: RootState) => state.auth);
    const profile = useSelector((state: RootState) => state.profile);

    const { loading: loginLoading, requestLogin } = useLogin();
    const { loading: logoutLoading, requestLogout } = useLogout();

    return {
        authLoading: auth.data.loading,
        logged: auth.data.logged,
        userId: auth.data.userId,
        accountType: profile.data.info?.type!,
        loginLoading,
        requestLogin,
        logoutLoading,
        requestLogout,
    };
};
