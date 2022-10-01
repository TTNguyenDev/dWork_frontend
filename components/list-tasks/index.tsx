import { Box, HStack, Skeleton, Text, Grid, GridItem } from '@chakra-ui/react';
import { formatNearAmount } from 'near-api-js/lib/utils/format';
import TimeAgo from 'timeago-react';
import { useListTasks } from '../../hooks';
import { TaskCard } from '../task-card';

export const ListTasks = () => {
  const {
    listTasksState: { isLoading, data },
  } = useListTasks();

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
