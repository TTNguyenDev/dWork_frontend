import { useMemo } from 'react';
import { TaskOrderByOptions } from '../constants';
import { ExploreTaskQueryState } from '../store';
import { useTaskQuery } from './atoms';

export const useExplore = () => {
  const { taskQueryState, taskQueryMethods } = useTaskQuery({
    state: ExploreTaskQueryState,
  });

  const defaultOrderBy = useMemo(
    () =>
      TaskOrderByOptions.find((i) => i.value === taskQueryState.orderBy.value),
    [taskQueryState.orderBy.value]
  );

  return {
    exploreState: {
      taskQueryState,
      defaultOrderBy,
    },
    exploreMethods: {
      taskQueryMethods,
    },
  };
};
