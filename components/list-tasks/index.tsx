import { Box, Button, HStack, Skeleton, Text } from '@chakra-ui/react';
import { BN } from 'bn.js';
import TimeAgo from 'timeago-react';
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
        <HStack spacing="15px">
          {data.map((item) => (
            <Box key={item.id} minW="200px">
              <HStack justify="space-between" align="start">
                <Text fontSize="16px" fontWeight="600">
                  {item.title}
                </Text>
                <Text
                  borderRadius="5px"
                  border="2px solid rgb(100, 176, 114)"
                  p="2px 6px"
                  color="rgb(100, 176, 114)"
                  fontWeight="600"
                  textAlign="center"
                >
                  {Number(item.price) / 1000000000000 / 1000000000000 + '  Ⓝ'}
                </Text>
              </HStack>
              <Text
                fontSize="15px"
                dangerouslySetInnerHTML={{ __html: item.description }}
              />
              <HStack justify="space-between">
                <Text>{`${item.proposals.length}/${item.max_participants}`}</Text>
                <Box
                  p="5px 12px"
                  bg="#78a2cc"
                  w="fit-content"
                  borderRadius="100px"
                >
                  <TimeAgo datetime={Math.floor(item.created_at / 1000000)} />
                </Box>
              </HStack>
            </Box>
          ))}
        </HStack>
      )}
    </Box>
  );
};
