import { useEffect, useRef, useState } from 'react';
import Script from 'next/script';
import { Container, Form, Button, Row, Col, Alert } from 'react-bootstrap';
import Head from 'next/head';
import Layout from '../components/Layout';

const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

const ContactPage = () => {
  const widgetContainerRef = useRef(null);
  const widgetIdRef = useRef(null);
  const [turnstileReady, setTurnstileReady] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState(null);

  useEffect(() => {
    if (!turnstileReady || !turnstileSiteKey || !widgetContainerRef.current || !window.turnstile) return;

    widgetIdRef.current = window.turnstile.render(widgetContainerRef.current, {
      sitekey: turnstileSiteKey,
      callback: (token) => setTurnstileToken(token),
      'expired-callback': () => setTurnstileToken(''),
      'error-callback': () => {
        setTurnstileToken('');
        setStatus('verification');
      },
    });

    return () => {
      if (widgetIdRef.current !== null && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current);
        widgetIdRef.current = null;
      }
    };
  }, [turnstileReady]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!turnstileToken || isSending) return;
    setIsSending(true);
    setStatus(null);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, turnstileToken }),
      });
      if (res.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    } finally {
      setIsSending(false);
      setTurnstileToken('');
      if (widgetIdRef.current !== null && window.turnstile) {
        window.turnstile.reset(widgetIdRef.current);
      }
    }
  };

  return (
    <Layout>
      <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit" strategy="afterInteractive" onReady={() => setTurnstileReady(true)} />
      <Head>
        <title>Contact IonianEMS | Marine Electrical Services in Corfu</title>
        <meta
          name="description"
          content="Reach out to IonianEMS for yacht and boat electrical services, marine electronics support, or equipment inquiries. Based in Gouvia Marina, Corfu, Greece."
        />
        <meta
          name="keywords"
          content="contact marine electrician Corfu, IonianEMS contact, boat electronics support, yacht electrician Greece, marine navigation systems Corfu, Gouvia Marina services"
        />
        <link rel="canonical" href="https://www.ionianems.com/contact" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "IONIANEMS",
              "url": "https://www.ionianems.com/contact",
              "email": "info@ionianems.com",
              "telephone": "+302661401219",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Gouvia Marina",
                "addressLocality": "Corfu",
                "addressCountry": "GR"
              },
              "openingHours": "Mo-Sa 09:00-18:00",
              "image": "https://www.ionianems.com/images/storefront.webp",
              "description": "Contact IonianEMS for marine electronics, yacht electrical repairs, and navigation system support based in Corfu, Greece."
            }),
          }}
        />
      </Head>

      {/* 🔹 Hero Section */}
      <div
        style={{
          background: 'linear-gradient(to right, #283C79, #4a66a3)',
          color: '#fff',
          padding: '60px 20px',
          textAlign: 'center',
        }}
      >
        <h1 style={{ fontWeight: 'bold', fontSize: '2.5rem' }}>Contact Our Marine Electrical Experts</h1>
        <p>
          We’d love to hear from you — get in touch for marine electronics, yacht power systems, or installation support in Corfu.
        </p>
      </div>

      {/* 🔸 Form + Info Section */}
      <Container className="py-5">
        <Row>
          {/* 📨 Form */}
          <Col md={6}>
            <h3 className="mb-4">Send Us a Message</h3>

            {status === 'success' && <Alert variant="success">✅ Message sent successfully!</Alert>}
            {status === 'error' && <Alert variant="danger">❌ Something went wrong. Please try again.</Alert>}
            {status === 'verification' && <Alert variant="danger">Verification failed. Please retry the challenge.</Alert>}

            <Form onSubmit={handleSubmit} className="shadow p-4 rounded" style={{ backgroundColor: '#f7f7f7' }}>
              <Form.Group controlId="name" className="mb-3">
                <Form.Label>Your Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="John Doe"
                />
              </Form.Group>

              <Form.Group controlId="email" className="mb-3">
                <Form.Label>Your Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="you@example.com"
                />
              </Form.Group>

              <Form.Group controlId="message" className="mb-3">
                <Form.Label>Your Message</Form.Label>
                <Form.Control
                  as="textarea"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  required
                  placeholder="Type your message here..."
                />
              </Form.Group>

              <div ref={widgetContainerRef} className="mb-3" />
              {!turnstileSiteKey && <Alert variant="danger">Contact form is temporarily unavailable. Please email us directly.</Alert>}
              <Button type="submit" variant="primary" className="w-100" disabled={!turnstileToken || isSending || !turnstileSiteKey}>
                {isSending ? 'Sending...' : 'Send Message'}
              </Button>
            </Form>
          </Col>

          {/* 📍 Info / Map */}
          <Col md={6} className="mt-5 mt-md-0">
            <h3 className="mb-4">Visit or Call Us</h3>
            <div className="mb-3">
              <strong>📍 Address:</strong> Gouvia Marina, Corfu, Greece
            </div>
            <div className="mb-3">
              <strong>📞 Phone:</strong> <a href="tel:+302661401219">+30 2661 401219</a>
            </div>
            <div className="mb-3">
              <strong>📧 Email:</strong> <a href="mailto:info@ionianems.com">info@ionianems.com</a>
            </div>
            <div className="mb-4">
              <strong>🕘 Hours:</strong> Mon–Sat: 9:00–18:00
            </div>

           <div
  style={{
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 2px 12px rgba(0,0,0,0.1)',
  }}
>
  <iframe
    title="IonianEMS Location"
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3780.256161305995!2d19.849247976478846!3d39.6450291022452!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x135b5b7a919d53a3%3A0x532533d12e803c25!2sIonianEMS!5e1!3m2!1sen!2sgr!4v1788529511436!5m2!1sen!2sgr"
    width="100%"
    height="420"
    style={{
      border: 0,
      display: 'block',
    }}
    allowFullScreen
    loading="lazy"
    referrerPolicy="strict-origin-when-cross-origin"
  />
</div>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default ContactPage;
