import { useRouter } from 'next/router';
import { Container, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';



import Message from '../components/Message';

const CheckEmailScreen = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const { email } = router.query;

  const goToLogin = () => {
    router.push('/login');
  };

  return (
    <Container className="text-center mt-5">
      <h1>{t('email_verification_required')}</h1>
      <Message variant="info">
        {t('check_your_email')}{' '}
        <strong>({email})</strong>{' '}
        {t('click_verification_link')}
      </Message>
      <Button onClick={goToLogin} variant="primary" className="mt-3">
        {t('go_to_login')}
      </Button>
    </Container>
  );
};

export default CheckEmailScreen;

// ✅ Load translations
export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['translation'])),
    },
  };
}
