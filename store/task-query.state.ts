import { hookstate, State } from '@hookstate/core';
import { TaskOrderBy } from '../constants';

export type TaskQueryState = {
  orderBy: TaskOrderBy;
  categoryId?: string;
  searchString?: string;
};

export const ExploreTaskQueryStateInitValue: TaskQueryState = {
  orderBy: TaskOrderBy.NEWEST,
  categoryId: '',
  searchString: '',
};

export const ExploreTaskQueryState: State<TaskQueryState> = hookstate(
  ExploreTaskQueryStateInitValue
);
