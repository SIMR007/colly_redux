import React from 'react';

const StarRating = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating - fullStars >= 0.5;

  const renderStars = () => {
    const stars = [];

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<span key={i} className="star full-star">&#9733;</span>);
      } else if (hasHalfStar && i === fullStars + 1) {
        stars.push(<span key={i} className="star half-star">&#9733;</span>);
      } else {
        stars.push(<span key={i} className="star">&#9734;</span>);
      }
    }

    return stars;
  };

  return (
    <div className="star-rating">
      
      {renderStars()}

    </div>
  );
};

export default StarRating;
