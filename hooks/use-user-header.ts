import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { useBlockchain } from '../core/hooks';
import { AuthUtils } from '../utils';
import { useAccount } from './atoms/use-account';

export const useUserHeader = () => {
  const router = useRouter();
  const { blockchainState, blockchainMethods } = useBlockchain();
  const { accountState } = useAccount();

  const account = blockchainState.wallet.account.value;

  const btnCreateNewTaskOnClick = useCallback(() => {
    AuthUtils.authCheckAndExec(() => router.push('/task/create'));
  }, [router]);

  return {
    userHeaderState: {
      loading:
        blockchainState.loading.value || blockchainState.wallet.loading.value,
      account: account
        ? {
            id: account.id,
            username: account.username,
            balance: {
              available: Number(
                accountState.profile.value?.balance ?? 0
              ).toFixed(2),
            },
          }
        : undefined,
      isRegistered: accountState.isRegistered.value,
    },
    userHeaderMethods: {
      signIn: blockchainMethods.signIn,
      signOut: () => {
        blockchainMethods.signOut(), window.location.replace('/');
      },
      btnCreateNewTaskOnClick,
    },
  };
};
