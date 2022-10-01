import {
  AspectRatio,
  Avatar,
  Box,
  Center,
  Divider,
  SimpleGrid,
  Text,
  VStack,
} from '@chakra-ui/react';
import { Button } from 'rsuite';
import { parseToUsername } from '../../core/utils';
import { AccountDto } from '../../dtos';

export const ProfileCard = ({ data }: { data: AccountDto }) => {
  return (
    <Box
      p="40px 20px"
      borderRadius="2xl"
      bg="rgba(150, 150, 150, 0.2)"
      backdropFilter="auto"
      backdropBlur="10px"
    >
      <Center mb="20px">
        <Avatar name={data.account_id} borderRadius="full" size="2xl" />
      </Center>
      <Box mb="20px">
        <Text fontWeight="600" fontSize="32px" textAlign="center">
          {parseToUsername(data.account_id)}
        </Text>
      </Box>
      <Box mb="20px">
        <Text fontSize="16px" color="textSecondary" textAlign="center">
          {data.bio}
        </Text>
      </Box>
      <Divider mb="20px" />
      <Box>
        <SimpleGrid columns={2} spacing="20px">
          <VStack justifyContent="space-around">
            <Text fontWeight="800" fontSize="20px">
              {data.total_spent}
            </Text>
            <Text fontSize="12px">TOTAL SPENT</Text>
          </VStack>
          <VStack justifyContent="space-around">
            <Text fontWeight="800" fontSize="20px">
              {data.total_spent}
            </Text>
            <Text fontSize="12px">TOTAL EARN</Text>
          </VStack>
          <VStack justifyContent="space-around">
            <Text fontWeight="800" fontSize="20px">
              {data.pos_point}
            </Text>
            <Text fontSize="12px">POS POINT</Text>
          </VStack>
          <VStack justifyContent="space-around">
            <Text fontWeight="800" fontSize="20px">
              {data.neg_point}
            </Text>
            <Text fontSize="12px">NEG POINT</Text>
          </VStack>
        </SimpleGrid>
      </Box>
    </Box>
  );
};
