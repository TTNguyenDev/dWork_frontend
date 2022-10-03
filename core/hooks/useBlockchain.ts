import React from 'react';
import { Container } from '../container';
import { useHookstate } from '@hookstate/core';
import { BlockchainState } from '../store';
import { parseToUsername } from '../utils';

export const useBlockchain = () => {
  const blockchainState = useHookstate(BlockchainState);

  const _checkLogged = async () => {
    const isSignedIn = await Container.bcConnector.isSignedIn();
    blockchainState.wallet.merge({
      logged: isSignedIn,
    });
    if (isSignedIn) {
      const accountId = Container.bcConnector.wallet.getAccountId();
      blockchainState.accountId.set(accountId);
      // get account balance
      const accountBalance = await Container.bcConnector.wallet
        .account()
        .getAccountBalance();

      // update wallet state
      blockchainState.wallet.account.merge({
        id: accountId,
        username: parseToUsername(accountId),
        balance: accountBalance,
      });
    }
    blockchainState.wallet.merge({
      loading: false,
    });
  };

  /////

  const connect = React.useCallback(async () => {
    await Container.bcConnector.connect();
    blockchainState.merge({
      loading: false,
      ready: true,
    });
    await _checkLogged();
  }, []);

  const signIn = React.useCallback(async () => {
    if (blockchainState.ready.value) {
      BlockchainState.wallet.loading.set(true);
      await Container.bcConnector.signIn();
    }
  }, []);

  const signOut = React.useCallback(async () => {
    if (blockchainState.ready.value) {
      BlockchainState.wallet.loading.set(true);
      await Container.bcConnector.signOut();
      // await _checkLogged();
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
