import { useHookstate } from '@hookstate/core';
import { useEffect } from 'react';
import { CategoryCache } from '../cache';
import { useBlockchain } from '../core/hooks';
import { DB } from '../db';
import { AppState } from '../store';

export const useApp = () => {
  const { blockchainState, blockchainMethods } = useBlockchain();
  const appState = useHookstate(AppState);

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
      await Promise.all([CategoryCache.cache()]);
      console.info('App cached!!!');

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
