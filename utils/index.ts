import { ProposalStatus, ProposalStatusRejected } from '../dtos';

export * from './auth.utils';
export * from './modal.utils';

export const getProposalStatus = (
  status: ProposalStatus | ProposalStatusRejected
) => {
  if (typeof status === 'string') return status;
  if (typeof status === 'object' && status.Rejected) {
    if (status.Rejected.report_id) return ProposalStatus.Reporting;
    return ProposalStatus.Rejected;
  }
  return '';
};
