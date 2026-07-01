import fs from 'fs';
import path from 'path';
import Head from 'next/head';
import Layout from '../components/Layout';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { motion } from 'framer-motion';
import Link from 'next/link';

const getTranslations = (locale) => {
  const filePath = path.join(process.cwd(), 'public', 'locales', locale, 'translation.json');
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
};

export async function getStaticProps({ locale = 'en' }) {
  const translations = getTranslations(locale);
  return {
    props: { translations },
  };
}

export default function BoatSupportPage({ translations }) {
  const t = (key) => translations[key] || key;

  return (
    <>
      <Head>
  <title>Boat Support | Marine Electrical Services Corfu | IonianEMS</title>
  <meta
    name="description"
    content="Expert marine electrical support in Corfu for yachts and boats: battery systems, diagnostics, underwater lighting, dockside emergency support & more by IonianEMS."
  />
  <meta
    name="keywords"
    content="marine electrician Corfu, yacht electrical support Greece, boat battery systems Corfu, marine electronics Gouvia Marina, Ionian boat repair, dockside support IonianEMS"
  />
  <link rel="canonical" href="https://www.ionianems.com/boat-support/" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />

  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Service",
        "serviceType": "Marine Electrical Support",
        "provider": {
          "@type": "LocalBusiness",
          "name": "IONIANEMS",
          "areaServed": {
            "@type": "Place",
            "name": "Corfu, Greece"
          },
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Gouvia Marina",
            "addressLocality": "Corfu",
            "addressCountry": "GR"
          },
          "telephone": "+302661401219",
          "url": "https://www.ionianems.com/boat-support"
        },
        "description": "Electrical diagnostics, battery systems, underwater lighting, and emergency dockside support for boats and yachts in Corfu by IonianEMS."
      }),
    }}
  />
</Head>


      <Layout translations={translations}>
        {/* 🔥 HERO SECTION */}
        <div
          style={{
            backgroundImage: "url('/boat-hero.webp')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            color: '#fff',
            padding: '40px 20px',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <Container>
            <motion.h1
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              style={{ fontSize: '3rem', fontWeight: 'bold' }}
            >
              {t('boat_support')} by IonianEMS
            </motion.h1>

            <motion.p
              initial={{ x: -300, y: 0, opacity: 0 }}
              animate={{
                x: [-300, 400, 400, 0],
                y: [0, 0, 20, 0],
                opacity: [0, 1, 1, 1],
              }}
              transition={{
                duration: 2.6,
                ease: 'easeInOut',
                times: [0, 0.4, 0.7, 1],
              }}
              style={{
                position: 'absolute',
                top: '80px',
                left: 0,
                width: '100%',
                textAlign: 'center',
                fontWeight: '600',
                color: '#0f77ca',
                fontSize: 'clamp(1rem, 2vw, 1.5rem)',
                whiteSpace: 'normal',
                maxWidth: '95%',
                margin: '0 auto',
                padding: '0 10px',
                zIndex: 2,
              }}
            >
              {t('experiencing_issues')}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              style={{ fontSize: '1.25rem', marginTop: '120px' }}
            >
              {t('boat_support_intro')}
            </motion.p>

            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-4"
            >
              <Link href="/contact" passHref>
                <Button size="lg" variant="light">
                  ⚡ {t('contact_us_now')}
                </Button>
              </Link>
            </motion.div>
          </Container>
        </div>

        {/* 🔧 SERVICES */}
        <Container className="py-5 text-center">
          <Row>
            <Col>
              <h2 className="mb-4">{t('what_we_can_help_with')}</h2>
              <p className="text-muted mb-5">{t('what_we_can_help_with_description')}</p>
            </Col>
          </Row>
          <Row>
            {[
              { icon: '🔌', label: t('full_electrical_installations') },
              { icon: '🔋', label: t('battery_charging_systems') },
              { icon: '💡', label: t('underwater_lighting') },
              { icon: '🛠️', label: t('diagnostics_repairs') },
              { icon: '⚓', label: t('emergency_dockside_support') },
              { icon: '📡', label: t('navigation_automation') },
            ].map((item, i) => (
              <Col key={i} md={4} className="mb-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2 }}
                >
                  <div style={{ fontSize: '2rem' }}>{item.icon}</div>
                  <h5 className="mt-2">{item.label}</h5>
                </motion.div>
              </Col>
            ))}
          </Row>
        </Container>

        {/* 💡 WHY US */}
        <div style={{ backgroundColor: '#f9f9f9', padding: '80px 20px' }}>
          <Container>
            <Row className="text-center">
              <Col md={10} className="mx-auto">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  {t('why_trust_ems')}
                </motion.h2>
                <p className="mt-4 text-muted">{t('why_trust_ems_description')}</p>
              </Col>
            </Row>
          </Container>
        </div>

        {/* 🛒 PRODUCTS CTA */}
        <Container className="py-5 text-center">
          <h2 className="mb-3">{t('need_equipment_too')}</h2>
          <p className="text-muted">{t('shop_description')}</p>
          <Link href="/products/pumps" passHref>
            <Button variant="primary" size="lg">{t('browse_products')}</Button>
          </Link>
        </Container>
      </Layout>
    </>
  );
}
