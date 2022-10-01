import { useQuery } from '@tanstack/react-query';
import { CachePrefixKeys } from '../constants';
import { AccountRepo } from '../repos';

export const useProfileCard = ({ accountId }: { accountId: string }) => {
  const accountQuery = useQuery(
    [CachePrefixKeys.ACCOUNT, accountId],
    () => AccountRepo.getUserInfo(accountId),
    {
      enabled: !!accountId,
    }
  );

  return {
    profileCardState: {
      data: accountQuery.data,
      isLoading: accountQuery.isLoading,
    },
  };
};
