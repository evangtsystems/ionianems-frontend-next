import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import FormContainer from '../components/FormContainer';
import { useLoginMutation } from '../slices/userApiSlice';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';


const LoginScreen = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [pendingVerification, setPendingVerification] = useState(false);
  const [verificationSuccess, setVerificationSuccess] = useState(false);

  const router = useRouter();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const [login, { isLoading }] = useLoginMutation();

  const { redirect, verified, pending } = router.query;

  useEffect(() => {
    setVerificationSuccess(!!verified);
    setPendingVerification(pending !== undefined);
  }, [verified, pending]);

  useEffect(() => {
    if (userInfo) {
      router.push(redirect || '/');
      setVerificationSuccess(false);
    }
  }, [router, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials(res));
      router.push(redirect || '/');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <FormContainer>
      <h1>{t('sign_in')}</h1>

      {verificationSuccess && (
        <Message variant="success">
          {t('email_verified_success')}
        </Message>
      )}

      {pendingVerification && (
        <Message variant="warning">
          {t('verify_email_first')}
        </Message>
      )}

      <Form onSubmit={submitHandler}>
        <Form.Group className="my-2" controlId="email">
          <Form.Label>{t('email')}</Form.Label>
          <Form.Control
            type="email"
            placeholder={t('enter_email')}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="off"
          />
        </Form.Group>

        <Form.Group className="my-2" controlId="password">
          <Form.Label>{t('password')}</Form.Label>
          <Form.Control
            type="password"
            placeholder={t('enter_password')}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
          />
        </Form.Group>

        <Button disabled={isLoading} type="submit" variant="primary">
          {t('sign_in')}
        </Button>

        {isLoading && <Loader />}
      </Form>

      <Row className="py-3">
        <Col>
          {t('new_customer')}{' '}
          <Link
            href={redirect ? `/register?redirect=${redirect}` : '/register'}
          >
            {t('register')}
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginScreen;
