import { format } from 'near-api-js/lib/utils';
import { useBlockchain } from '../core/hooks';

export const useUserHeader = () => {
  const { blockchainState, blockchainMethods } = useBlockchain();
  const account = blockchainState.wallet.account.get();

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
    },
    userHeaderMethods: {
      signIn: blockchainMethods.signIn,
      signOut: blockchainMethods.signOut,
    },
  };
};
