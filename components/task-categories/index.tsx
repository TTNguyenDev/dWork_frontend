import { Box, Button, HStack, Input, Skeleton } from '@chakra-ui/react';
import { useTaskCategories } from '../../hooks';

export const TaskCategories = () => {
  const {
    taskCategoriesState: { isLoading, data },
  } = useTaskCategories();

  return (
    <Box>
      {isLoading && <Skeleton h="20px" />}
      {data && (
        <HStack spacing="10px">
          {data.map((item) => (
            <Button key={item.id} variant="ghost" size="sm">
              {item.name}
            </Button>
          ))}
        </HStack>
      )}
    </Box>
  );
};
