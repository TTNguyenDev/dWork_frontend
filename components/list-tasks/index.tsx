import { Box, HStack, Skeleton, Text, Grid, GridItem } from '@chakra-ui/react';
import { formatNearAmount } from 'near-api-js/lib/utils/format';
import TimeAgo from 'timeago-react';
import { useListTasks } from '../../hooks';

export const ListTasks = () => {
  const {
    listTasksState: { isLoading, data },
  } = useListTasks();

  return (
    <Box>
      {isLoading && <Skeleton h="20px" />}
      {data && (
        <Grid templateColumns="repeat(12, 1fr)" gap="15px">
          {data.map((item) => (
            <GridItem colSpan={{ base: 6, md: 4, lg: 3 }} key={item.id}>
              <Box
                key={item.id}
                p="10px 12px"
                borderRadius="7px"
                minW="200px"
                maxW="270px"
                _hover={{
                  bg: '#5553',
                  blur: '10px',
                }}
                maxH="300px"
              >
                <HStack justify="space-between" align="start">
                  <Text fontSize="18px" fontWeight="600">
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
                    {formatNearAmount(item.price, 24) + '  Ⓝ'}
                  </Text>
                </HStack>
                <Box minH="120px" p="7px 0">
                  <Text
                    fontSize="15px"
                    noOfLines={4}
                    dangerouslySetInnerHTML={{ __html: item.description }}
                  />
                </Box>
                <HStack justify="space-between" alignItems="end">
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
            </GridItem>
          ))}
        </Grid>
      )}
    </Box>
  );
};
