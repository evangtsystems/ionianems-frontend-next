import Head from 'next/head';
import Layout from '../components/Layout';
import LoginScreen from '../screens/LoginScreen';

export default function LoginPage() {
  return (
    <>
      <Head>
        <title>Login | IonianEMS</title>
        <meta name="description" content="Login to your IonianEMS account" />
      </Head>

      <Layout>
        <LoginScreen />
      </Layout>
    </>
  );
}

