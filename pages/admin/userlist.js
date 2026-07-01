import dynamic from 'next/dynamic';
import Layout from '../../components/Layout';

const UserListScreen = dynamic(() => import('../../screens/admin/UserListScreen'), {
  ssr: false,
});

export default function UserListPage() {
  return (
    <Layout>
      <UserListScreen />
    </Layout>
  );
}
