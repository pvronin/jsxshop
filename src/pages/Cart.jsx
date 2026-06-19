import { useSelector } from "react-redux";

import { Link } from "react-router-dom";
import ProductCard from "../components/shop/ProductCard";

export default function Cart() {
    const cart = useSelector((state) => state.cart.cart);

    // محاسبه جمع کل سبد خرید
    const cartTotal = cart.reduce((total, item) => total + item.price * item.qty, 0);
    const totalQuantity = cart.reduce((total, item) => total + item.qty, 0);

    return (

        <div className="min-h-screen bg-gray-50 py-10"> {/* پس زمینه روشن */}
            <div className="container mx-auto px-4">
                <h1 className="text-4xl font-extrabold text-gray-800 mb-10 text-center">
                    سبد خرید شما 🛍️
                </h1>

                {cart && cart.length > 0 ? (
                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* لیست آیتم‌های سبد خرید */}
                        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5 lg:w-2/3">
                            {cart.map((item) => (
                                <ProductCard item={item} />
                            ))}
                        </div>

                        {/* خلاصه سبد خرید (Total Summary) */}
                        <div className="lg:w-1/3">
                            <div className="bg-white rounded-2xl shadow-xl p-8 sticky top-10 border border-gray-200">
                                <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-4">
                                    خلاصه سفارش
                                </h2>

                                <div className="space-y-4 mb-6">
                                    <div className="flex justify-between text-lg text-gray-700">
                                        <span>تعداد کل کالاها:</span>
                                        <span className="font-bold text-blue-600">{totalQuantity}</span>
                                    </div>
                                    <div className="flex justify-between text-lg font-semibold text-gray-700 border-t pt-4">
                                        <span>جمع کل سبد خرید:</span>
                                        <span className="text-2xl font-black text-red-600">
                                            ${cartTotal.toLocaleString()}
                                        </span>
                                    </div>
                                </div>

                                <button
                                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl transition-colors text-lg shadow-lg shadow-emerald-200/50"
                                >
                                    ادامه جهت تسویه حساب 🚀
                                </button>
                                <p className="text-xs text-gray-400 mt-3 text-center">
                                    مالیات و هزینه حمل در مرحله بعد محاسبه می‌شود.
                                </p>
                            </div>
                        </div>
                    </div>
                ) : (
                    /* حالت خالی بودن سبد خرید */
                    <div className="text-center py-20 bg-white rounded-2xl shadow-xl border border-gray-200">
                        <p className="text-4xl mb-4">😔</p>
                        <h2 className="text-2xl font-bold text-gray-700 mb-2">سبد خرید شما خالی است</h2>
                        <p className="text-lg text-gray-500">
                            برای افزودن محصول به سبد خرید به صفحه فروشگاه بازگردید.
                        </p>
                        {/* اگر کامپوننت لینک به صفحه محصولات را دارد، اینجا یک دکمه می‌آید */}
                    </div>
                )}
            </div>
        </div>

    );
}
