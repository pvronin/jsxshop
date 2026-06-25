import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { productApi } from '../services/productApi';
import ProductBreadcrumb from '../components/product/ProductBreadcrumb';
import ProductImageGallery from '../components/product/ProductImageGallery';
import ProductHeader from '../components/product/ProductHeader';
import ProductRating from '../components/product/ProductRating';
import ProductPricing from '../components/product/ProductPricing';
import ProductDescription from '../components/product/ProductDescription';
import ProductSpecifications from '../components/product/ProductSpecifications';
import ProductTags from '../components/product/ProductTags';
import ProductPurchaseControls from '../components/product/ProductPurchaseControls';
import ProductReviews from '../components/product/ProductReviews';

export default function Product() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await productApi.getById(id);
        setProduct(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > 0) setQuantity(value);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl text-gray-600">در حال بارگذاری محصول...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl text-red-600">خطا: {error}</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl text-gray-600">محصول یافت نشد</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <ProductBreadcrumb category={product.category} title={product.title} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <ProductImageGallery
          images={product.images}
          thumbnail={product.thumbnail}
          selectedImage={selectedImage}
          onSelect={setSelectedImage}
          title={product.title}
        />

        <div className="space-y-6">
          <ProductHeader
            title={product.title}
            sku={product.sku}
            brand={product.brand}
            stock={product.stock}
          />

          <ProductRating rating={product.rating} reviewsCount={product.reviews.length} />

          <ProductPricing price={product.price} discountPercentage={product.discountPercentage} />

          <ProductDescription description={product.description} />

          <ProductSpecifications
            weight={product.weight}
            dimensions={product.dimensions}
            warranty={product.warrantyInformation}
            shipping={product.shippingInformation}
            returnPolicy={product.returnPolicy}
          />

          <ProductTags tags={product.tags} />

          <ProductPurchaseControls
            product={product}
            quantity={quantity}
            onQuantityChange={handleQuantityChange}
          />

          <div className="space-y-2 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <span className="font-medium">بارکد:</span>
              <span>{product.meta.barcode}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium">تاریخ ایجاد:</span>
              <span>{new Date(product.meta.createdAt).toLocaleDateString('fa-IR')}</span>
            </div>
          </div>
        </div>
      </div>

      <ProductReviews reviews={product.reviews} />
    </div>
  );
}
