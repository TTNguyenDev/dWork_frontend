import { Skeleton, Grid } from '@chakra-ui/react';
import { State } from '@hookstate/core';
import { useListTasks } from '../../hooks';
import { TaskQueryState } from '../../store';
import { TaskCard } from '../task-card';

export const ListTasks = ({ state }: { state: State<TaskQueryState> }) => {
  const {
    listTasksState: { isLoading, data },
  } = useListTasks({ state });

  return (
    <>
      {isLoading && <Skeleton h="20px" />}
      {data && (
        <Grid templateColumns="repeat(12, 1fr)" gap="20px">
          {data.map((item) => (
            <TaskCard data={item} key={item.id} />
          ))}
        </Grid>
      )}
    </>
  );
};
