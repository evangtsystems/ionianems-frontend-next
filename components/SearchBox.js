// components/SearchBox.js

import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useRouter } from 'next/router';

const SearchBox = () => {
  const router = useRouter();
  const { keyword: urlKeyword } = router.query;

  // ✅ Handle undefined keyword on first render
  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    if (urlKeyword) {
      setKeyword(urlKeyword);
    }
  }, [urlKeyword]);

  const submitHandler = (e) => {
    e.preventDefault();
    const trimmed = keyword.trim();

    if (trimmed) {
      router.push(`/search/${trimmed}`);
      setKeyword('');
    } else {
      router.push('/');
    }
  };

  return (
    <Form onSubmit={submitHandler} className="d-flex">
      <Form.Control
        type="text"
        name="q"
        onChange={(e) => setKeyword(e.target.value)}
        value={keyword}
        placeholder="Search Products..."
        className="mr-sm-2 ml-sm-5"
      />
      <Button type="submit" className="custom-search-btn p-2 mx-2">
        Search
      </Button>
    </Form>
  );
};

export default SearchBox;
