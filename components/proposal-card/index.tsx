import {
  Box,
  HStack,
  Text,
  GridItem,
  Avatar,
  Badge,
  Button,
  VStack,
  Divider,
} from '@chakra-ui/react';
import moment from 'moment';
import { useMemo } from 'react';
import { MdClose, MdCheck, MdFlag } from 'react-icons/md';
import TimeAgo from 'timeago-react';
import { parseToUsername } from '../../core/utils';
import {
  ProposalDto,
  ProposalStatus,
  ProposalStatusRejected,
} from '../../dtos';
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
    proposalCardState: { isShowAction, status, statusLabel, rejectData },
    proposalCardMethods: {
      btnApproveOnClick,
      btnRejectOnClick,
      btnReportOnClick,
    },
  } = useProposalCard({
    data,
    taskId,
  });

  const statusBadgeColorScheme = useMemo(() => {
    switch (status) {
      case ProposalStatus.Pending:
        return 'gray';
      case ProposalStatus.Approved:
        return 'green';
      case ProposalStatus.Rejected:
        return 'red';
      case ProposalStatus.Reporting:
        return 'yellow';
    }
  }, [status]);

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
            <Badge fontSize="14px" colorScheme={statusBadgeColorScheme}>
              {statusLabel}
            </Badge>
          </Box>
        </HStack>
        <Text
          mb="20px"
          fontSize="15px"
          noOfLines={4}
          dangerouslySetInnerHTML={{ __html: data.proof_of_work }}
        />
        {rejectData && (
          <>
            <Divider />
            <VStack align="stretch" spacing="15px">
              <Box>
                <HStack mb="5px" justifyContent="space-between">
                  <Text fontWeight="800" fontSize="16px">
                    Reason
                  </Text>
                  <Text>
                    {moment(
                      Number(String(rejectData.reject_at).substring(0, 13))
                    ).format('LLLL')}
                  </Text>
                </HStack>
                <Text dangerouslySetInnerHTML={{ __html: rejectData.reason }} />
              </Box>
              <Box>
                <HStack mb="5px" justifyContent="space-between">
                  <Text fontWeight="800" fontSize="16px">
                    Report ID
                  </Text>
                </HStack>
                <Text
                  dangerouslySetInnerHTML={{ __html: rejectData.report_id }}
                />
              </Box>
            </VStack>
          </>
        )}
        {!isWorker && isShowAction && (
          <>
            <Divider />
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
          </>
        )}
        {isWorker && rejectData && !rejectData.report_id && (
          <HStack justifyContent="end" spacing="20px">
            <Button
              variant="outline"
              colorScheme="yellow"
              size="sm"
              lineHeight="0"
              leftIcon={<MdFlag size="18" />}
              onClick={btnReportOnClick}
            >
              REPORT
            </Button>
          </HStack>
        )}
      </VStack>
    </GridItem>
  );
};
