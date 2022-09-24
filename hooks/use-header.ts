import { useEffect } from 'react';
import { useBlockchain } from '../core/hooks';

export const useHeader = () => {
  const { blockchainState, blockchainMethods } = useBlockchain();

  return {
    headerState: {
      blockchainLoading: blockchainState.loading.get(),
      walletLoading: blockchainState.wallet.loading.get(),
      logged: blockchainState.wallet.logged.get(),
    },
    headerMethods: {
      signIn: blockchainMethods.signIn,
      signOut: blockchainMethods.signOut,
    },
  };
};
