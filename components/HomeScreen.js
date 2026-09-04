import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Row, Col, Container, Carousel } from 'react-bootstrap';
import { useGetProductsQuery } from '../slices/productsApiSlice';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import Meta from '../components/Meta';

const groupLogosSmart = (logos, perSlide) => {
  const groups = [];
  for (let i = 0; i < logos.length; i += perSlide) {
    const group = logos.slice(i, i + perSlide);
    if (group.length < perSlide && groups.length > 0) {
      const needed = perSlide - group.length;
      const fromPrev = groups[groups.length - 1].slice(-needed);
      groups.push([...fromPrev, ...group]);
    } else {
      groups.push(group);
    }
  }
  return groups;
};

const HomeScreen = ({ preloadedProducts = [] }) => {
  const { t } = useTranslation();
  const router = useRouter();
  const { keyword = '', pageNumber = 1 } = router.query;

  const [perSlide, setPerSlide] = useState(3);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    const updatePerSlide = () => {
      setPerSlide(window.innerWidth < 576 ? 2 : 3);
    };
    updatePerSlide();
    window.addEventListener('resize', updatePerSlide);
    return () => window.removeEventListener('resize', updatePerSlide);
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const searchParams = new URLSearchParams(window.location.search);
      const categoryFromURL = searchParams.get('category') || '';
      setSelectedCategory(categoryFromURL);
    }
  }, [router.query]);

  const productsToDisplay = preloadedProducts.length > 0 ? preloadedProducts : [];


  return (
    <>
      <Meta
        title="Marine Electrical & Electronics in Corfu | IONIANEMS"
        description="Expert marine electronics and electrical services in Corfu, Greece. We specialize in yacht wiring, boat electronics, navigation systems, battery chargers, alternators, control panels, and more."
        keywords="marine electronics Corfu, boat electrician Corfu, yacht navigation systems, marine wiring Greece, Corfu marine services, battery chargers, alternator regulators, boat control panels, Victron Energy Corfu, Yanmar electronics"
        canonical="https://www.ionianems.com/"
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "IONIANEMS",
            "image": "https://www.ionianems.com/images/storefront.webp",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Gouvia Marina",
              "addressLocality": "Corfu",
              "addressCountry": "GR"
            },
            "telephone": "+302661401219",
            "email": "info@ionianems.com",
            "url": "https://www.ionianems.com",
            "openingHours": "Mo-Sa 09:00-18:00"
          }),
        }}
      />

      {!keyword ? (
        <>
          <Container className="text-center my-4">
            <Image
              src="/images/first_extracted_image.webp"
              alt="Marine electrical services in Corfu banner"
              width={1200}
              height={400}
              className="hero-banner"
            />
          </Container>

          <Container
            fluid
            className="py-5 px-3 my-4 text-center"
            style={{ backgroundColor: '#4a66a3', color: '#fff', borderRadius: '12px' }}
          >
            <h1 className="mb-3" style={{ fontWeight: 700 }}>
              ⚡️ {t('slogan_line')}
            </h1>
            <p
              style={{
                fontSize: '1.1rem',
                maxWidth: '800px',
                margin: '0 auto',
                lineHeight: '1.8',
              }}
            >
              {t('slogan_paragraph')}
            </p>
          </Container>
        </>
      ) : (
        <Link href="/" passHref legacyBehavior>
          <a className="btn btn-light mb-4">{t('go_back')}</a>
        </Link>
      )}

      <Container className="my-5">
        <Row className="justify-content-center">
          <Col md={10}>
            <div
              className="text-center"
              style={{
                background: 'linear-gradient(135deg, #e0f7fa 0%, #f1f8e9 100%)',
                borderRadius: '20px',
                padding: '35px 25px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                border: '1px solid #b2dfdb',
              }}
            >
              <h3 style={{ color: '#00796b', fontWeight: 'bold' }}>✅ {t('authorized_reseller')}</h3>
              <p
                className="mt-3"
                style={{
                  fontSize: '1.15rem',
                  maxWidth: '700px',
                  margin: '0 auto',
                  color: '#424242',
                }}
              >
                {t('authorized_reseller_info')} <Link href="/contact">Contact us</Link> to learn more.
              </p>
            </div>
          </Col>
        </Row>
      </Container>

      <Container className="my-5">
        <h3 className="text-center mb-4" style={{ color: '#283C79', fontWeight: 'bold' }}>
          {t('our_partners')}
        </h3>
        <Carousel indicators={false} controls={true} interval={3000} pause={false}>
          {groupLogosSmart(
            [
              { src: "/images/victron-energy-b-v-seeklogo.png", alt: 'Victron Energy Corfu' },
              { src: '/images/yanmar-seeklogo.png', alt: 'Yanmar Marine Electronics' },
              { src: '/images/zeus-logo.png', alt: 'Zeus Navigation Systems' },
              { src: '/images/logo_feit_white.png', alt: 'Feit Electric Lighting' },
            ],
            perSlide
          ).map((group, slideIndex) => (
            <Carousel.Item key={slideIndex}>
              <div className="d-flex justify-content-center gap-4 align-items-center" style={{ height: '180px' }}>
                {group.map((partner, index) => {
                  const isWhiteTextLogo = partner.alt.includes('Feit');
                  return (
                    <div
                      key={index}
                      style={{
                        width: '140px',
                        height: '100px',
                        backgroundColor: isWhiteTextLogo ? '#1a1a1a' : 'white',
                        padding: '10px',
                        borderRadius: '8px',
                        boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <Image
                        src={partner.src}
                        alt={partner.alt}
                        width={100}
                        height={60}
                        style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                      />
                    </div>
                  );
                })}
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      </Container>

      <Container className="my-5">
        <h3 className="text-center mb-4" style={{ fontWeight: 'bold', color: '#283C79' }}>
          📍
        </h3>
        <Row className="g-4">
          <Col md={6}>
            <div
              className="map-wrapper"
              style={{
                position: 'relative',
                width: '100%',
                height: '440px',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 2px 12px rgba(0,0,0,0.1)',
              }}
            >
              <iframe
  title="IonianEMS Location"
  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3780.256161305995!2d19.849247976478846!3d39.6450291022452!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x135b5b7a919d53a3%3A0x532533d12e803c25!2sIonianEMS!5e1!3m2!1sen!2sgr!4v1788529511436!5m2!1sen!2sgr"
  width="100%"
  height="100%"
  style={{
    border: 0,
    position: 'absolute',
    top: 0,
    left: 0,
  }}
  allowFullScreen
  loading="lazy"
  referrerPolicy="strict-origin-when-cross-origin"
/>
            </div>
          </Col>
          <Col md={6}>
            <div style={{ borderRadius: '16px', overflow: 'hidden', boxShadow: '0 2px 10px rgba(0,0,0,0.08)' }}>
              <Image
                src="/images/storefront.webp"
                alt="IONIANEMS storefront at Gouvia Marina, Corfu"
                width={1200}
                height={440}
                layout="responsive"
                objectFit="cover"
                className="img-fluid"
              />
            </div>
          </Col>
          <Col xs={12}>
            <div
              style={{
                background: '#f9fbe7',
                borderRadius: '16px',
                padding: '25px',
                boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
              }}
            >
              <h5 className="mb-3" style={{ color: '#33691e', fontWeight: 'bold' }}>{t('contact_info')}</h5>
              <p><strong>📍 {t('address')}:</strong> Gouvia Marina, Corfu, Greece</p>
              <p><strong>📞 {t('phone')}:</strong> <a href="tel:+302661401219">+30 2661401219</a></p>
              <p><strong>📞 {t('phone')}:</strong> <a href="tel:+306987795043">+30 6987795043</a></p>
              <p><strong>✉️ {t('email')}:</strong> <a href="mailto:info@ionianems.com">info@ionianems.com</a></p>
              <p><strong>⏰ {t('hours')}:</strong> Mon–Sat: 9:00–18:00</p>
              <p>Need help with <Link href="/products/control_instruments">control instruments</Link> or <Link href="/products/battery_chargers">battery chargers</Link>? We’ve got you covered.</p>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default HomeScreen;
