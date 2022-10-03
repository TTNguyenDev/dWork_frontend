import { hookstate, State } from '@hookstate/core';
import { TaskOrderBy } from '../constants';

export type TaskQueryState = {
  orderBy: TaskOrderBy;
  categoryId?: string;
  searchString?: string;
  ownerId?: string;
};

export const TaskQueryStateInitValue: TaskQueryState = {
  orderBy: TaskOrderBy.NEWEST,
  categoryId: '',
  searchString: '',
};

export const ExploreTaskQueryState: State<TaskQueryState> = hookstate({
  ...TaskQueryStateInitValue,
});

export const AccountTaskQueryState: State<TaskQueryState> = hookstate({
  ...TaskQueryStateInitValue,
});
