import React from 'react';
import { Container } from '../container';
import { useHookstate } from '@hookstate/core';
import { BlockchainState } from '../store';

export const useBlockchain = () => {
  const blockchainState = useHookstate(BlockchainState);

  const connect = React.useCallback(async () => {
    await Container.blockchainConnector.connect();
    blockchainState.merge({
      loading: false,
      ready: true,
    });

    const isSignedIn = await Container.blockchainConnector.isSignedIn();
    blockchainState.wallet.merge({
      loading: false,
      logged: isSignedIn,
    });
    blockchainState.wallet.logged.set(isSignedIn);
  }, []);

  const signIn = React.useCallback(async () => {
    if (blockchainState.ready.get()) {
      BlockchainState.wallet.loading.set(true);
      await Container.blockchainConnector.signIn();
    }
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
