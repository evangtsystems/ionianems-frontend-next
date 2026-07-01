import Layout from '../components/Layout'; // Import your Layout component
import PlaceOrderScreen from '../screens/PlaceOrderScreen'; // Import your PlaceOrderScreen

export default function PlaceOrderPage() {
  return (
    <Layout>
      <PlaceOrderScreen /> {/* Wrap PlaceOrderScreen with Layout */}
    </Layout>
  );
}
