import { State, useHookstate } from '@hookstate/core';
import { useCallback } from 'react';
import { TaskOrderBy } from '../../constants';
import { TaskQueryState } from '../../store';

export const useTaskQuery = ({ state }: { state: State<TaskQueryState> }) => {
  const taskQueryState = useHookstate(state);

  const setOrderBy = useCallback((value: TaskOrderBy) => {
    taskQueryState.orderBy.set(value);
  }, []);

  const setCategoryId = useCallback((value: string) => {
    taskQueryState.categoryId.set(value);
  }, []);

  const setSearchString = useCallback((value: string) => {
    taskQueryState.searchString.set(value);
  }, []);

  return {
    taskQueryState,
    taskQueryMethods: {
      setOrderBy,
      setCategoryId,
      setSearchString,
    },
  };
};
