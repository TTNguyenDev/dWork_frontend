import { ChakraProvider } from '@chakra-ui/react';
import { AppProps } from 'next/dist/shared/lib/router/router';
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { ConnectWalletModal } from '../components/connectWalletModal';
import { CreateTaskModal } from '../components/createTaskModal';
import { DespositInfomationModal } from '../components/depositInfomationModal';
import { useApp } from '../hooks/useApp';
import { store } from '../store';
import '../styles/global.less';

const Init = () => {
    useApp();
    return null;
};

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
    return (
        <QueryClientProvider client={queryClient}>
            <Provider store={store}>
                <ChakraProvider>
                    <Init />
                    <ToastContainer />
                    <ConnectWalletModal />
                    <CreateTaskModal />
                    <DespositInfomationModal />
                    <Component {...pageProps} />
                </ChakraProvider>
            </Provider>
        </QueryClientProvider>
    );
}
