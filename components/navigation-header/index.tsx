import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  HStack,
  Text,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { BsArrowLeft, BsChevronRight } from 'react-icons/bs';

export const NavigationHeader = ({
  breadcrumbItems,
}: {
  breadcrumbItems?: { label: string; pathname: string }[];
}) => {
  const router = useRouter();
  const btnBackOnClick = useCallback(() => {
    router.back();
  }, [router]);

  return (
    <Box
      bg="rgba(3, 8, 18, 0.7)"
      position="sticky"
      top="0"
      zIndex="sticky"
      backdropFilter="auto"
      backdropBlur="50px"
    >
      <Flex justifyContent="space-between" maxW="1200px" margin="auto" p="20px">
        <Box>
          <HStack spacing="20px">
            <Button
              leftIcon={<BsArrowLeft />}
              variant="outline"
              onClick={btnBackOnClick}
            >
              Back
            </Button>
          </HStack>
        </Box>
        <HStack divider={<BsChevronRight />}>
          {breadcrumbItems?.map((item) => (
            <Text key={item.pathname} p="0 15px">
              {item.label}
            </Text>
          ))}
        </HStack>
      </Flex>
      <Divider opacity="0.5" />
    </Box>
  );
};
