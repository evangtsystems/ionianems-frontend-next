import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
import Rating from '../components/Rating';
import Meta from '../components/Meta';
import { addToCart } from '../slices/cartSlice';
import Link from 'next/link';
import ShareButtons from '../components/ShareButtons';


const ProductScreen = ({ product }) => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);

  const [qty, setQty] = useState(1);

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    window.location.href = '/cart';
  };

  if (!product) return <p>Product not found.</p>;

  return (
    <>
      <Link href='/' className='btn btn-light my-3'>Go Back</Link>
      <Meta title={product.name} description={product.description} />

      <Row>
        <Col md={6}>
         <Image
  src={
    product.image?.startsWith('http')
      ? product.image
      : product.image
        ? `https://ionianems1-backend-erdrase6hwexhndz.italynorth-01.azurewebsites.net${product.image}`
        : '/images/placeholder.svg'
  }
  alt={product.name || 'No image available'}
  fluid
  style={{
    maxWidth: '100%',
    height: 'auto',
    objectFit: 'contain',
    border: '1px solid #ddd',
    borderRadius: '8px',
    backgroundColor: '#f8f9fa',
    padding: '4px'
  }}
  onError={(e) => {
    e.target.onerror = null;
    e.target.src = '/images/placeholder.svg';
  }}
/>





        </Col>

        <Col md={3}>
          <ListGroup variant='flush'>
            <ListGroup.Item><h3>{product.name}</h3></ListGroup.Item>
            <ListGroup.Item>
              <Rating value={product.rating} text={`${product.numReviews} reviews`} />
            </ListGroup.Item>
            {userInfo ? (
              <ListGroup.Item>Price: €{product.price}</ListGroup.Item>
            ) : (
              <ListGroup.Item>
                <Link href='/register'>Register to see price</Link>
              </ListGroup.Item>
            )}
            <ListGroup.Item>
  Description: {product.description}
</ListGroup.Item>

<ListGroup.Item>
  <strong>Share this product:</strong>
  <ShareButtons
    url={`https://ionianems.com/product/${product._id}`}
    text={`Check out ${product.name} on IonianEMS!`}
  />
</ListGroup.Item>

          </ListGroup>
        </Col>

        <Col md={3}>
          <Card>
            <ListGroup variant='flush'>
              {userInfo && (
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col><strong>€{product.price}</strong></Col>
                  </Row>
                </ListGroup.Item>
              )}
              <ListGroup.Item>
                <Row>
                  <Col>Status:</Col>
                  <Col>{product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}</Col>
                </Row>
              </ListGroup.Item>

              {product.countInStock > 0 && (
                <ListGroup.Item>
                  <Row>
                    <Col>Qty</Col>
                    <Col>
                      <Form.Control
                        as='select'
                        value={qty}
                        onChange={(e) => setQty(Number(e.target.value))}
                      >
                        {[...Array(product.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>{x + 1}</option>
                        ))}
                      </Form.Control>
                    </Col>
                  </Row>
                </ListGroup.Item>
              )}

              <ListGroup.Item>
                <Button
                  className='btn-block'
                  type='button'
                  disabled={product.countInStock === 0}
                  onClick={addToCartHandler}
                >
                  Add To Cart
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default ProductScreen;
