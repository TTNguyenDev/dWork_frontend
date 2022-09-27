import '../styles/reset.css';
import 'rsuite/dist/rsuite.min.css';
import type { ReactElement, ReactNode } from 'react';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { Center, ChakraProvider, Spinner } from '@chakra-ui/react';
import { theme } from '../theme';
import { useApp } from '../hooks';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import NextNProgress from 'nextjs-progressbar';

// PouchDB
import PouchDB from 'pouchdb';
import PouchDBFind from 'pouchdb-find';
PouchDB.plugin(PouchDBFind);

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page);

  const { appState } = useApp();
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme} resetCSS={true}>
        <NextNProgress showOnShallow={true} options={{}} />
        {appState.loading.get() && (
          <Center w="100vw" h="100vh">
            <Spinner size="xl" />
          </Center>
        )}
        {appState.ready.get() && getLayout(<Component {...pageProps} />)}
      </ChakraProvider>
    </QueryClientProvider>
  );
}
