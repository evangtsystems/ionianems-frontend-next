// pages/404.js
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Layout from '../components/Layout';
import ProductScreen from '../screens/ProductScreen';

const API_BASE =
  'https://ionianems1-backend-erdrase6hwexhndz.italynorth-01.azurewebsites.net';

export default function Custom404() {
  const router = useRouter();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const path = router.asPath;

    // If URL matches /product/[id]
    const match = path.match(/^\/product\/([a-f0-9]{24})\/?$/);
    if (!match) return;

    const productId = match[1];

    const fetchProduct = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/products/${productId}`);
        if (res.ok) {
          const data = await res.json();
          if (data.image && !data.image.startsWith('http')) {
            data.image = `${API_BASE}${data.image}`;
          }
          setProduct(data);
        }
      } catch (err) {
        console.error('404 fallback failed', err);
      }
    };

    fetchProduct();
  }, [router.asPath]);

  if (product) {
    return (
      <>
        <Head>
          <title>{product.name} | IonianEMS</title>
          <meta
            name="description"
            content={product.description || 'Explore product details.'}
          />
        </Head>
        <Layout>
          <ProductScreen product={product} />
        </Layout>
      </>
    );
  }

  return (
    <Layout>
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
    </Layout>
  );
}
