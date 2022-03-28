import { useEffect } from 'react';
import { useQueryClient } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { NearConfig } from '../config';
import { CONTRACT_NAME } from '../constants';
import { db } from '../db';
import { AppModel } from '../models/appModel';
import { AuthModel } from '../models/authModel';
import { ProfileModel } from '../models/profileModel';
import { RootState } from '../store';

export const useApp = () => {
    const dispatch = useDispatch();
    const queryClient = useQueryClient();

    const app = useSelector((state: RootState) => state.app);
    const auth = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        window.Buffer = window.Buffer || Buffer;

        (async () => {
            // Remove old contract data
            if (
                NearConfig.contractName !== localStorage.getItem(CONTRACT_NAME)
            ) {
                await Promise.all([
                    db.tasks.clear(),
                    db.accountTasks.clear(),
                    db.accountCompletedTasks.clear(),
                ]);
                console.log('closed');
                localStorage.clear();
                localStorage.setItem(CONTRACT_NAME, NearConfig.contractName);
            }

            // Set default theme
            const html = document.querySelector('html')!;
            html.dataset.theme = 'light';

            // Init app
            dispatch(AppModel.asyncActions.init());
        })();
    }, []);

    useEffect(() => {
        if (!app.data.ready) return;

        dispatch(AppModel.asyncActions.cache());
        dispatch(AuthModel.actions.checkLoginStatus());
    }, [app.data.ready]);

    useEffect(() => {
        if (!auth.data.logged) return;

        dispatch(AppModel.asyncActions.accountTasksCache());
        dispatch(ProfileModel.asyncActions.fetchProfile());
    }, [auth.data.logged]);

    useEffect(() => {
        if (app.data.cacheReady) queryClient.invalidateQueries();
    }, [app.data.cacheReady]);
};
