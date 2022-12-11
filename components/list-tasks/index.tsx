import { Skeleton, Grid, Button, Center, VStack, Text } from '@chakra-ui/react';
import { State } from '@hookstate/core';
import { useListTasks } from '../../hooks';
import { TaskQueryState } from '../../store';
import { TaskCard } from '../task-card';

export const ListTasks = ({ state }: { state: State<TaskQueryState> }) => {
  const {
    listTasksState: { isLoading, data, hasNextPage },
    listTasksMethods: { fetchNextPage },
  } = useListTasks({ state });

  return (
    <>
      {data && (
        <Grid templateColumns="repeat(12, 1fr)" gap="20px">
          {data.map((item) => (
            <TaskCard data={item} key={item.id} />
          ))}
        </Grid>
      )}
      {isLoading && <Skeleton h="20px" />}
      {!isLoading && !data.length && (
        <Center
          borderStyle="dotted"
          borderWidth="2px"
          p="20px"
          borderRadius="2xl"
        >
          <VStack p="50px 0">
            <Text fontSize="20px">Empty</Text>
          </VStack>
        </Center>
      )}
      <Center p="30px" onClick={() => fetchNextPage()}>
        <Button disabled={!hasNextPage || isLoading} isLoading={isLoading}>
          Load More
        </Button>
      </Center>
    </>
  );
};
