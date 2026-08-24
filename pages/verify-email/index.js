import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { Container, Button } from 'react-bootstrap';
import Message from '../../components/Message';

export default function VerifyEmailScreen() {
  const router = useRouter();
  const { token } = router.query;

  const [status, setStatus] = useState('loading');
  const [message, setMessage] = useState('');

  const backendURL = process.env.NEXT_PUBLIC_API_URL || "https://ionianems.com";

  useEffect(() => {
    if (!token) return;

    const verifyEmail = async () => {
      try {
        const { data } = await axios.get(`${backendURL}/api/users/verify/${token}`);

        setMessage(data.message || 'Verification successful! Redirecting...');
        setStatus('success');
        setTimeout(() => router.push('/login?verified=true'), 3000);
      } catch (error) {
        setMessage(error.response?.data?.message || 'Invalid or expired token.');
        setStatus('error');
      }
    };

    verifyEmail();
  }, [token, backendURL, router]);

  return (
    <Container className="text-center">
      <h1>Email Verification</h1>
      {status === 'loading' && <Message variant="info">Verifying your email...</Message>}
      {status === 'success' && <Message variant="success">{message}</Message>}
      {status === 'error' && <Message variant="danger">{message}</Message>}
      <Button variant="primary" onClick={() => router.push('/login')}>
        Go to Login
      </Button>
    </Container>
  );
}
