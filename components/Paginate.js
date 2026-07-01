import { Pagination } from 'react-bootstrap';
import Link from 'next/link';

const Paginate = ({ pages, page, isAdmin = false, keyword = '' }) => {
  if (pages <= 1) return null;

  return (
    <Pagination className="justify-content-center mt-4">
      {[...Array(pages).keys()].map((x) => {
        const pageNum = x + 1;
        let href = '';

        if (isAdmin) {
          href = `/admin/productlist/${pageNum}`;
        } else if (keyword) {
          href = `/search/${keyword}/page/${pageNum}`;
        } else {
          href = `/page/${pageNum}`;
        }

        return (
          <Link href={href} passHref legacyBehavior key={pageNum}>
            <Pagination.Item active={pageNum === page}>{pageNum}</Pagination.Item>
          </Link>
        );
      })}
    </Pagination>
  );
};

export default Paginate;
