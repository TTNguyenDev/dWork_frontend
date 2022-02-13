import React from 'react';
import { Header } from '../header';
import { Container, Content, Footer } from 'rsuite';

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
            <Header activeKey={activeKey} />
            <Content>{children}</Content>
            <Footer></Footer>
        </Container>
    );
};
