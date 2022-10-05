import { hookstate, State } from '@hookstate/core';
import { TaskOrderBy, TaskStatus } from '../constants';

export type TaskQueryState = {
  orderBy: TaskOrderBy;
  categoryId?: string;
  searchString?: string;
  ownerId?: string;
  status?: TaskStatus;
};

export const ExploreTaskQueryStateInitValue: TaskQueryState = {
  orderBy: TaskOrderBy.NEWEST,
  categoryId: '',
  searchString: '',
  status: TaskStatus.AVAILABLE,
};

export const AccountTaskQueryStateInitValue: TaskQueryState = {
  orderBy: TaskOrderBy.NEWEST,
  categoryId: '',
  searchString: '',
  status: TaskStatus.AVAILABLE,
};

export const ExploreTaskQueryState: State<TaskQueryState> = hookstate({
  ...ExploreTaskQueryStateInitValue,
});

export const AccountTaskQueryState: State<TaskQueryState> = hookstate({
  ...AccountTaskQueryStateInitValue,
});
