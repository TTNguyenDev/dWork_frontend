import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from '@tanstack/react-query';
import { ReportRepo } from '../repos';
import { useCallback } from 'react';
import { CachePrefixKeys } from '../constants';
import { useCurrentReport } from './atoms';

export const useApproveReport = ({
  options,
}: {
  options?: Omit<
    UseMutationOptions<void, unknown, void, unknown>,
    'mutationFn'
  >;
} = {}) => {
  const queryClient = useQueryClient();
  const { currentReportState } = useCurrentReport();
  const approveReportMutation = useMutation(
    () =>
      ReportRepo.approve({
        report_id: currentReportState.reportId.value,
      }),
    options
  );

  const submit = useCallback(async () => {
    await approveReportMutation.mutateAsync();
    queryClient.invalidateQueries([CachePrefixKeys.REPORT]);
  }, [currentReportState.reportId.value]);

  return {
    approveReportState: {
      isLoading: approveReportMutation.isLoading,
      data: approveReportMutation.data,
    },
    approveReportMethods: {
      submit,
    },
  };
};
