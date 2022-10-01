import { Input } from '@chakra-ui/react';
import { debounce } from '../../core/utils';
import { useTaskQuery } from '../../hooks';
import { ExploreTaskQueryState } from '../../store';

export const TaskSearchBox = () => {
  const { taskQueryState, taskQueryMethods } = useTaskQuery({
    state: ExploreTaskQueryState,
  });

  const searchInputOnChange = debounce(taskQueryMethods.setSearchString, 300);

  return (
    <Input
      placeholder="Search..."
      onChange={(e) => {
        searchInputOnChange(e.target.value);
      }}
    />
  );
};
