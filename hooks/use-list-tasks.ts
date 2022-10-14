import { useQuery } from '@tanstack/react-query';
import { TaskRepo } from '../repos';
import { CachePrefixKeys, TaskOrderBy, TaskStatus } from '../constants';
import { AccountState, TaskQueryState } from '../store';
import { useTaskQuery } from './atoms';
import { State } from '@hookstate/core';

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
          ? { $regex: RegExp(payload.searchString, 'i') }
          : undefined,
      },
      {
        owner: payload.ownerId ? { $eq: payload.ownerId } : undefined,
      },
      payload.status === TaskStatus.AVAILABLE
        ? {
            available_until: { $gt: Date.now() },
            id: {
              $nin: AccountState.profile.value
                ? AccountState.profile.value.completed_jobs
                : [],
            },
          }
        : {},
      payload.status === TaskStatus.COMPLETED
        ? {
            id: {
              $in: AccountState.profile.value
                ? AccountState.profile.value.completed_jobs
                : [],
            },
          }
        : {},
      payload.status === TaskStatus.EXPIRED
        ? {
            available_until: { $lte: Date.now() },
          }
        : {},
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

export const useListTasks = ({ state }: { state: State<TaskQueryState> }) => {
  const { taskQueryState } = useTaskQuery({
    state,
  });

  const listTasksQuery = useQuery(
    [CachePrefixKeys.TASK, taskQueryState.value],
    () =>
      TaskRepo.getList({
        skip: 0,
        limit: 1000,
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
