import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { NearConfig } from "../config";
import { CONTRACT_NAME } from "../constants";
import { AppModel } from "../models/appModel";
import { AuthModel } from "../models/authModel";
import { RootState } from "../store";

export const useApp = () => {
    const dispatch = useDispatch();
    const app = useSelector((state: RootState) => state.app);

    useEffect(() => {
        window.Buffer = window.Buffer || Buffer;

        // Remove old contract data
        if (NearConfig.contractName !== localStorage.getItem(CONTRACT_NAME)) {
            localStorage.clear();
            localStorage.setItem(CONTRACT_NAME, NearConfig.contractName);
        }

        // Set default theme
        const html = document.querySelector("html")!;
        html.dataset.theme = "light";

        // Init app
        dispatch(AppModel.asyncActions.init())
    }, []);

    useEffect(() => {
        if (!app.data.ready)
            return;

        dispatch(AuthModel.actions.checkLoginStatus())

    }, [app.data.ready])
}