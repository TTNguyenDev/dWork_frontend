import {
  PRICE_FRACTION_DIGITS,
  RATIO_AMOUT_TO_CREATE_TASK,
} from '../constants';
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

export const calcAmountToCreateTask = ({
  price,
  max_participants,
}: {
  price: string;
  max_participants: number;
}) => {
  return Number(
    (Number(price) * max_participants * RATIO_AMOUT_TO_CREATE_TASK).toFixed(
      PRICE_FRACTION_DIGITS
    )
  );
};
