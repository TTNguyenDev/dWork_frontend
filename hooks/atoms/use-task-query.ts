import { State, useHookstate } from '@hookstate/core';
import { useCallback, useEffect } from 'react';
import { TaskOrderBy } from '../../constants';
import { TaskQueryState, TaskQueryStateInitValue } from '../../store';

export const useTaskQuery = ({
  state,
  defaultQuery,
}: {
  state: State<TaskQueryState>;
  defaultQuery?: Partial<TaskQueryState>;
}) => {
  const taskQueryState = useHookstate(state);

  useEffect(() => {
    if (defaultQuery) taskQueryState.merge(defaultQuery);
  }, [defaultQuery]);

  // useEffect(() => {
  //   return () => {
  //     taskQueryState.merge({ ...TaskQueryStateInitValue });
  //   };
  // }, []);

  const setOrderBy = useCallback((value: TaskOrderBy) => {
    taskQueryState.orderBy.set(value);
  }, []);

  const setCategoryId = useCallback((value: string) => {
    taskQueryState.categoryId.set(value);
  }, []);

  const setSearchString = useCallback((value: string) => {
    taskQueryState.searchString.set(value);
  }, []);

  console.log(taskQueryState.value);

  return {
    taskQueryState,
    taskQueryMethods: {
      setOrderBy,
      setCategoryId,
      setSearchString,
    },
  };
};
