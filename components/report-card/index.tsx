import {
  Box,
  HStack,
  Text,
  GridItem,
  Avatar,
  VStack,
  Divider,
  Button,
} from '@chakra-ui/react';
import { MdCheck, MdClose } from 'react-icons/md';
import { parseToUsername } from '../../core/utils';
import { ReportDto } from '../../dtos';
import { useReportCard } from '../../hooks';

export const ReportCard = ({ data }: { data: ReportDto }) => {
  const {
    reportCardState: {},
    reportCardMethods: { btnApproveOnClick, btnRejectOnClick },
  } = useReportCard({
    data,
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
        <HStack>
          <Avatar name={data.account_id} />
          <Box textColor="textSecondary">
            <Text fontSize="16px">{parseToUsername(data.account_id)}</Text>
          </Box>
        </HStack>
        <VStack align="stretch" spacing="15px">
          <Box>
            <HStack mb="5px" justifyContent="space-between">
              <Text fontWeight="800" fontSize="16px">
                Report ID
              </Text>
            </HStack>
            <Text>{data.report_id}</Text>
          </Box>
          <Box>
            <HStack mb="5px" justifyContent="space-between">
              <Text fontWeight="800" fontSize="16px">
                Task ID
              </Text>
            </HStack>
            <Text>{data.task_id}</Text>
          </Box>
          <Box>
            <HStack mb="5px" justifyContent="space-between">
              <Text fontWeight="800" fontSize="16px">
                Content
              </Text>
            </HStack>
            <Text
              mb="20px"
              fontSize="15px"
              noOfLines={4}
              dangerouslySetInnerHTML={{ __html: data.report }}
            />
          </Box>
        </VStack>
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
      </VStack>
    </GridItem>
  );
};
