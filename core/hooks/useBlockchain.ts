import React from 'react';
import { Container } from '../container';
import { useHookstate } from '@hookstate/core';
import { BlockchainState } from '../store';

export const useBlockchain = () => {
  const blockchainState = useHookstate(BlockchainState);

  const _checkLogged = async () => {
    const isSignedIn = await Container.blockchainConnector.isSignedIn();
    blockchainState.wallet.merge({
      logged: isSignedIn,
    });
    if (isSignedIn) {
      const accountId = Container.blockchainConnector.wallet.getAccountId();
      // get account balance
      const accountBalance = await Container.blockchainConnector.wallet
        .account()
        .getAccountBalance();

      // update wallet state
      blockchainState.wallet.account.merge({
        id: accountId,
        username: accountId.replace('.testnet', '').replace('.near', ''),
        balance: accountBalance,
      });
    }
    blockchainState.wallet.merge({
      loading: false,
    });
  };

  /////

  const connect = React.useCallback(async () => {
    await Container.blockchainConnector.connect();
    blockchainState.merge({
      loading: false,
      ready: true,
    });
    await _checkLogged();
  }, []);

  const signIn = React.useCallback(async () => {
    if (blockchainState.ready.get()) {
      BlockchainState.wallet.loading.set(true);
      await Container.blockchainConnector.signIn();
    }
  }, []);

  const signOut = React.useCallback(async () => {
    if (blockchainState.ready.get()) {
      BlockchainState.wallet.loading.set(true);
      await Container.blockchainConnector.signOut();
      await _checkLogged();
    }
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
