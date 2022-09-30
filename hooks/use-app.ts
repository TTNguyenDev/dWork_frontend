import { useHookstate } from '@hookstate/core';
import { format } from 'near-api-js/lib/utils';
import { useEffect } from 'react';
import { CategoryCache, TaskCache } from '../cache';
import { useBlockchain } from '../core/hooks';
import { DB } from '../db';
import { AccountRepo } from '../repos';
import { useAccount, useApp } from './atoms';

export const useInitialize = () => {
  const { blockchainState, blockchainMethods } = useBlockchain();
  const { appState } = useApp();
  const { accountState } = useAccount();

  useEffect(() => {
    (async () => {
      await DB.init();
      await blockchainMethods.connect();
    })();
  }, []);

  useEffect(() => {
    if (!blockchainState.ready.get()) return;

    // Cache data before app ready
    (async () => {
      const cacheData = Promise.all([
        CategoryCache.cache(),
        TaskCache.cache(),
      ]).then(() => {
        console.info('App cached!!!');
      });

      const checkIsRegistered = AccountRepo.isRegistered().then(
        (isRegistered) => {
          console.log('checkIsRegistered', isRegistered);
          accountState.merge({
            isRegistered,
          });
        }
      );

      const storageMinimumBalance = await AccountRepo.storageMinimumBalance();

      await Promise.all([cacheData, checkIsRegistered]);

      // Set app ready
      appState.merge({
        loading: false,
        ready: true,
      });
    })();
  }, [blockchainState.ready.get()]);

  return {
    appState,
  };
};
