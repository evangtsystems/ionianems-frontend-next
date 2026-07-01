// pages/page/[pageNumber].js

import Head from 'next/head';
import HomeScreen from '../../components/HomeScreen';
import Layout from '../../components/Layout';

export default function PaginatedHomePage() {
  return (
    <>
      <Head>
        <title>IonianEMS | Page</title>
      </Head>
      <Layout>
        <HomeScreen />
      </Layout>
    </>
  );
}

// ✅ Remove getStaticProps and getStaticPaths
// Your i18n is now client-only using react-i18next and i18n.js
