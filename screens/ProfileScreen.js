import React, { useEffect, useState } from 'react';
import { Table, Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { FaTimes } from 'react-icons/fa';
import { toast } from 'react-toastify';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { useProfileMutation } from '../slices/userApiSlice';
import { useGetMyOrdersQuery } from '../slices/orderApiSlice';
import { setCredentials } from '../slices/authSlice';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';

const ProfileScreen = () => {
  const { t } = useTranslation();
  const router = useRouter();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [cookiesDeleted, setCookiesDeleted] = useState(false);

  const { userInfo } = useSelector((state) => state.auth);
  const { data: orders, isLoading, error } = useGetMyOrdersQuery();
  const [updateProfile, { isLoading: loadingUpdateProfile }] = useProfileMutation();

  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name);
      setEmail(userInfo.email);
    } else {
      router.push('/login');
    }
  }, [userInfo, router]);

  const dispatch = useDispatch();

  const deleteCookiesHandler = () => {
    document.cookie.split(';').forEach((cookie) => {
      document.cookie = cookie
        .replace(/^ +/, '')
        .replace(/=.*/, `=;expires=${new Date().toUTCString()};path=/`);
    });

    localStorage.clear();
    sessionStorage.clear();
    setCookiesDeleted(true);
    toast.success(t('cookies_deleted'));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error(t('password_mismatch'));
    } else {
      try {
        const res = await updateProfile({ name, email, password }).unwrap();
        dispatch(setCredentials({ ...res }));
        toast.success(t('profile_updated'));
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const handleDataDeletion = async () => {
    if (window.confirm(t('confirm_delete_account'))) {
      try {
        await fetch('/api/users/delete', { method: 'DELETE' });
        toast.success(t('account_deleted'));
        router.push('/');
      } catch (error) {
        toast.error('Error deleting data');
        console.error(error);
      }
    }
  };

  return (
    <Row>
      <Col md={3} className="d-flex flex-column align-items-center">
        <h2>{t('user_profile')}</h2>

        <Form onSubmit={submitHandler} className="w-100 d-flex flex-column align-items-center">
          <Form.Group className="my-2 w-100" controlId="name">
            <Form.Label>{t('name')}</Form.Label>
            <Form.Control
              type="text"
              placeholder={t('enter_name')}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="my-2 w-100" controlId="email">
            <Form.Label>{t('email')}</Form.Label>
            <Form.Control
              type="email"
              placeholder={t('enter_email')}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="my-2 w-100" controlId="password">
            <Form.Label>{t('password')}</Form.Label>
            <Form.Control
              type="password"
              placeholder={t('enter_password')}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="my-2 w-100" controlId="confirmPassword">
            <Form.Label>{t('confirm_password')}</Form.Label>
            <Form.Control
              type="password"
              placeholder={t('confirm_password_placeholder')}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>

          <Button type="submit" variant="primary" className="common-button mt-3">
            {t('update')}
          </Button>
          {loadingUpdateProfile && <Loader />}

          <Button variant="danger" className="common-button mt-3" onClick={handleDataDeletion}>
            {t('delete_account')}
          </Button>

          <Button variant="secondary" className="common-button mt-3" onClick={deleteCookiesHandler}>
            {t('delete_cookies')}
          </Button>
        </Form>

        {cookiesDeleted && <p style={{ color: 'blue' }}>{t('cookies_deleted_message')}</p>}
      </Col>

      <Col md={9}>
        <h2>{t('my_orders')}</h2>
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error?.data?.message || error.error}</Message>
        ) : (
          <Table striped hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>{t('id')}</th>
                <th>{t('date')}</th>
                <th>{t('total')}</th>
                <th>{t('paid')}</th>
                <th>{t('delivered')}</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders?.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>{order.totalPrice}</td>
                  <td>
                    {order.isPaid ? order.paidAt.substring(0, 10) : <FaTimes style={{ color: 'red' }} />}
                  </td>
                  <td>
                    {order.isDelivered ? order.deliveredAt.substring(0, 10) : <FaTimes style={{ color: 'red' }} />}
                  </td>
                  <td>
                    <Link href={`/order/${order._id}`} passHref legacyBehavior>
                      <Button className='btn-sm' variant='light'>{t('details')}</Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  );
};

export default ProfileScreen;
