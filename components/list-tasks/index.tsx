import { Box, Button, HStack, Skeleton } from '@chakra-ui/react';
import { useListTasks } from '../../hooks';

export const ListTasks = () => {
  const {
    listTasksState: { isLoading, data },
  } = useListTasks();

  console.log(data);

  return (
    <Box>
      {isLoading && <Skeleton h="20px" />}
      {data && (
        <HStack spacing="10px">
          {data.map((item) => (
            <Button key={item.description} variant="ghost" size="sm">
              {item.title}
            </Button>
          ))}
        </HStack>
      )}
    </Box>
  );
};
