import { useQuery } from '@tanstack/react-query';
import { CategoryRepo } from '../repos';
import { CachePrefixKeys } from '../constants';
import { useTaskQuery } from './atoms';
import { ExploreTaskQueryState } from '../store';

export const useTaskCategories = () => {
  const { taskQueryState, taskQueryMethods } = useTaskQuery({
    state: ExploreTaskQueryState,
  });

  const taskCategoriesQuery = useQuery([CachePrefixKeys.CATEGORY], () =>
    CategoryRepo.getList({ skip: 0, limit: 6 })
  );

  return {
    taskCategoriesState: {
      isLoading: taskCategoriesQuery.isLoading,
      data: taskCategoriesQuery.data,
      activeCategory: taskQueryState.categoryId.value,
    },
    taskCategoriesMethods: {
      btnCategoryOnClick: taskQueryMethods.setCategoryId,
    },
  };
};
