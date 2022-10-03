import { hookstate, State } from '@hookstate/core';

export type CurrentReportState = {
  taskId: string;
  reportId: string;
};
export const CurrentReportState: State<CurrentReportState> = hookstate({
  taskId: '',
  reportId: '',
} as CurrentReportState);
