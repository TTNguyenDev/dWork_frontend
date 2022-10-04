import { ProposalStatus, ProposalStatusRejected } from '../dtos';

export * from './auth.utils';
export * from './modal.utils';

export const getProposalStatus = (
  status: ProposalStatus | ProposalStatusRejected
) => {
  if (typeof status === 'string') return status;
  if (typeof status === 'object') {
    if (status.Rejected?.report_id) return ProposalStatus.Reporting;
    if (status.Rejected) return ProposalStatus.Rejected;
    if (status.RejectedByAdmin) return ProposalStatus.RejectedByAdmin;
  }
  return '';
};
