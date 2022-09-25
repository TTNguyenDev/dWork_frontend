import { Box } from '@chakra-ui/react';
import { PropsWithChildren } from 'react';
import { NavigationHeader } from '../components';

export function NavigationLayout({ children }: PropsWithChildren) {
  return (
    <>
      <NavigationHeader />
      <Box as="main" minH="calc(100vh - 200px)">
        {children}
      </Box>
    </>
  );
}
