import { format } from 'near-api-js/lib/utils';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { useBlockchain } from '../core/hooks';
import { AuthUtils } from '../utils';
import { useAccount } from './atoms/use-account';
import { useStorageDeposit } from './use-storage-deposit';

export const useUserHeader = () => {
  const router = useRouter();
  const { blockchainState, blockchainMethods } = useBlockchain();
  const { accountState } = useAccount();

  const account = blockchainState.wallet.account.get();

  const btnCreateNewTaskOnClick = useCallback(() => {
    AuthUtils.authCheckAndExec(() => router.push('/task/create'));
  }, [router]);

  return {
    userHeaderState: {
      loading:
        blockchainState.loading.get() || blockchainState.wallet.loading.get(),
      account: account
        ? {
            id: account.id,
            username: account.username,
            balance: {
              available: Number(
                format.formatNearAmount(account.balance.available)
              ).toFixed(2),
            },
          }
        : undefined,
      isRegistered: accountState.isRegistered.get(),
    },
    userHeaderMethods: {
      signIn: blockchainMethods.signIn,
      signOut: blockchainMethods.signOut,
      btnCreateNewTaskOnClick,
    },
  };
};
