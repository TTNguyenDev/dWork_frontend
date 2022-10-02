import {
  Box,
  HStack,
  Text,
  GridItem,
  Avatar,
  Badge,
  Button,
  VStack,
} from '@chakra-ui/react';
import { MdClose, MdCheck } from 'react-icons/md';
import TimeAgo from 'timeago-react';
import { parseToUsername } from '../../core/utils';
import { ProposalDto, ProposalStatus } from '../../dtos';
import { useProposalCard } from '../../hooks';

export const ProposalCard = ({
  data,
  taskId,
  isWorker,
}: {
  data: ProposalDto;
  taskId?: string;
  isWorker?: boolean;
}) => {
  const {
    proposalCardState: { isShowAction, statusLabel },
    proposalCardMethods: { btnApproveOnClick, btnRejectOnClick },
  } = useProposalCard({
    data,
    taskId,
  });

  return (
    <GridItem colSpan={{ base: 12, md: 6, lg: 6, xl: 4 }} zIndex="10">
      <VStack
        p="20px"
        borderRadius="2xl"
        bg="rgba(150, 150, 150, 0.1)"
        backdropFilter="auto"
        backdropBlur="100px"
        spacing="20px"
        align="stretch"
      >
        <HStack justifyContent="space-between">
          <HStack>
            <Avatar name={data.account_id} />
            <Box textColor="textSecondary">
              <Text fontSize="16px">{parseToUsername(data.account_id)}</Text>
              <TimeAgo datetime={Math.floor(data.submit_time / 1000000)} />
            </Box>
          </HStack>
          <Box>
            <Badge fontSize="14px">{statusLabel}</Badge>
          </Box>
        </HStack>
        <Text
          fontSize="15px"
          noOfLines={4}
          dangerouslySetInnerHTML={{ __html: data.proof_of_work }}
        />
        {!isWorker && isShowAction && (
          <HStack justifyContent="end" spacing="20px">
            <Button
              variant="outline"
              colorScheme="green"
              size="sm"
              lineHeight="0"
              leftIcon={<MdCheck size="18" />}
              onClick={btnApproveOnClick}
            >
              APPROVE
            </Button>
            <Button
              variant="outline"
              colorScheme="red"
              size="sm"
              lineHeight="0"
              leftIcon={<MdClose size="18" />}
              onClick={btnRejectOnClick}
            >
              REJECT
            </Button>
          </HStack>
        )}
      </VStack>
    </GridItem>
  );
};
