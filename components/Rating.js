import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

const Rating = ({ value, text, color }) => {
  return (
    <div className="rating" style={{ color }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span key={star}>
          {value >= star ? (
            <FaStar />
          ) : value >= star - 0.5 ? (
            <FaStarHalfAlt />
          ) : (
            <FaRegStar />
          )}
        </span>
      ))}
      {text && <span className="rating-text" style={{ marginLeft: '8px' }}>{text}</span>}
    </div>
  );
};

Rating.defaultProps = {
  color: '#f8e825', // gold
};

export default Rating;
