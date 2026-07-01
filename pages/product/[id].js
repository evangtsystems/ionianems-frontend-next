// pages/product/[id].js
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Layout from '../../components/Layout';
import ProductScreen from '../../screens/ProductScreen';

const API_BASE =
  'https://ionianems-backend-hkgghubjeqgyctdc.italynorth-01.azurewebsites.net';

export default function ProductPage() {
  const router = useRouter();
  const { id } = router.query;

  const [product, setProduct] = useState(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/products/${id}`);
        if (res.ok) {
          const data = await res.json();
          if (data.image && !data.image.startsWith('http')) {
            data.image = `${API_BASE}${data.image}`;
          }
          setProduct(data);
        } else if (res.status === 404) {
          setNotFound(true);
        }
      } catch (err) {
        console.error('Failed to fetch product', err);
      }
    };

    fetchProduct();
  }, [id]);

  if (!id) {
    return (
      <Layout>
        <p>Loading...</p>
      </Layout>
    );
  }

  if (notFound) {
    return (
      <Layout>
        <p>Product not found.</p>
      </Layout>
    );
  }

  if (!product) {
    return (
      <Layout>
        <p>Loading product details...</p>
      </Layout>
    );
  }

  return (
    <>
      <Head>
        <title>{product.name} | IonianEMS</title>
        <meta
          name="description"
          content={product.description || 'Explore product details.'}
        />
        <link
          rel="canonical"
          href={`https://www.ionianems.com/product/${product._id}`}
        />
      </Head>

      <Layout>
        <ProductScreen product={product} />
      </Layout>
    </>
  );
}
