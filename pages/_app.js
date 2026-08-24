

import { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';   // ✅ Import router
import store from '../store';
import axios from 'axios';
import Script from 'next/script'; // ✅ Import Script for GA

// ✅ Import i18n config (client-side)
import '../i18n';

import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/bootstrap.custom.css';
import '../styles/index.css';

const CookieConsent = dynamic(() => import('react-cookie-consent'), { ssr: false });

function App({ Component, pageProps }) {
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);

    // 🔹 Keep backend alive
    const interval = setInterval(async () => {
      try {
        await axios.get('https://ionianems.com');
      } catch (err) {
        console.error('Backend keep-alive failed:', err);
      }
    }, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  // 🔹 Google Analytics pageview tracking
  useEffect(() => {
    const handleRouteChange = (url) => {
      if (window.gtag) {
        window.gtag('config', process.env.NEXT_PUBLIC_GA_ID, {
          page_path: url,
        });
      }
    };

    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  if (!isClient) return null;

  return (
    <Provider store={store}>
      {/* ✅ Google Analytics */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
            page_path: window.location.pathname,
          });
        `}
      </Script>

      <ToastContainer />
      <CookieConsent
        location="bottom"
        buttonText="Accept"
        declineButtonText="Decline"
        enableDeclineButton
        cookieName="userConsent"
        expires={365}
        style={{ background: '#222', color: '#fff' }}
        buttonStyle={{ background: '#36b34d', color: '#fff', fontSize: '14px' }}
        declineButtonStyle={{ background: '#e74c3c', color: '#fff', fontSize: '14px' }}
      >
        We use cookies to improve your experience. By clicking &quot;Accept&quot;, you agree to our privacy policy.
      </CookieConsent>

      <Component {...pageProps} />
    </Provider>
  );
}

export default App;

