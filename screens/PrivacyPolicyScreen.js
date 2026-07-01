import Head from 'next/head';
import { Container } from 'react-bootstrap';

const PrivacyPolicyScreen = () => {
  return (
    <>
      <Head>
        <title>Privacy Policy | IonianEMS</title>
        <meta
          name="description"
          content="Read the privacy policy of IonianEMS – learn how we collect, use, and protect your data when you use our marine electrical services in Corfu, Greece."
        />
        <meta
          name="keywords"
          content="privacy policy, IonianEMS privacy, data protection, GDPR, marine services Corfu, yacht electronics Greece"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://www.ionianems.com/privacy-policy" />
      </Head>

      <Container className="my-5">
        <h1>Privacy Policy</h1>
        <p>
          At IonianEMS, we take your privacy seriously. This page outlines how we collect, use, and safeguard your personal information.
        </p>

        <h2>1. What Data We Collect</h2>
        <p>
          We collect personal data such as your name, email address, and usage statistics when you interact with our website or services.
        </p>

        <h2>2. How We Use Your Data</h2>
        <p>
          Your data is used solely to improve your user experience, respond to inquiries, and for marketing purposes aligned with your preferences.
        </p>

        <h2>3. Your Rights</h2>
        <p>
          You have the right to access, modify, or request deletion of your data at any time. Contact us at info@ionianems.com to make a request.
        </p>
      </Container>
    </>
  );
};

export default PrivacyPolicyScreen;
