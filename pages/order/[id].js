import dynamic from 'next/dynamic';

// Dynamically load the screen to avoid SSR issues (e.g. window.paypal)
const OrderScreen = dynamic(() => import('../../screens/OrderScreen'), {
  ssr: false,
});

export default OrderScreen;
