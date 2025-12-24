import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { increment } from '../store/slices/Cartslice';


export function Product() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedImage, setSelectedImage] = useState(0);
    const [quantity, setQuantity] = useState(1);

    const cart = useSelector((state) => state.cart.cart);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`https://dummyjson.com/products/${id}`);

                if (!response.ok) throw new Error('محصول یافت نشد');
                const data = await response.json();
                console.log(data);

                setProduct(data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const calculateDiscountedPrice = () => {
        if (!product) return 0;
        const discountAmount = (product.price * product.discountPercentage) / 100;
        return (product.price - discountAmount).toFixed(2);
    };

    const handleAddToCart = () => {

        const cartItem = {
            id: product.id,
            title: product.title,
            price: parseFloat(calculateDiscountedPrice()),
            quantity: quantity,
            image: product.thumbnail,
            sku: product.sku
        };

        const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
        const existingItemIndex = existingCart.findIndex(item => item.id === product.id);

        if (existingItemIndex >= 0) {
            existingCart[existingItemIndex].quantity += quantity;
        } else {
            existingCart.push(cartItem);
        }

        localStorage.setItem('cart', JSON.stringify(existingCart));
        alert('محصول به سبد خرید اضافه شد!');
    };

    const handleQuantityChange = (e) => {
        const value = parseInt(e.target.value);
        if (value > 0) setQuantity(value);
    };

    if (loading) return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="text-xl text-gray-600">در حال بارگذاری محصول...</div>
        </div>
    );

    if (error) return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="text-xl text-red-600">خطا: {error}</div>
        </div>
    );

    if (!product) return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="text-xl text-gray-600">محصول یافت نشد</div>
        </div>
    );

    const discountedPrice = calculateDiscountedPrice();
    const discountAmount = (product.price * product.discountPercentage / 100).toFixed(2);

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Breadcrumb */}
            <div className="mb-8 text-sm text-gray-500">
                <span className="cursor-pointer hover:text-blue-600">خانه</span>
                <span className="mx-2">/</span>
                <span className="cursor-pointer hover:text-blue-600">فروشگاه</span>
                <span className="mx-2">/</span>
                <span className="cursor-pointer hover:text-blue-600">{product.category}</span>
                <span className="mx-2">/</span>
                <span className="text-gray-700">{product.title}</span>
            </div>

            {/* Main Product Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                {/* Image Gallery */}
                <div>
                    <div className="border border-gray-200 rounded-xl p-6 mb-4 bg-white flex items-center justify-center min-h-[400px]">
                        <img
                            src={product.images[selectedImage] || product.thumbnail}
                            alt={product.title}
                            className="max-w-full max-h-[400px] object-contain"
                        />
                    </div>

                    <div className="flex gap-3 overflow-x-auto pb-2">
                        {product.images.map((image, index) => (
                            <div
                                key={index}
                                className={`flex-shrink-0 w-20 h-20 border-2 rounded-lg overflow-hidden cursor-pointer bg-white flex items-center justify-center ${selectedImage === index
                                    ? 'border-blue-500 ring-2 ring-blue-200'
                                    : 'border-gray-200 hover:border-gray-300'
                                    }`}
                                onClick={() => setSelectedImage(index)}
                            >
                                <img
                                    src={image}
                                    alt={`${product.title} ${index + 1}`}
                                    className="w-full h-full object-contain"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Product Info */}
                <div className="space-y-6">
                    {/* Header */}
                    <div className="pb-6 border-b border-gray-200">
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                            {product.title}
                        </h1>

                        <div className="flex flex-wrap gap-3">
                            <span className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-lg">
                                کد: {product.sku}
                            </span>
                            <span className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-lg">
                                برند: {product.brand}
                            </span>
                            <span className={`px-3 py-1 text-sm rounded-lg font-medium ${product.stock > 0
                                ? 'bg-green-100 text-green-800'
                                : 'bg-red-100 text-red-800'
                                }`}>
                                موجودی: {product.stock} عدد
                            </span>
                        </div>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                    <span
                                        key={i}
                                        className={`text-xl ${i < Math.floor(product.rating)
                                            ? 'text-yellow-400'
                                            : 'text-gray-300'
                                            }`}
                                    >
                                        ★
                                    </span>
                                ))}
                            </div>
                            <span className="text-gray-600">({product.rating.toFixed(1)})</span>
                        </div>
                        <span className="text-blue-600 text-sm">
                            {product.reviews.length} نظر
                        </span>
                    </div>

                    {/* Pricing */}
                    <div className="bg-gray-50 p-6 rounded-xl">
                        {product.discountPercentage > 0 && (
                            <div className="inline-block px-3 py-1 bg-red-500 text-white text-sm font-bold rounded-full mb-3">
                                {product.discountPercentage}% تخفیف
                            </div>
                        )}

                        <div className="space-y-2">
                            {product.discountPercentage > 0 && (
                                <div className="flex items-center gap-4">
                                    <span className="text-lg text-gray-500 line-through">
                                        ${product.price.toFixed(2)}
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
                                {product.discountPercentage > 0 && (
                                    <span className="text-sm text-green-600 font-medium">
                                        شما {product.discountPercentage}% صرفه‌جویی کردید
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Description */}
                    <div className="space-y-3">
                        <h3 className="text-lg font-semibold text-gray-800">توضیحات محصول</h3>
                        <p className="text-gray-600 leading-relaxed">{product.description}</p>
                    </div>

                    {/* Specifications */}
                    <div className="space-y-3">
                        <h3 className="text-lg font-semibold text-gray-800">مشخصات فنی</h3>
                        <ul className="space-y-2 text-gray-600">
                            <li className="flex">
                                <span className="w-32 font-medium">وزن:</span>
                                <span>{product.weight} گرم</span>
                            </li>
                            <li className="flex">
                                <span className="w-32 font-medium">ابعاد:</span>
                                <span>{product.dimensions.width} × {product.dimensions.height} × {product.dimensions.depth} سانتیمتر</span>
                            </li>
                            <li className="flex">
                                <span className="w-32 font-medium">گارانتی:</span>
                                <span>{product.warrantyInformation}</span>
                            </li>
                            <li className="flex">
                                <span className="w-32 font-medium">ارسال:</span>
                                <span>{product.shippingInformation}</span>
                            </li>
                            <li className="flex">
                                <span className="w-32 font-medium">بازگشت:</span>
                                <span>{product.returnPolicy}</span>
                            </li>
                        </ul>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                        {product.tags.map((tag, index) => (
                            <span
                                key={index}
                                className="px-3 py-1 bg-blue-50 text-blue-600 text-sm rounded-lg"
                            >
                                #{tag}
                            </span>
                        ))}
                    </div>

                    {/* Purchase Controls */}
                    <div className="space-y-4 p-6 bg-gray-50 rounded-xl">
                        <div className="flex items-center gap-4">
                            <label className="text-gray-700 font-medium">تعداد:</label>
                            <input
                                type="number"
                                min="1"
                                max={product.stock}
                                value={quantity}
                                onChange={handleQuantityChange}
                                className="w-20 px-3 py-2 border border-gray-300 rounded-lg text-center"
                            />
                            {product.minimumOrderQuantity > 1 && (
                                <span className="text-sm text-gray-500">
                                    (حداقل سفارش: {product.minimumOrderQuantity})
                                </span>
                            )}
                        </div>

                        <button
                            onClick={() => dispatch(increment({ id: product.id, name: product.title, price: product.price, image: product.thumbnail, quantity: quantity }))}
                            disabled={product.stock === 0}
                            className={`w-full py-3 rounded-lg font-medium text-white transition-all ${product.stock > 0
                                ? 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800'
                                : 'bg-gray-400 cursor-not-allowed'
                                }`}
                        >
                            {product.stock > 0 ? 'افزودن به سبد خرید' : 'ناموجود'}
                        </button>
                    </div>

                    {/* Additional Info */}
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

            {/* Reviews Section */}
            <div className="border-t border-gray-200 pt-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                    نظرات کاربران ({product.reviews.length})
                </h2>

                {product.reviews.length > 0 ? (
                    <div className="space-y-6">
                        {product.reviews.map((review, index) => (
                            <div
                                key={index}
                                className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow"
                            >
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
                                                className={`text-lg ${i < review.rating
                                                    ? 'text-yellow-400'
                                                    : 'text-gray-300'
                                                    }`}
                                            >
                                                ★
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <p className="text-gray-700 leading-relaxed">{review.comment}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <div className="text-gray-400 text-5xl mb-4">💬</div>
                        <p className="text-gray-500">هنوز نظری برای این محصول ثبت نشده است.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Product;
