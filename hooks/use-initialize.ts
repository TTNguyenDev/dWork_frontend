import { off } from 'process';
import { useEffect } from 'react';
import { CategoryCache, TaskCache } from '../cache';
import { StorageKeys } from '../constants';
import { Container } from '../core';
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
      const oldContractId = localStorage.getItem(StorageKeys.CONTRACT_ID);
      if (oldContractId !== Container.bcConnector.config.contractId) {
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

      const checkIsRegistered = AccountRepo.isRegistered().then(
        (isRegistered) => {
          console.log('checkIsRegistered', isRegistered);
          accountState.merge({
            isRegistered,
          });
        }
      );

      // const storageMinimumBalance = await AccountRepo.storageMinimumBalance();

      await Promise.all([cacheData, checkIsRegistered]);

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
