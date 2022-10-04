import { off } from 'process';
import { useEffect } from 'react';
import { CategoryCache, TaskCache } from '../cache';
import { StorageKeys } from '../constants';
import { Container } from '../core';
import { useBlockchain, useWalletAccountId } from '../core/hooks';
import { BlockchainState } from '../core/store';
import { DB } from '../db';
import { AccountRepo } from '../repos';
import { useAccount, useApp } from './atoms';

export const useInitialize = () => {
  const { blockchainState, blockchainMethods } = useBlockchain();
  const { accountId } = useWalletAccountId();
  const { appState } = useApp();
  const { accountState, accountMethods } = useAccount();

  useEffect(() => {
    (async () => {
      await DB.init();
      const oldContractId = localStorage.getItem(StorageKeys.CONTRACT_ID);
      if (oldContractId !== Container.bcConnector.config.contractId) {
        // clear old data
        localStorage.clear();
        await DB.destroy();
        await DB.init();
        localStorage.setItem(
          StorageKeys.CONTRACT_ID,
          Container.bcConnector.config.contractId
        );
      }
      await blockchainMethods.connect();
    })();
  }, []);

  useEffect(() => {
    if (!blockchainState.ready.value) return;

    // Cache data before app ready
    (async () => {
      const cacheData = Promise.all([
        CategoryCache.cache(),
        TaskCache.cache(),
      ]).then(() => {
        console.info('App cached!!!');
      });

      const checkIsRegisteredAndGetProfile = async () => {
        console.log('blockchainState', blockchainState.value);
        if (accountId) {
          const [isRegistered, isAdmin] = await Promise.all([
            AccountRepo.isRegistered(accountId),
            AccountRepo.isAdmin(accountId),
          ]);
          console.log('isRegistered', isRegistered);
          console.log('isAdmin', isAdmin);
          accountState.isRegistered.set(isRegistered);
          accountState.isAdmin.set(isAdmin);
          if (isRegistered) {
            await accountMethods.fetchProfile();
          }
        }
      };

      await Promise.all([cacheData, checkIsRegisteredAndGetProfile()]);

      // Set app ready
      appState.merge({
        loading: false,
        ready: true,
      });
    })();
  }, [blockchainState.ready.value, accountId]);

  return {
    appState,
  };
};
