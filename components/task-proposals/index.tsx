import {
  Badge,
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
    taskProposalsState: {
      isLoading,
      data,
      status,
      pendingItems,
      approvedItems,
      rejectedItems,
    },
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
          PENDING &nbsp;
          <Badge fontSize="15px" padding="2px 8px" borderRadius="xl">
            {pendingItems.length}
          </Badge>
        </Button>
        <Button
          variant="ghost"
          isActive={status === ProposalStatusFilter.APPROVED}
          onClick={() => btnStatusFilterOnClick(ProposalStatusFilter.APPROVED)}
        >
          APPROVED &nbsp;
          <Badge fontSize="15px" padding="2px 8px" borderRadius="xl">
            {approvedItems.length}
          </Badge>
        </Button>
        <Button
          variant="ghost"
          isActive={status === ProposalStatusFilter.REPORTING}
          onClick={() => btnStatusFilterOnClick(ProposalStatusFilter.REPORTING)}
        >
          REPORTING &nbsp;
          <Badge fontSize="15px" padding="2px 8px" borderRadius="xl">
            {0}
          </Badge>
        </Button>
        <Button
          variant="ghost"
          isActive={status === ProposalStatusFilter.REJECTED}
          onClick={() => btnStatusFilterOnClick(ProposalStatusFilter.REJECTED)}
        >
          REJECTED &nbsp;
          <Badge fontSize="15px" padding="2px 8px" borderRadius="xl">
            {rejectedItems.length}
          </Badge>
        </Button>
      </SimpleGrid>
      <VStack align="stretch">
        {taskId &&
          data?.map((item, index) => (
            <ProposalCard key={index} data={item} taskId={taskId} />
          ))}
      </VStack>
    </Box>
  );
};
