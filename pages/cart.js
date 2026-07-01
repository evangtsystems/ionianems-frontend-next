// pages/cart.js
import dynamic from 'next/dynamic';
import Layout from '../components/Layout';

const CartScreen = dynamic(() => import('../screens/CartScreen'), { ssr: false });

export default function CartPage() {
  return (
    <Layout>
      <CartScreen />
    </Layout>
  );
}
