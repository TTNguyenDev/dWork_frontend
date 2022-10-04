import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from '@tanstack/react-query';
import { ReportRepo } from '../repos';
import { useCallback } from 'react';
import { CachePrefixKeys } from '../constants';
import { useCurrentReport } from './atoms';

export const useRejectReport = ({
  options,
}: {
  options?: Omit<
    UseMutationOptions<void, unknown, void, unknown>,
    'mutationFn'
  >;
} = {}) => {
  const queryClient = useQueryClient();
  const { currentReportState } = useCurrentReport();
  const rejectReportMutation = useMutation(
    () =>
      ReportRepo.reject({
        report_id: currentReportState.reportId.value,
      }),
    options
  );

  const submit = useCallback(async () => {
    await rejectReportMutation.mutateAsync();
    queryClient.invalidateQueries([CachePrefixKeys.REPORT]);
  }, [currentReportState.reportId.value]);

  return {
    rejectReportState: {
      isLoading: rejectReportMutation.isLoading,
      data: rejectReportMutation.data,
    },
    rejectReportMethods: {
      submit,
    },
  };
};
