import { hookstate, State } from '@hookstate/core';

export type CurrentProposalState = {
  taskId: string;
  workerId: string;
};
export const CurrentProposalState: State<CurrentProposalState> = hookstate({
  taskId: '',
  workerId: '',
} as CurrentProposalState);
