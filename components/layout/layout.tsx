import React from "react";
import PropTypes from "prop-types";
import "./layout.less";
import { Header } from "../header";
import { Container, Content, Footer } from "rsuite";

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
      <Content>Content</Content>
      <Footer></Footer>
    </Container>
  );
};
