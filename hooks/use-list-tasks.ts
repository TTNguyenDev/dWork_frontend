import { useQuery } from '@tanstack/react-query';
import { TaskRepo } from '../repos';
import { CachePrefixKeys, TaskOrderBy } from '../constants';
import { ExploreTaskQueryState, TaskQueryState } from '../store';
import { useTaskQuery } from './atoms';

const buildWhereQuery = (payload: TaskQueryState): PouchDB.Find.Selector => {
  const selector: PouchDB.Find.Selector = {
    $and: [
      {
        created_at: { $exists: true },
        price: { $exists: true },
      },
      {
        category_id: payload.categoryId
          ? { $eq: payload.categoryId }
          : undefined,
      },
      {
        title: payload.searchString
          ? { $regex: payload.searchString }
          : undefined,
      },
    ],
  };

  return selector;
};

const buildSortQuery = (
  payload: TaskQueryState
): Array<string | { [propName: string]: 'asc' | 'desc' }> | undefined => {
  const sort:
    | Array<string | { [propName: string]: 'asc' | 'desc' }>
    | undefined = [];

  switch (payload.orderBy) {
    case TaskOrderBy.NEWEST:
      sort.push({ created_at: 'desc' });
      break;
    case TaskOrderBy.OLDEST:
      sort.push({ created_at: 'asc' });
      break;
    case TaskOrderBy.HIGEST_PRICE:
      sort.push({ price: 'desc' });
      break;
    case TaskOrderBy.LOWEST_PRICE:
      sort.push({ price: 'asc' });
      break;

    default:
      break;
  }

  return sort;
};

export const useListTasks = () => {
  const { taskQueryState } = useTaskQuery({
    state: ExploreTaskQueryState,
  });

  const listTasksQuery = useQuery(
    [CachePrefixKeys.TASK, taskQueryState.value],
    () =>
      TaskRepo.getList({
        skip: 0,
        limit: 10,
        selector: buildWhereQuery(taskQueryState.value),
        sort: buildSortQuery(taskQueryState.value),
      })
  );

  return {
    listTasksState: {
      isLoading: listTasksQuery.isLoading,
      data: listTasksQuery.data,
    },
    listTasksMethods: {},
  };
};
