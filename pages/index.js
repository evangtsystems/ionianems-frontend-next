
import Head from 'next/head';
import Layout from '../components/Layout';
import HomeScreen from '../components/HomeScreen';
import axios from 'axios';

export default function Home({ preloadedProducts }) {
  return (
    <>
      <Head>
        <title>IONIANEMS | Marine Electrical & Electronics in Corfu</title>
        <meta
          name="description"
          content="Expert marine electronics and electrical services in Corfu, Greece. We specialize in yacht wiring, navigation systems, and power solutions."
        />
        <meta
          name="keywords"
          content="marine electronics Corfu, yacht electrician, navigation systems, boat wiring Greece, Victron, Yanmar Corfu"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://www.ionianems.com/" />
      </Head>

      <Layout>
        <HomeScreen preloadedProducts={preloadedProducts} />
      </Layout>
    </>
  );
}

export async function getStaticProps() {
  try {
    const res = await axios.get('https://ionianems1-backend-erdrase6hwexhndz.italynorth-01.azurewebsites.net/api/products?keyword=&pageNumber=1');
    return {
      props: { preloadedProducts: res.data.products || [] },
    };
  } catch (err) {
    console.error('Failed to fetch homepage data:', err.message);
    return {
      props: { preloadedProducts: [] },
    };
  }
}
