import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ProductCard from "../components/shop/ProductCard";
import { PiShoppingBagOpenLight } from "react-icons/pi";
import { HiOutlineRocketLaunch } from "react-icons/hi2";

export default function Cart() {
    const cart = useSelector((state) => state.cart.cart);

    // Constants
    const TAX_RATE = 10;
    const FREE_SHIPPING_THRESHOLD = 50;
    const SHIPPING_COST = 5;

    // Cart calculations
    const subtotal = cart.reduce((total, item) => total + item.price * item.qty, 0);
    const totalItems = cart.reduce((total, item) => total + item.qty, 0);
    const taxAmount = (TAX_RATE / 100) * subtotal;
    const shippingCost = subtotal > FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
    const total = subtotal + taxAmount + shippingCost;

    // Format helpers
    const formatCurrency = (amount) => `$${amount.toFixed(2)}`;
    const formatNumber = (num) => num.toLocaleString();

    // Shipping message
    const shippingText = subtotal > FREE_SHIPPING_THRESHOLD
        ? 'رایگان'
        : formatCurrency(shippingCost);

    return (
        <div className="min-h-screen bg-gray-50 py-10">
            <div className="container mx-auto px-4">
                <h1 className="text-4xl font-extrabold text-gray-800 mb-10 flex justify-center items-center gap-3 text-center">
                    سبد خرید شما
                    <PiShoppingBagOpenLight className="bg-blue-400 text-white text-5xl rounded-xl p-1" />
                </h1>

                {cart?.length > 0 ? (
                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Cart Items */}
                        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5 lg:w-2/3">
                            {cart.map((item) => (
                                <ProductCard key={item.id} item={item} />
                            ))}
                        </div>

                        {/* Order Summary */}
                        <div className="lg:w-1/3">
                            <div className="bg-white rounded-2xl shadow-xl p-7 sticky top-10 border border-gray-200">
                                <h2 className="text-lg font-bold text-gray-800 pb-4">
                                    خلاصه سفارش
                                </h2>

                                <div className="space-y-4 mb-6">
                                    <SummaryRow
                                        label="تعداد کل کالاها"
                                        value={formatNumber(totalItems)}
                                        valueClassName="text-blue-600"
                                    />

                                    <SummaryRow
                                        label="جمع سبد خرید بدون مالیات"
                                        value={formatCurrency(subtotal)}
                                        valueClassName="text-red-600 font-black"
                                    />

                                    <SummaryRow
                                        label="مالیات"
                                        value={`%${TAX_RATE}`}
                                        valueClassName="text-red-600 font-black"
                                    />

                                    <SummaryRow
                                        label="هزینه ارسال"
                                        value={shippingText}
                                        valueClassName={subtotal > FREE_SHIPPING_THRESHOLD ? 'text-emerald-600' : 'text-red-600'}
                                    />


                                    <SummaryRow
                                        label="جمع سبد خرید قابل پرداخت"
                                        value={formatCurrency(total)}
                                        valueClassName="text-2xl font-black text-red-600"
                                        labelClassName="text-base font-bold text-gray-800"
                                    />

                                </div>

                                <button className="w-full flex justify-center items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl transition-colors shadow-lg shadow-emerald-200/50">
                                    ادامه جهت تسویه حساب
                                    <HiOutlineRocketLaunch size={22} />
                                </button>

                                <p className="text-xs text-gray-400 mt-4 text-center">
                                    خرید های بالای {FREE_SHIPPING_THRESHOLD} دلار هزینه ارسال رایگان میباشد
                                </p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <EmptyCart />
                )}
            </div>
        </div>
    );
}

// Sub-components
function SummaryRow({ label, value, valueClassName = "", labelClassName = "" }) {
    return (
        <div className="flex justify-between items-center font-semibold text-gray-700 border-t border-gray-200 pt-4">
            <span className={labelClassName}>{label}:</span>
            <span className={`text-lg ${valueClassName}`}>{value}</span>
        </div>
    );
}

function EmptyCart() {
    return (
        <div className="text-center py-20 bg-white rounded-2xl shadow-xl border border-gray-200">
            <p className="text-6xl mb-4">🛒</p>
            <h2 className="text-2xl font-bold text-gray-700 mb-2">سبد خرید شما خالی است</h2>
            <p className="text-lg text-gray-500 mb-6">
                برای افزودن محصول به سبد خرید به صفحه فروشگاه بازگردید.
            </p>
            <Link
                to="/shop"
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-xl transition-colors shadow-lg shadow-blue-200/50"
            >
                رفتن به فروشگاه 🏪
            </Link>
        </div>
    );
}
