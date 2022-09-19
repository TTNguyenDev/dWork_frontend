import React from 'react';
import { Container } from '../container';
import { useAtom } from 'jotai';
import { blockchainLoadingAtom, blockchainReadyAtom } from '../store';

export const useBlockchain = () => {
    const [,] = useAtom(blockchainLoadingAtom);
    const [] = useAtom(blockchainReadyAtom);
    const connect = React.useCallback(async () => {
        await Container.blockchainConnector.connect();
    }, []);
};
