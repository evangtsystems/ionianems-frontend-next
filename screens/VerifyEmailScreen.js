import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Container, Button } from 'react-bootstrap';
import Message from '../components/Message';
import axios from 'axios';

const VerifyEmailScreen = () => {
  const router = useRouter();
  const { token } = router.query;
  
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const backendURL = process.env.NEXT_PUBLIC_API_URL || "https://ionianems-backend-hkgghubjeqgyctdc.italynorth-01.azurewebsites.net";

  useEffect(() => {
    const verifyEmail = async () => {
      if (!token) return; // Ensure token is available

      try {
        const { data } = await axios.get(`${backendURL}/api/users/verify/${token}`);

        if (data?.message === 'Email verified! You can now log in.') {
          setMessage(data.message);
          setTimeout(() => router.push('/login?verified=true'), 3000);
        } else {
          setMessage('Verification successful. Redirecting...');
          setTimeout(() => router.push('/login'), 3000);
        }
      } catch (err) {
        const errorMsg = err.response?.data?.message || 'Invalid or expired token';
        setError(errorMsg);
      } finally {
        setLoading(false);
      }
    };

    verifyEmail();
  }, [token, router, backendURL]);

  return (
    <Container className="text-center">
      <h1>Email Verification</h1>
      {loading ? (
        <Message variant="info">Verifying your email...</Message>
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Message variant="success">{message}</Message>
      )}
      <Button onClick={() => router.push('/login')} variant="primary">
        Go to Login
      </Button>
    </Container>
  );
};

export default VerifyEmailScreen;
