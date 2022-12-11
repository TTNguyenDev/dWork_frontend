import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { TaskRepo } from '../repos';
import {
  CachePrefixKeys,
  FETCH_TASKS_LIMIT,
  TaskOrderBy,
  TaskStatus,
} from '../constants';
import { AccountState, TaskQueryState } from '../store';
import { useTaskQuery } from './atoms';
import { State } from '@hookstate/core';
import { useMemo } from 'react';
import { TaskDto } from '../dtos';

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

  const listTasksQuery = useInfiniteQuery({
    queryKey: [CachePrefixKeys.TASK, taskQueryState.value],
    queryFn: ({ pageParam: { skip } = {} }) =>
      TaskRepo.getList({
        skip,
        limit: FETCH_TASKS_LIMIT,
        selector: buildWhereQuery(taskQueryState.value),
        sort: buildSortQuery(taskQueryState.value),
      }),
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < FETCH_TASKS_LIMIT) return undefined;
      const skip = allPages.length * FETCH_TASKS_LIMIT;
      return {
        skip,
      };
    },
    keepPreviousData: true,
  });

  const listTasks = useMemo(() => {
    if (listTasksQuery.data?.pages.length) {
      return listTasksQuery.data.pages.reduce(
        (a: TaskDto[], b: TaskDto[]) => [...a, ...b],
        []
      );
    } else return [];
  }, [listTasksQuery.data?.pages]);

  return {
    listTasksState: {
      isLoading: listTasksQuery.isLoading,
      data: listTasks,
      hasNextPage: listTasksQuery.hasNextPage,
    },
    listTasksMethods: {
      fetchNextPage: listTasksQuery.fetchNextPage,
    },
  };
};
