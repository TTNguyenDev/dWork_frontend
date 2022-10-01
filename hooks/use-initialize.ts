import { off } from 'process';
import { useEffect } from 'react';
import { CategoryCache, TaskCache } from '../cache';
import { StorageKeys } from '../constants';
import { Container } from '../core';
import { useBlockchain } from '../core/hooks';
import { BlockchainState } from '../core/store';
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
        const accountId = blockchainState.accountId.value;
        console.log(blockchainState.value);
        if (accountId) {
          const isRegistered = await AccountRepo.isRegistered(accountId);
          console.log('isRegistered', isRegistered);
          accountState.isRegistered.set(isRegistered);
          if (isRegistered) {
            const profile = await AccountRepo.getUserInfo(accountId);
            console.log('profile', profile);
            accountState.profile.set(profile);
          }
        }
      };

      // const storageMinimumBalance = await AccountRepo.storageMinimumBalance();

      await Promise.all([cacheData, checkIsRegisteredAndGetProfile()]);

      // Set app ready
      appState.merge({
        loading: false,
        ready: true,
      });
    })();
  }, [blockchainState.ready.value]);

  return {
    appState,
  };
};
