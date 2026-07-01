import dynamic from 'next/dynamic';
import Layout from '../../../components/Layout';
import { useRouter } from 'next/router';

const ProductListScreen = dynamic(() => import('../../../screens/admin/ProductListScreen'), {
  ssr: false,
});

export default function ProductListPage() {
  const router = useRouter();
  const rawPage = router.query.pageNumber;
  const pageNumber = Array.isArray(rawPage) ? rawPage[0] : rawPage || '1';

  return (
    <Layout>
      <ProductListScreen pageNumber={pageNumber} />
    </Layout>
  );
}
