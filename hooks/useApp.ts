import { useEffect } from "react"
import { useDispatch } from "react-redux";
import { NearConfig } from "../config";
import { CONTRACT_NAME } from "../constants";
import { AppModel } from "../models/appModel";

export const useApp = () => {
    const dispatch = useDispatch();

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
}