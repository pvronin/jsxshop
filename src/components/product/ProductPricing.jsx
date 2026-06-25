import React from 'react';

export default function ProductPricing({ price, discountPercentage }) {
  const discountAmount = (price * discountPercentage / 100).toFixed(2);
  const discountedPrice = (price - discountAmount).toFixed(2);

  return (
    <div className="bg-gray-50 p-6 rounded-xl">
      {discountPercentage > 0 && (
        <div className="inline-block px-3 py-1 bg-red-500 text-white text-sm font-bold rounded-full mb-3">
          {discountPercentage}% تخفیف
        </div>
      )}

      <div className="space-y-2">
        {discountPercentage > 0 && (
          <div className="flex items-center gap-4">
            <span className="text-lg text-gray-500 line-through">
              ${price.toFixed(2)}
            </span>
            <span className="text-sm text-red-600 font-medium">
              -${discountAmount}
            </span>
          </div>
        )}

        <div className="flex items-center gap-3">
          <span className="text-3xl font-bold text-gray-800">
            ${discountedPrice}
          </span>
          {discountPercentage > 0 && (
            <span className="text-sm text-green-600 font-medium">
              شما {discountPercentage}% صرفه‌جویی کردید
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
