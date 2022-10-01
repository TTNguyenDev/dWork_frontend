import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { useBlockchain } from '../core/hooks';

export const useHeader = () => {
  const router = useRouter();
  const { blockchainState, blockchainMethods } = useBlockchain();

  const brandOnClick = useCallback(() => router.push('/'), [router]);

  return {
    headerState: {
      blockchainLoading: blockchainState.loading.value,
      walletLoading: blockchainState.wallet.loading.value,
      logged: blockchainState.wallet.logged.value,
    },
    headerMethods: {
      signIn: blockchainMethods.signIn,
      signOut: blockchainMethods.signOut,
      brandOnClick,
    },
  };
};
