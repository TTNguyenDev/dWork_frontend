import { useCallback, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { AuthModel } from "../models/authModel";
import { RootState } from "../store";

export type UseLogoutOutput = {
    loading: boolean,
    requestLogout: () => void,
}

export const useLogout = (): UseLogoutOutput => {
    const dispatch = useDispatch();
    const auth = useSelector((state: RootState) => state.auth);

    const requestLogout = useCallback(() => {
        dispatch(AuthModel.asyncActions.logOut())
    }, [])

    return {
        loading: auth.logout.loading,
        requestLogout
    }
}