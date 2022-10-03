import { useHookstate } from '@hookstate/core';
import { CurrentReportState } from '../../store';

export const useCurrentReport = () => {
  const currentReportState = useHookstate(CurrentReportState);

  return {
    currentReportState,
  };
};
