import {
  Box,
  Button,
  HStack,
  Input,
  SimpleGrid,
  Skeleton,
  VStack,
} from '@chakra-ui/react';
import { ProposalStatusFilter } from '../../constants';
import { useTaskProposals } from '../../hooks';
import { ProposalCard } from '../proposal-card';

export const TaskProposals = ({ taskId }: { taskId?: string }) => {
  const {
    taskProposalsState: { isLoading, data, status },
    taskProposalsMethods: { btnStatusFilterOnClick },
  } = useTaskProposals({ taskId });

  return (
    <Box>
      <SimpleGrid columns={{ base: 2, md: 4 }} gap="20px" mb="20px">
        <Button
          variant="ghost"
          isActive={status === ProposalStatusFilter.PENDING}
          onClick={() => btnStatusFilterOnClick(ProposalStatusFilter.PENDING)}
        >
          PENDING (0)
        </Button>
        <Button
          variant="ghost"
          isActive={status === ProposalStatusFilter.APPROVED}
          onClick={() => btnStatusFilterOnClick(ProposalStatusFilter.APPROVED)}
        >
          APPROVED (0)
        </Button>
        <Button
          variant="ghost"
          isActive={status === ProposalStatusFilter.REPORTING}
          onClick={() => btnStatusFilterOnClick(ProposalStatusFilter.REPORTING)}
        >
          REPORTING (0)
        </Button>
        <Button
          variant="ghost"
          isActive={status === ProposalStatusFilter.REJECTED}
          onClick={() => btnStatusFilterOnClick(ProposalStatusFilter.REJECTED)}
        >
          REJECTED (0)
        </Button>
      </SimpleGrid>
      <VStack align="stretch">
        {data?.map((item, index) => (
          <ProposalCard key={index} data={item} />
        ))}
      </VStack>
    </Box>
  );
};
