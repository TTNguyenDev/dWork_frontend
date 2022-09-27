import { useRouter } from 'next/router';
import { useCallback, useEffect } from 'react';
import { useBlockchain } from '../core/hooks';

export const useHeader = () => {
  const router = useRouter();
  const { blockchainState, blockchainMethods } = useBlockchain();

  const brandOnClick = useCallback(() => router.push('/'), [router]);

  return {
    headerState: {
      blockchainLoading: blockchainState.loading.get(),
      walletLoading: blockchainState.wallet.loading.get(),
      logged: blockchainState.wallet.logged.get(),
    },
    headerMethods: {
      signIn: blockchainMethods.signIn,
      signOut: blockchainMethods.signOut,
      brandOnClick,
    },
  };
};
