import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NearConfig } from '../config';
import { CONTRACT_NAME } from '../constants';
import { AppModel } from '../models/appModel';
import { AuthModel } from '../models/authModel';
import { ProfileModel } from '../models/profileModel';
import { AccountTypes } from '../models/types/accountType';
import { RootState } from '../store';

export const useApp = () => {
    const dispatch = useDispatch();
    const app = useSelector((state: RootState) => state.app);
    const auth = useSelector((state: RootState) => state.auth);
    const profile = useSelector((state: RootState) => state.profile);

    useEffect(() => {
        window.Buffer = window.Buffer || Buffer;

        // Remove old contract data
        if (NearConfig.contractName !== localStorage.getItem(CONTRACT_NAME)) {
            localStorage.clear();
            localStorage.setItem(CONTRACT_NAME, NearConfig.contractName);
        }

        // Set default theme
        const html = document.querySelector('html')!;
        html.dataset.theme = 'light';

        // Init app
        dispatch(AppModel.asyncActions.init());
    }, []);

    useEffect(() => {
        if (!app.data.ready) return;

        dispatch(AuthModel.actions.checkLoginStatus());
    }, [app.data.ready]);

    useEffect(() => {
        if (!auth.data.logged) return;

        dispatch(ProfileModel.asyncActions.fetchProfile());
    }, [auth.data.logged]);

    useEffect(() => {
        if (profile.data.info?.type === AccountTypes.WORKER) {
            dispatch(ProfileModel.asyncActions.fetchJobsJoined());
        }
    }, [profile.data.info?.type]);
};
