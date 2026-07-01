import { Container, Row, Col, Spinner } from 'react-bootstrap';
import Product from '../components/Product';
import { useTranslation } from 'react-i18next'; 
import { categoryMap } from '../utils/categoryMap';

const CategoryProductsScreen = ({ categoryKey, products, isRefreshing }) => {
  const { t } = useTranslation();

  const greekCategory = categoryMap[categoryKey] || '';

  return (
    <Container>
      <h1 className="text-center my-4">{t(categoryKey)}</h1>

      {isRefreshing && (
        <div className="text-center mb-3" style={{ color: '#666' }}>
          <Spinner animation="border" size="sm" /> Refreshing products...
        </div>
      )}

      {products?.length > 0 ? (
        <Row>
          {products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      ) : (
        <div
          style={{
            padding: '1rem',
            backgroundColor: '#f8f9fa',
            borderRadius: '8px',
            marginTop: '2rem',
            textAlign: 'center',
          }}
        >
          <h2>{t(categoryKey)}</h2>
          <p>
            {`We are currently updating our ${t(
              categoryKey
            ).toLowerCase()} category. Soon you’ll find a full range of relevant products for yachts and boats.`}
          </p>
          <p>
            {t('For product inquiries or availability, please')}{' '}
            <a href="/contact" style={{ color: '#0070f3' }}>
              {t('contact us here')}
            </a>.
          </p>
        </div>
      )}
    </Container>
  );
};

export default CategoryProductsScreen;
