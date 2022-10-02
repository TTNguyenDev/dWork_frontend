import {
  Box,
  Button,
  HStack,
  Input,
  SimpleGrid,
  Skeleton,
  VStack,
} from '@chakra-ui/react';
import { useTaskProposals } from '../../hooks';
import { ProposalCard } from '../proposal-card';

export const TaskProposals = ({ taskId }: { taskId?: string }) => {
  const {
    taskProposalsState: { isLoading, data },
  } = useTaskProposals({ taskId });

  return (
    <Box>
      <SimpleGrid columns={{ base: 2, md: 4 }} gap="20px" mb="20px">
        <Button variant="ghost" isActive>
          PENDING (0)
        </Button>
        <Button variant="ghost">APPROVED (0)</Button>
        <Button variant="ghost">REPORTING (0)</Button>
        <Button variant="ghost">REJECTED (0)</Button>
      </SimpleGrid>
      <VStack align="stretch">
        {data?.map((item, index) => (
          <ProposalCard key={index} data={item} />
        ))}
      </VStack>
    </Box>
  );
};
