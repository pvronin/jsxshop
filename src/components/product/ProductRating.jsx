import React from 'react';

export default function ProductRating({ rating, reviewsCount }) {
  const fullStars = Math.floor(rating);

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <span
              key={i}
              className={`text-xl ${i < fullStars ? 'text-yellow-400' : 'text-gray-300'}`}
            >
              ★
            </span>
          ))}
        </div>
        <span className="text-gray-600">({rating.toFixed(1)})</span>
      </div>
      <span className="text-blue-600 text-sm">{reviewsCount} نظر</span>
    </div>
  );
}
