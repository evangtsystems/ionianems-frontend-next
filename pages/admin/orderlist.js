import dynamic from 'next/dynamic';
import Layout from '../../components/Layout';

const OrderListScreen = dynamic(() => import('../../screens/admin/OrderListScreen'), {
  ssr: false,
});

export default function AdminOrderListPage() {
  return (
    <Layout>
      <OrderListScreen />
    </Layout>
  );
}
