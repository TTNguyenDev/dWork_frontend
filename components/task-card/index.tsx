import { Box, HStack, Text, GridItem } from '@chakra-ui/react';
import { formatNearAmount } from 'near-api-js/lib/utils/format';
import Link from 'next/link';
import TimeAgo from 'timeago-react';
import { TaskDto } from '../../dtos';

export const TaskCard = ({ data }: { data: TaskDto }) => {
  return (
    <GridItem colSpan={{ base: 12, md: 6, lg: 6, xl: 4 }} zIndex="10">
      <Link href={`/task/${data.id}`}>
        <Box
          key={data.id}
          p="20px"
          borderRadius="2xl"
          bg="rgba(150, 150, 150, 0.1)"
          backdropFilter="auto"
          backdropBlur="100px"
          maxH="300px"
          cursor="pointer"
          transition="all"
          transitionDuration="0.2s"
          _hover={{
            bg: 'rgba(150, 150, 150, 0.3)',
          }}
        >
          <HStack justify="space-between" align="start">
            <Text fontSize="18px" fontWeight="800">
              {data.title}
            </Text>
            <Text
              borderRadius="2xl"
              border="2px solid rgb(100, 176, 114)"
              p="2px 6px"
              color="rgb(100, 176, 114)"
              fontWeight="800"
              textAlign="center"
            >
              {formatNearAmount(data.price, 24) + '  Ⓝ'}
            </Text>
          </HStack>
          <Box minH="120px" p="7px 0">
            <Text
              fontSize="15px"
              noOfLines={4}
              dangerouslySetInnerHTML={{ __html: data.description }}
            />
          </Box>
          <HStack justify="space-between" alignItems="end">
            <Box p="5px 12px" bg="#32475c" w="fit-content" borderRadius="100px">
              <Text fontWeight="600">{`${data.proposals.length}/${data.max_participants}`}</Text>
            </Box>
            <Box textColor="textSecondary">
              <TimeAgo datetime={Math.floor(data.created_at / 1000000)} />
            </Box>
          </HStack>
        </Box>
      </Link>
    </GridItem>
  );
};
