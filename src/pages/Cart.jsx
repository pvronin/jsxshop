import { useDispatch, useSelector } from "react-redux";
import { decrement, increment, removeitem } from "../store/slices/Cartslice";

export default function Cart() {
    const cart = useSelector((state) => state.cart.cart);
    const dispatch = useDispatch();

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
                        <div className="lg:w-2/3 space-y-6">
                            {cart.map((item) => (
                                <div
                                    key={item.id}
                                    className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-200 flex items-center justify-between"
                                >
                                    <div className="flex items-center gap-6 flex-grow">
                                        {/* تصویر محصول */}
                                        <div className="flex-shrink-0">
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-20 h-20 object-cover rounded-xl border border-gray-200"
                                            />
                                        </div>

                                        {/* اطلاعات محصول */}
                                        <div className="flex-grow">
                                            <h3 className="text-xl font-bold text-gray-800 mb-1">
                                                {item.name}
                                            </h3>
                                            <span className="text-md font-semibold text-gray-500">
                                                قیمت واحد: <span className="text-blue-600">${item.price.toLocaleString()}</span>
                                            </span>
                                        </div>

                                        {/* کنترل تعداد و قیمت کل آیتم */}
                                        <div className="flex items-center gap-6">
                                            {/* کنترلر تعداد */}
                                            <div className="flex items-center gap-2 border border-gray-300 rounded-full p-1">
                                                <button
                                                    onClick={() => dispatch(decrement({ id: item.id }))}
                                                    className="bg-blue-400 hover:bg-blue-500 text-white w-8 h-8 rounded-full text-lg leading-none flex items-center justify-center transition-colors"
                                                >
                                                    −
                                                </button>
                                                <span className="font-bold text-lg w-6 text-center text-gray-800">
                                                    {item.qty}
                                                </span>
                                                <button
                                                    onClick={() => dispatch(increment({ id: item.id }))}
                                                    className="bg-blue-500 hover:bg-blue-600 text-white w-8 h-8 rounded-full text-lg leading-none flex items-center justify-center transition-colors"
                                                >
                                                    +
                                                </button>
                                            </div>

                                            {/* قیمت کل آیتم */}
                                            <div className="text-lg font-extrabold text-green-700 w-24 text-center hidden sm:block">
                                                ${(item.price * item.qty).toLocaleString()}
                                            </div>
                                        </div>
                                    </div>

                                    {/* دکمه حذف */}
                                    <button
                                        onClick={() => dispatch(removeitem(item.id))}
                                        className="text-red-500 hover:text-red-700 transition-colors ml-4 p-2 rounded-full hover:bg-red-50"
                                        title="حذف از سبد"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>
                                </div>
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
