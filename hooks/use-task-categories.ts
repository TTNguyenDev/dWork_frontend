import { useQuery } from '@tanstack/react-query';
import { CategoryRepo } from '../repos';
import { CachePrefixKeys } from '../constants';

export const useTaskCategories = () => {
  const taskCategoriesQuery = useQuery([CachePrefixKeys.CATEGORY], () =>
    CategoryRepo.getList({ skip: 0, limit: 6 })
  );

  return {
    taskCategoriesState: {
      isLoading: taskCategoriesQuery.isLoading,
      data: taskCategoriesQuery.data,
    },
    taskCategoriesMethods: {},
  };
};
