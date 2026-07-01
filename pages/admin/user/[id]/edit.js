import dynamic from 'next/dynamic';
import Layout from '../../../../components/Layout';

const UserEditScreen = dynamic(() => import('../../../../screens/admin/UserEditScreen'), { ssr: false });

export default function UserEditPage() {
  return (
    <Layout>
      <UserEditScreen />
    </Layout>
  );
}
