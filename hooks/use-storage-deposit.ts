import { useMutation } from '@tanstack/react-query';
import { AccountRepo } from '../repos';
import { useCallback } from 'react';

export const useStorageDeposit = () => {
  const useStorageDepositMutation = useMutation(() =>
    AccountRepo.storageDeposit()
  );

  const deposit = useCallback(
    () => useStorageDepositMutation.mutateAsync(),
    []
  );

  return {
    storageDepositState: {
      isLoading: useStorageDepositMutation.isLoading,
      data: useStorageDepositMutation.data,
    },
    storageDepositMethods: {
      deposit,
    },
  };
};
