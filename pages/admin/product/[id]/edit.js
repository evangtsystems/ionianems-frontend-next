import dynamic from 'next/dynamic';
import Layout from '../../../../components/Layout';


const ProductEditScreen = dynamic(() => import('../../../../screens/admin/ProductEditScreen'), {
  ssr: false,
});


export default function ProductEditPage() {
  return (
    <Layout>
      <ProductEditScreen />
    </Layout>
  );
}

