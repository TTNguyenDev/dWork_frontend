import Head from 'next/head';
import { ReactElement } from 'react';
import { Layout } from './layout';
import { NextPageWithLayout } from './_app';

const Home: NextPageWithLayout = () => {
  return (
    <>
    <Head>
        <title>dWork</title>
        <meta name="description" content="dWork" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
       <div>
      
      <div>Hello world!</div>
    </div>
      </>
   
  );
};

Home.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};

export default Home;
