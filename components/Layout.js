// components/Layout.js
import { useRouter } from 'next/router';
import Header from './Header';
import Footer from './Footer';
import { Container } from 'react-bootstrap';

const Layout = ({ children }) => {
  const { locale = 'en' } = useRouter();

  const handlePreferredSource = () => {
    if (
      typeof window !== 'undefined' &&
      window.googlePreferredSource
    ) {
      window.googlePreferredSource.addPreferredSource();
    }
  };

  return (
    <>
      <Header locale={locale} />

      <main className="py-3">
        <Container>
          {children}
        </Container>
      </main>

      {/* Google Preferred Sources */}
      <div
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          margin: '24px 0',
        }}
      >
        <button
          type="button"
          onClick={handlePreferredSource}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            background: '#ffffff',
            color: '#202124',
            border: '1px solid #dadce0',
            borderRadius: '999px',
            padding: '11px 22px',
            fontSize: '14px',
            fontWeight: 600,
            cursor: 'pointer',
            boxShadow: '0 1px 2px rgba(60,64,67,0.18)',
          }}
        >
          <img
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
            alt=""
            width="20"
            height="20"
          />

          <span>
            {locale === 'el'
              ? 'Προσθήκη στις Προτιμώμενες Πηγές Google'
              : 'Add to Google Preferred Sources'}
          </span>
        </button>
      </div>

      <Footer />
    </>
  );
};

export default Layout;

