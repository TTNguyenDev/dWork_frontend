import { AppProps } from 'next/dist/shared/lib/router/router';
import React from 'react';
import { Provider } from 'react-redux';
import { useApp } from '../hooks/useApp';
import { store } from '../store';
import '../styles/global.less';

const Init = () => {
    useApp();
    return null;
};

export default function App({ Component, pageProps }: AppProps) {
    return (
        <Provider store={store}>
            <Init />
            <Component {...pageProps} />
        </Provider>
    );
}
