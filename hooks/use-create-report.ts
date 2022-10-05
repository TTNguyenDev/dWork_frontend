import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from '@tanstack/react-query';
import { ReportRepo } from '../repos';
import { useForm } from 'react-hook-form';
import { ReportCreateInput } from '../dtos';
import { useMemo } from 'react';
import { CachePrefixKeys } from '../constants';
import { useCurrentProposal } from './atoms';

export const useCreateReport = ({
  options,
}: {
  options?: Omit<
    UseMutationOptions<void, unknown, ReportCreateInput, unknown>,
    'mutationFn'
  >;
} = {}) => {
  const queryClient = useQueryClient();
  const { currentProposalState } = useCurrentProposal();
  const createReportForm = useForm<ReportCreateInput>();

  const createReportMutation = useMutation(
    (payload: ReportCreateInput) => ReportRepo.create(payload),
    options
  );

  const onSubmit = useMemo(
    () =>
      createReportForm.handleSubmit(async (data) => {
        await createReportMutation.mutateAsync({
          task_id: currentProposalState.taskId.value,
          report: data.report,
        });
        queryClient.invalidateQueries([CachePrefixKeys.PROPOSAL]);
      }),
    [createReportForm, currentProposalState.taskId.value]
  );

  return {
    createReportState: {
      isLoading: createReportMutation.isLoading,
      data: createReportMutation.data,
      form: createReportForm,
    },
    createReportMethods: {
      onSubmit,
    },
  };
};
