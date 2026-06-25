import React from 'react';

export default function ProductSpecifications({ weight, dimensions, warranty, shipping, returnPolicy }) {
  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold text-gray-800">مشخصات فنی</h3>
      <ul className="space-y-2 text-gray-600">
        <li className="flex">
          <span className="w-32 font-medium">وزن:</span>
          <span>{weight} گرم</span>
        </li>
        <li className="flex">
          <span className="w-32 font-medium">ابعاد:</span>
          <span>{dimensions.width} × {dimensions.height} × {dimensions.depth} سانتیمتر</span>
        </li>
        <li className="flex">
          <span className="w-32 font-medium">گارانتی:</span>
          <span>{warranty}</span>
        </li>
        <li className="flex">
          <span className="w-32 font-medium">ارسال:</span>
          <span>{shipping}</span>
        </li>
        <li className="flex">
          <span className="w-32 font-medium">بازگشت:</span>
          <span>{returnPolicy}</span>
        </li>
      </ul>
    </div>
  );
}
