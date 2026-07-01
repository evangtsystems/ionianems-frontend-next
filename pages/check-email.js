import Layout from '../components/Layout'; // Import your Layout component
import CheckEmailScreen from '../screens/CheckEmailScreen'; // Import your CheckEmailScreen

export default function CheckEmailPage() {
  return (
    <Layout>
      <CheckEmailScreen /> {/* Wrap CheckEmailScreen with Layout */}
    </Layout>
  );
}
