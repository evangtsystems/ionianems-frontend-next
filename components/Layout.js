// components/Layout.js
import { useRouter } from 'next/router';
import Header from './Header';
import Footer from './Footer';
import { Container } from 'react-bootstrap';

const Layout = ({ children }) => {
  const { locale = 'en' } = useRouter();

  return (
    <>
      <Header locale={locale} />
      <main className="py-3">
        <Container>
          {children}
        </Container>
      </main>
      <Footer />
    </>
  );
};

export default Layout;

