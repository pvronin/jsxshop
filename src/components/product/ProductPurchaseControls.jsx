import React from 'react';
import AddToCartBtn from '../shop/AddToCartBtn';

export default function ProductPurchaseControls({ product, quantity, onQuantityChange }) {
  return (
    <div className="space-y-4 p-6 bg-gray-50 rounded-xl">
      <div className="flex items-center gap-4">
        <label className="text-gray-700 font-medium">تعداد:</label>
        <input
          type="number"
          min="1"
          max={product.stock}
          value={quantity}
          onChange={onQuantityChange}
          className="w-20 px-3 py-2 border border-gray-300 rounded-lg text-center"
        />
        {product.minimumOrderQuantity > 1 && (
          <span className="text-sm text-gray-500">
            (حداقل سفارش: {product.minimumOrderQuantity})
          </span>
        )}
      </div>

      <AddToCartBtn item={product} quantity={quantity} />
    </div>
  );
}
