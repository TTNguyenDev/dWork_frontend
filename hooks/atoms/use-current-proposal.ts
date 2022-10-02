import { useHookstate } from '@hookstate/core';
import { CurrentProposalState } from '../../store';

export const useCurrentProposal = () => {
  const currentProposalState = useHookstate(CurrentProposalState);

  return {
    currentProposalState,
  };
};
