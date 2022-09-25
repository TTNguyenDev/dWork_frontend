import { useQuery } from '@tanstack/react-query';
import { TaskRepo } from '../repos';
import { CachePrefixKeys } from '../constants';

export const useListTasks = () => {
  const listTasksQuery = useQuery([CachePrefixKeys.TASK], () =>
    TaskRepo.getList({ skip: 0, limit: 10 })
  );

  return {
    listTasksState: {
      isLoading: listTasksQuery.isLoading,
      data: listTasksQuery.data,
    },
    listTasksMethods: {},
  };
};
