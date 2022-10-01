import { Box, Button, HStack, Input, Skeleton } from '@chakra-ui/react';
import { useTaskCategories } from '../../hooks';

export const TaskCategories = () => {
  const {
    taskCategoriesState: { isLoading, data, activeCategory },
    taskCategoriesMethods: { btnCategoryOnClick },
  } = useTaskCategories();

  return (
    <Box zIndex="10">
      {isLoading && <Skeleton h="20px" />}
      {data && (
        <HStack spacing="10px">
          {data.map((item) => (
            <Button
              key={item.id}
              variant="ghost"
              size="sm"
              borderRadius="2xl"
              textTransform="capitalize"
              onClick={() => {
                btnCategoryOnClick(item.id);
              }}
              isActive={activeCategory === item.id}
            >
              {item.name}
            </Button>
          ))}
          <Button
            variant="ghost"
            size="sm"
            borderRadius="2xl"
            onClick={() => {
              btnCategoryOnClick('');
            }}
            isActive={activeCategory === ''}
          >
            All
          </Button>
        </HStack>
      )}
    </Box>
  );
};
