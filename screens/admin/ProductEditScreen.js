import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Form, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import Message from '../../components/Message';

import Loader from '../../components/Loader';
import FormContainer from '../../components/FormContainer';
import {
  useGetProductDetailsQuery,
  useUpdateProductMutation,
  useUploadProductImageMutation,
} from '../../slices/productsApiSlice';

const ProductEditScreen = () => {
  const router = useRouter();
  const { id: productId } = router.query;

  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState('');

  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductDetailsQuery(productId, { skip: !productId });

  const [updateProduct, { isLoading: loadingUpdate }] = useUpdateProductMutation();
  const [uploadProductImage, { isLoading: loadingUpload }] = useUploadProductImageMutation();

  useEffect(() => {
    if (product) {
      setName(product.name || '');
      setPrice(product.price || 0);
      setImage(product.image || '');
      setBrand(product.brand || '');
      setCategory(product.category || '');
      setCountInStock(product.countInStock || 0);
      setDescription(product.description || '');
    }
  }, [product]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await updateProduct({
        productId,
        name,
        price,
        image,
        brand,
        category,
        description,
        countInStock,
      }).unwrap();
      toast.success('✅ Product updated successfully!');
      refetch();
      router.push('/admin/productlist');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append('image', e.target.files[0]);

    try {
      const res = await uploadProductImage(formData).unwrap();
      setImage(res.filePath);
      toast.success('✅ Image uploaded successfully!');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <>
      <Button variant='light' className='my-3' onClick={() => router.push('/admin/productlist')}>
        Go Back
      </Button>
      <FormContainer>
        <h1>Edit Product</h1>
        {loadingUpdate && <Loader />}
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error?.data?.message || error.error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control type='text' value={name} onChange={(e) => setName(e.target.value)} />
            </Form.Group>

            <Form.Group controlId='price'>
              <Form.Label>Price</Form.Label>
              <Form.Control
                type='number'
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
              />
            </Form.Group>

            <Form.Group controlId='image'>
              <Form.Label>Image</Form.Label>
              <Form.Control
                type='text'
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
              <Form.Control type='file' onChange={uploadFileHandler} />
              {loadingUpload && <Loader />}
            </Form.Group>

            <Form.Group controlId='brand'>
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type='text'
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId='countInStock'>
              <Form.Label>Count In Stock</Form.Label>
              <Form.Control
                type='number'
                value={countInStock}
                onChange={(e) => setCountInStock(Number(e.target.value))}
              />
            </Form.Group>

            <Form.Group controlId='category'>
              <Form.Label>Category</Form.Label>
              <Form.Control
                as='select'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value=''>Select Category</option>
                <option value='Αντλίες Σκαφών'>Αντλίες Σκαφών</option>
                <option value='Υποβρύχιος Φωτισμός'>Υποβρύχιος Φωτισμός</option>
                <option value='Όργανα Ελέγχου'>Όργανα Ελέγχου</option>
                <option value='Υαλοκαθαριστήρες Σκαφών'>Υαλοκαθαριστήρες Σκαφών</option>
                <option value='Συστήματα Πλοήγησης'>Συστήματα Πλοήγησης</option>
                <option value='Alternator Regulator'>Alternator Regulator</option>
                <option value='Όργανα Ελέγχου και Αυτοματισμού'>Όργανα Ελέγχου και Αυτοματισμού</option>
                <option value='Έξυπνο Σύστημα Πρόληψης Συγκρούσεων'>Έξυπνο Σύστημα Πρόληψης Συγκρούσεων</option>
                <option value='Συστήματα Ελέγχου'>Συστήματα Ελέγχου</option>
                <option value='Ηλεκτρολογικό Υλικό Σκαφών'>Ηλεκτρολογικό Υλικό Σκαφών</option>
                <option value='Ηλεκτρικός Εξοπλισμός'>Ηλεκτρικός Εξοπλισμός</option>
                <option value='Φορτιστές Μπαταριών'>Φορτιστές Μπαταριών</option>
                <option value='Συστήματα Αυτοματισμού'>Συστήματα Αυτοματισμού</option>
                <option value='Marine Generator'>Marine Generator</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId='description'>
              <Form.Label>Description</Form.Label>
              <Form.Control
                as='textarea'
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>

            <Button type='submit' variant='primary' className='mt-3'>
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default ProductEditScreen;
