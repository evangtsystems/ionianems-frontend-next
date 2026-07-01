import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import validator from 'validator';
import { toast } from 'react-toastify';
import ReCAPTCHA from 'react-google-recaptcha';

import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { useRegisterMutation } from '../slices/userApiSlice';
import Message from '../components/Message';

const RegisterScreen = () => {
  const router = useRouter();
  const recaptchaRef = useRef(null);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);
  const [captchaToken, setCaptchaToken] = useState(null);

  const { userInfo } = useSelector((state) => state.auth);
  const [register, { isLoading }] = useRegisterMutation();

  const redirect = router.query.redirect || '/';

  useEffect(() => {
    if (userInfo) {
      router.push(redirect);
    }
  }, [userInfo, redirect, router]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (!validator.isEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }
    setError('');

    if (recaptchaRef.current) {
      recaptchaRef.current.execute();
    } else {
      toast.error('reCAPTCHA not loaded');
    }
  };

  const onRecaptchaVerify = async (token) => {
    setCaptchaToken(token);

    try {
      await register({ name, email, password, captchaToken: token }).unwrap();

      toast.success('Registration successful! Please check your email to verify your account.');
      setIsRegistered(true);

      router.push(`/check-email?email=${encodeURIComponent(email)}`);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <FormContainer>
      <h1>Register</h1>

      {isRegistered ? (
        <Message variant='info'>
          Registration successful! Please check your email and verify your account before logging in.
        </Message>
      ) : (
        <Form onSubmit={submitHandler}>
          <Form.Group className='my-2' controlId='name'>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group className='my-2' controlId='email'>
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type='email'
              placeholder='Enter email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          {error && <p style={{ color: 'red' }}>{error}</p>}

          <Form.Group className='my-2' controlId='password'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Enter password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Form.Group className='my-2' controlId='confirmPassword'>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Confirm password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>

          <ReCAPTCHA
  ref={recaptchaRef}
  sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
  size="invisible"
  onChange={onRecaptchaVerify}
/>



          <Button disabled={isLoading} type='submit' variant='primary'>
            Register
          </Button>

          {isLoading && <Loader />}
        </Form>
      )}

      <Row className='py-3'>
        <Col>
          Already have an account?{' '}
          <Link href={redirect ? `/login?redirect=${redirect}` : '/login'} passHref legacyBehavior>
            <a>Login</a>
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default RegisterScreen;
