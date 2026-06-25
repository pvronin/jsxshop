import React from 'react';

export default function ProductHeader({ title, sku, brand, stock }) {
  return (
    <div className="pb-6 border-b border-gray-200">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
        {title}
      </h1>

      <div className="flex flex-wrap gap-3">
        <span className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-lg">
          کد: {sku}
        </span>
        <span className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-lg">
          برند: {brand}
        </span>
        <span className={`px-3 py-1 text-sm rounded-lg font-medium ${
          stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          موجودی: {stock} عدد
        </span>
      </div>
    </div>
  );
}
