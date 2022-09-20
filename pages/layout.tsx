import { PropsWithChildren } from 'react';
import { Header } from '../components';
import { Footer } from '../components/footer';

export const Layout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
};
