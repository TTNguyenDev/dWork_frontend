import React from 'react';
import { Container } from '../container';
import { useHookstate } from '@hookstate/core';
import { BlockchainState } from '../store';

export const useBlockchain = () => {
    const blockchainState = useHookstate(BlockchainState);

    const connect = React.useCallback(async () => {
        await Container.blockchainConnector.connect();
        blockchainState.loading.set(false);
        blockchainState.ready.set(true);
    }, []);

    const signIn = React.useCallback(async () => {
        if (blockchainState.ready.get())
            await Container.blockchainConnector.signIn();
    }, []);

    const signOut = React.useCallback(async () => {
        if (blockchainState.ready.get())
            await Container.blockchainConnector.signOut();
    }, []);

    return {
        blockchainState,
        blockchainMethods: {
            connect,
            signIn,
            signOut,
        },
    };
};
