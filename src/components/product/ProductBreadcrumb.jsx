import React from 'react';
import { Link } from 'react-router-dom';

export default function ProductBreadcrumb({ category, title }) {
  return (
    <div className="mb-8 text-sm text-gray-500">
      <Link to="/" className="hover:text-blue-600">خانه</Link>
      <span className="mx-2">/</span>
      <Link to="/shop" className="hover:text-blue-600">فروشگاه</Link>
      <span className="mx-2">/</span>
      <Link to={`/shop/${category}`} className="hover:text-blue-600">{category}</Link>
      <span className="mx-2">/</span>
      <span className="text-gray-700">{title}</span>
    </div>
  );
}
