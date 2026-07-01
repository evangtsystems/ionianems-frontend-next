import { Card } from 'react-bootstrap';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import Rating from './Rating';

const Product = ({ product }) => {
  const { userInfo } = useSelector((state) => state.auth);

  // ✅ Always construct a full absolute URL for non-cloudinary images
  const imageUrl = product.image?.startsWith('http')
    ? product.image
    : `https://ionianems-backend-hkgghubjeqgyctdc.italynorth-01.azurewebsites.net${product.image}`;

  return (
    <Card className="my-3 p-3 rounded">
      <Link href={`/product/${product._id}`} passHref legacyBehavior>
        <a>
          {/* ✅ Use plain <img> instead of Card.Img */}
          <img
            src={imageUrl}
            alt={product.name}
            style={{
              width: '100%',
              height: '200px',
              objectFit: 'cover',
              borderRadius: '8px',
            }}
          />
        </a>
      </Link>

      <Card.Body>
        <Link href={`/product/${product._id}`} passHref legacyBehavior>
          <a>
            <Card.Title as="div" className="product-title">
              <strong>{product.name}</strong>
            </Card.Title>
          </a>
        </Link>

        <Card.Text as="div">
          <Rating value={product.rating} text={`${product.numReviews} reviews`} />
        </Card.Text>

        {/* 
        {userInfo ? (
          <Card.Text as="h3">€{product.price}</Card.Text>
        ) : (
          <Link href="/register" passHref legacyBehavior>
            <a>
              <Card.Text as="h5" style={{ color: 'blue' }}>
                Register to see price
              </Card.Text>
            </a>
          </Link>
        )}
        */}
      </Card.Body>
    </Card>
  );
};

export default Product;
