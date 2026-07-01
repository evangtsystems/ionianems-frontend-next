import dynamic from 'next/dynamic';
import Layout from '../components/Layout';

const ProfileScreen = dynamic(() => import('../screens/ProfileScreen'), { ssr: false });

export default function ProfilePage() {
  return (
    <Layout>
      <ProfileScreen />
    </Layout>
  );
}
