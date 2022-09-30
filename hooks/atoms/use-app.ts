import { useHookstate } from '@hookstate/core';
import { AppState } from '../../store';

export const useApp = () => {
  const appState = useHookstate(AppState);

  return {
    appState,
  };
};
