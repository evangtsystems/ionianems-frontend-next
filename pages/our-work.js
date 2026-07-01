import Head from 'next/head';
import Layout from '../components/Layout';
import dynamic from 'next/dynamic';

const OurWorkScreen = dynamic(() => import('../screens/OurWorkScreen'), { ssr: false });

export default function OurWorkPage() {
  return (
    <>
      <Head>
        <title>Our Work | IonianEMS</title>
        <meta name="description" content="See our marine electrical projects." />
      </Head>

      <Layout>
        <OurWorkScreen />
      </Layout>
    </>
  );
}

