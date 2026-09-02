// components/Layout.js
import { useRouter } from 'next/router';
import Header from './Header';
import Footer from './Footer';
import { Container } from 'react-bootstrap';

const Layout = ({ children }) => {
  const { locale = 'en' } = useRouter();

  const handleGeminiClick = async () => {
  const prompt =
    locale === 'el'
      ? 'Ποιες είναι οι ώρες λειτουργίας της IonianEMS στην Κέρκυρα;'
      : 'What are the business hours of IonianEMS in Corfu?';

  try {
    await navigator.clipboard.writeText(prompt);
  } catch (error) {
    console.error('Could not copy Gemini prompt:', error);
  }

  window.open(
    'https://gemini.google.com/',
    '_blank',
    'noopener,noreferrer'
  );
};

  return (
    <>
      <Header locale={locale} />

      <main className="py-3">
        <Container>
          {children}
        </Container>
      </main>

     {/* Ask Gemini */}
<div
  style={{
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '24px 0',
  }}
>
  <button
    type="button"
    onClick={handleGeminiClick}
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
        ? 'Ρώτησε το Gemini για την IonianEMS'
        : 'Ask Gemini about IonianEMS'}
    </span>
  </button>

  <p
    style={{
      marginTop: '8px',
      marginBottom: 0,
      fontSize: '12px',
      color: '#6b7280',
      textAlign: 'center',
      padding: '0 15px',
    }}
  >
    {locale === 'el'
      ? 'Αντιγράφουμε αυτόματα την ερώτηση: «Ποιες είναι οι ώρες λειτουργίας της IonianEMS στην Κέρκυρα;» — απλώς κάντε επικόλληση στο Gemini.'
      : 'We automatically copy: “What are the business hours of IonianEMS in Corfu?” — just paste it into Gemini.'}
  </p>
</div>

      <Footer />
    </>
  );
};

export default Layout;