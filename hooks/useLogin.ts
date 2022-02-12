import { useCallback, useState } from "react"
import { AuthService } from "../services/authService";

export type UseLoginOutput = {
    loading: boolean,
    requestLogin: () => Promise<void>,
}

export const useLogin = (): UseLoginOutput => {
    const [loading, setLoading] = useState<boolean>(false);

    const requestLogin = useCallback(async () => {
        setLoading(true);
        await AuthService.logIn();
        setLoading(false);
    }, [])

    return {
        loading,
        requestLogin
    }
}