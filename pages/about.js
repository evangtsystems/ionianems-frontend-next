
import Head from 'next/head';
import Layout from '../components/Layout';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

export default function AboutPage() {
  const { t } = useTranslation();

  const aboutUsText = t('about_us_description', {
    defaultValue: `For over 15 years, EMS Electrical Marine Services has been dedicated to delivering expert marine electrical solutions for both pleasure boats and professional yachts. Based in Corfu, we specialize in electrical installations, system reconstructions, and certifications in accordance with Greek and international classification societies.

Our experienced team offers:

• New electrical installations tailored to each vessel
• Complete system overhauls for boats of all types
• Onboard and workshop repairs of electrical machinery
• A wide selection of in-stock spare parts from top domestic and global suppliers

We proudly provide immediate support across Greece, with service also available in Albania upon consultation. Our mobile response team is equipped to reach you within 2 hours anywhere in the Ionian Sea.

At EMS, we stay ahead of industry developments, ensuring that every solution is modern, efficient, and built to last. Our mission is to combine technical excellence, reliability, and personalized support — keeping your vessel powered, safe, and ready for the sea.`
  });

  return (
    <>
      <Head>
        <title>About IonianEMS | Marine Electrical Services in Corfu</title>
        <meta
          name="description"
          content="Discover IonianEMS: specialists in marine electrical systems, yacht wiring, boat electronics, and professional support for vessels in Corfu and across Greece."
        />
        <meta
          name="keywords"
          content="marine electrical Corfu, yacht electrician Greece, boat electronics Corfu, IonianEMS marine services, marine control panels, navigation systems, boat wiring Corfu"
        />
        <link rel="canonical" href="https://www.ionianems.com/about/" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "IONIANEMS",
              "description":
                "Marine electrical and electronics experts for boats and yachts in Corfu and the Ionian Sea.",
              "url": "https://www.ionianems.com/about",
              "telephone": "+302661401219",
              "email": "info@ionianems.com",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Gouvia Marina",
                "addressLocality": "Corfu",
                "addressCountry": "GR"
              },
              "openingHours": "Mo-Sa 09:00-18:00",
              "image": "https://www.ionianems.com/images/storefront.webp"
            }),
          }}
        />
      </Head>

      <Layout>
        <Container className="mt-5">
          <Row className="text-center">
            <Col>
              <h1>About IonianEMS – Marine Electrical Experts in Corfu</h1>
              <p className="lead" style={{ whiteSpace: 'pre-line' }}>
                {aboutUsText}
              </p>
              <div className="mt-4">
                <Button as={Link} href="/" variant="primary">
                  {t('back_to_home')}
                </Button>{' '}
                <Button as={Link} href="/contact" variant="outline-secondary">
                  Contact Us
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </Layout>
    </>
  );
}
