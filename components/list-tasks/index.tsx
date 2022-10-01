import { Box, HStack, Skeleton, Text, Grid, GridItem } from '@chakra-ui/react';
import { formatNearAmount } from 'near-api-js/lib/utils/format';
import TimeAgo from 'timeago-react';
import { useListTasks } from '../../hooks';

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
            <GridItem
              colSpan={{ base: 12, sm: 6, md: 6, lg: 4, xl: 3 }}
              key={item.id}
              zIndex="10"
            >
              <Box
                key={item.id}
                p="10px 12px"
                borderRadius="2xl"
                bg="rgba(60, 60, 60, 0.8)"
                blur="10px"
                maxH="300px"
                cursor="pointer"
                transition="all"
                transitionDuration="0.2s"
                _hover={{
                  bg: 'rgba(80, 80, 80, 0.8)',
                }}
              >
                <HStack justify="space-between" align="start">
                  <Text fontSize="18px" fontWeight="800">
                    {item.title}
                  </Text>
                  <Text
                    borderRadius="2xl"
                    border="2px solid rgb(100, 176, 114)"
                    p="2px 6px"
                    color="rgb(100, 176, 114)"
                    fontWeight="800"
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
                  <Box
                    p="5px 12px"
                    bg="#78a2cc"
                    w="fit-content"
                    borderRadius="100px"
                  >
                    <Text>{`${item.proposals.length}/${item.max_participants}`}</Text>
                  </Box>
                  <Box textColor="textSecondary">
                    <TimeAgo datetime={Math.floor(item.created_at / 1000000)} />
                  </Box>
                </HStack>
              </Box>
            </GridItem>
          ))}
        </Grid>
      )}
    </>
  );
};
