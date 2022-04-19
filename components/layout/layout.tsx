import React from 'react';
import { Header } from '../header';
import { Container, Content } from 'rsuite';
import { Footer } from '../footer';
import { Box } from '@chakra-ui/react';
import { HeaderLandingPage } from '../headerLandingPage';

type LayoutProps = {
    activeKey?: string;
    children?: React.ReactNode;
};

export const Layout: React.FunctionComponent<LayoutProps> = ({
    activeKey,
    children,
}) => {
    return (
        <Container>
            {activeKey === 'landing_page' ? <HeaderLandingPage /> : <Header />}
            <Content>
                <Box minH="calc(100vh - 200px)">{children}</Box>
            </Content>
            <Footer />
        </Container>
    );
};
