import { Box } from '@chakra-ui/react';
import { PropsWithChildren } from 'react';
import { Header } from '../components';
import { Footer } from '../components/footer';

export function MainLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Header />
      <Box as="main" minH="calc(100vh - 400px)" overflowX="clip">
        {children}
      </Box>
      <Footer />
    </>
  );
}
