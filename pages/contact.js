import { useState } from 'react';
import { Container, Form, Button, Row, Col, Alert } from 'react-bootstrap';
import Head from 'next/head';
import Layout from '../components/Layout';

const ContactPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <Layout>
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
            {status === 'error' && <Alert variant="danger">❌ Something went wrong. Try again.</Alert>}

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

              <Button type="submit" variant="primary" className="w-100">
                Send Message
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
                title="IonianEMS Map"
                src="https://www.google.com/maps?q=39.645001742961725,19.851914724030458&z=18&output=embed"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
              />
            </div>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default ContactPage;
