import React from 'react';

export default function ProductDescription({ description }) {
  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold text-gray-800">توضیحات محصول</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
}
