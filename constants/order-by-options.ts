export enum TaskOrderBy {
  NEWEST = 'newest',
  OLDEST = 'oldest',
  HIGEST_PRICE = 'highest_price',
  LOWEST_PRICE = 'lowest_price',
}
export const TaskOrderByOptions = [
  {
    label: 'Newest',
    value: TaskOrderBy.NEWEST,
  },
  {
    label: 'Oldest',
    value: TaskOrderBy.OLDEST,
  },
  {
    label: 'Highest price',
    value: TaskOrderBy.HIGEST_PRICE,
  },
  {
    label: 'Lowest price',
    value: TaskOrderBy.LOWEST_PRICE,
  },
];

export enum TaskStatus {
  AVAILABLE = 'AVAILABLE',
  COMPLETED = 'COMPLETED',
  EXPIRED = 'EXPIRED',
}

export const TaskStatusOptions = [
  {
    label: 'Available',
    value: TaskStatus.AVAILABLE,
  },
  {
    label: 'Completed',
    value: TaskStatus.COMPLETED,
  },
  {
    label: 'Expired',
    value: TaskStatus.EXPIRED,
  },
];
