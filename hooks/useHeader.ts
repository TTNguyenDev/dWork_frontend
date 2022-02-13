import { useSelector } from "react-redux";
import { Nullable } from "../common";
import { RootState } from "../store";
import { useLogin } from "./useLogin";
import { useLogout } from "./useLogout";

export type UseHeaderOutput = {
    authLoading: boolean,
    logged: boolean,
    userId: Nullable<string>,
    loginLoading: boolean,
    requestLogin: () => void,
    logoutLoading: boolean,
    requestLogout: () => void,
}

export const useHeader = (): UseHeaderOutput => {
    const auth = useSelector((state: RootState) => state.auth);
    const { loading: loginLoading, requestLogin } = useLogin();
    const { loading: logoutLoading, requestLogout } = useLogout();

    return {
        authLoading: auth.data.loading,
        logged: auth.data.logged,
        userId: auth.data.userId,
        loginLoading,
        requestLogin,
        logoutLoading,
        requestLogout,
    }
}