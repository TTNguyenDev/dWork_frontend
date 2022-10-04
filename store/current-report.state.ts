import { hookstate, State } from '@hookstate/core';

export type CurrentReportState = {
  reportId: string;
};
export const CurrentReportState: State<CurrentReportState> = hookstate({
  reportId: '',
} as CurrentReportState);
