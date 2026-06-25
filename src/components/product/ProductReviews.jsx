import React from 'react';

function ReviewItem({ review }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h4 className="font-bold text-gray-800">{review.reviewerName}</h4>
          <p className="text-sm text-gray-500">
            {new Date(review.date).toLocaleDateString('fa-IR')}
          </p>
        </div>

        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <span
              key={i}
              className={`text-lg ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}
            >
              ★
            </span>
          ))}
        </div>
      </div>

      <p className="text-gray-700 leading-relaxed">{review.comment}</p>
    </div>
  );
}

export default function ProductReviews({ reviews }) {
  if (!reviews || reviews.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 text-5xl mb-4">💬</div>
        <p className="text-gray-500">هنوز نظری برای این محصول ثبت نشده است.</p>
      </div>
    );
  }

  return (
    <div className="border-t border-gray-200 pt-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        نظرات کاربران ({reviews.length})
      </h2>

      <div className="space-y-6">
        {reviews.map((review, index) => (
          <ReviewItem key={index} review={review} />
        ))}
      </div>
    </div>
  );
}
