import { useEffect, useState } from 'react';
import Head from 'next/head';
import Layout from '../../components/Layout';
import CategoryProductsScreen from '../../screens/CategoryProductsScreen';

const API_BASE =
  'https://ionianems1-backend-erdrase6hwexhndz.italynorth-01.azurewebsites.net';

// ✅ helper to normalize image paths
function normalizeImage(p) {
  return {
    ...p,
    image: p.image?.startsWith('http') ? p.image : `${API_BASE}${p.image}`,
  };
}

export default function CategoryPage({ categoryKey, readableCategory, initialProducts }) {
  const [products, setProducts] = useState(initialProducts);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    const fetchFreshProducts = async () => {
      try {
        setIsRefreshing(true);
        const res = await fetch(
          `${API_BASE}/api/products?category=${encodeURIComponent(readableCategory)}&limit=1000`
        );
        if (res.ok) {
          const data = await res.json();
          setProducts(data.products.map(normalizeImage));
        }
      } catch (err) {
        console.error('Failed to refresh products', err);
      } finally {
        setIsRefreshing(false);
      }
    };

    fetchFreshProducts();
  }, [categoryKey, readableCategory]);

  const title = `${readableCategory} | IonianEMS Marine Electrical Equipment`;
  const description = `Browse high-quality ${readableCategory.toLowerCase()} for boats and yachts. IonianEMS specializes in marine electrical and electronic systems in Corfu, Greece.`;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link
          rel="canonical"
          href={`https://www.ionianems.com/products/${categoryKey}`}
        />
      </Head>

      <Layout>
        <CategoryProductsScreen
          categoryKey={categoryKey}
          products={products}
          isRefreshing={isRefreshing}
        />
      </Layout>
    </>
  );
}

export async function getStaticPaths() {
  const categoryKeys = [
    'pumps',
    'underwater_lighting',
    'control_instruments',
    'boat_wipers',
    'navigation_systems',
    'alternator_regulator',
    'control_and_automation',
    'collision_prevention',
    'control_systems',
    'marine_electrical',
    'electrical_equipment',
    'battery_chargers',
    'automation_systems',
    'marine_generator',
  ];

  const paths = categoryKeys.map((categoryKey) => ({
    params: { categoryKey },
  }));

  return {
    paths,
    fallback: false, // required for next export
  };
}

export async function getStaticProps({ params }) {
  const translations = {
    pumps: 'Αντλίες Σκαφών',
    underwater_lighting: 'Υποβρύχιος Φωτισμός',
    control_instruments: 'Όργανα Ελέγχου',
    boat_wipers: 'Υαλοκαθαριστήρες Σκαφών',
    navigation_systems: 'Συστήματα Πλοήγησης',
    alternator_regulator: 'Alternator Regulator',
    control_and_automation: 'Συστήματα Αυτοματισμού',
    collision_prevention: 'Έξυπνο Σύστημα Πρόληψης Συγκρούσεων',
    control_systems: 'Συστήματα Ελέγχου',
    marine_electrical: 'Ηλεκτρολογικό Υλικό Σκαφών',
    electrical_equipment: 'Ηλεκτρικός Εξοπλισμός',
    battery_chargers: 'Φορτιστές Μπαταριών',
    automation_systems: 'Συστήματα Αυτοματισμού',
    marine_generator: 'Marine Generator',
  };

  const { categoryKey } = params;
  const readableCategory = translations[categoryKey] || categoryKey;

  const res = await fetch(
    `${API_BASE}/api/products?category=${encodeURIComponent(readableCategory)}&limit=1000`
  );

  let products = [];
  if (res.ok) {
    const data = await res.json();
    products = data.products.map(normalizeImage);
  }

  return {
    props: {
      categoryKey,
      readableCategory,
      initialProducts: products,
    },
  };
}
