import { Box } from '@chakra-ui/react';
import { PropsWithChildren } from 'react';
import { Header } from '../components';
import { Footer } from '../components/footer';

export const Layout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Header />
      <Box as="main" minH="calc(100vh - 400px)">
        {children}
      </Box>
      <Footer />
    </>
  );
};
