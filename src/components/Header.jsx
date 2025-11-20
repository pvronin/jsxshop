import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useLocation } from "react-router-dom";
import { FaUserCircle, FaShoppingCart, FaHome, FaStore } from 'react-icons/fa';
import { useEffect } from "react";
import { fetchCategories } from "../store/slices/CategorySlice";

export default function Header() {

    const dispatch = useDispatch();
    const categories = useSelector((state) => state.category.categories);
    console.log(categories);
    useEffect(() => {
        if (categories.length === 0) {
            dispatch(fetchCategories());
        }
    }, [dispatch, categories.length]);
    const location = useLocation();
    const cart = useSelector((state) => state.cart.cart);
    const { user, isAuthenticated } = useSelector((state) => state.user);

    // اگر دسته بندی ها در Redux هستند:


    const totalQuantity = cart.reduce((total, item) => total + item.qty, 0);

    return (
        <header className="bg-gradient-to-r from-blue-600 to-blue-700 shadow-xl sticky top-0 z-50">

            {/* 👤 نوار سلام کاربر */}
            {isAuthenticated && user && (
                <div className="bg-blue-500 text-white text-sm py-1 px-4 text-center">
                    👋 سلام {user.firstName} {user.lastName}!
                </div>
            )}

            <nav className="border-b border-blue-500">
                <div className="container mx-auto px-4">
                    <div className="flex justify-between items-center h-16">

                        {/* Logo + Menu */}
                        <div className="flex items-center space-x-8">

                            {/* لوگو */}
                            <NavLink
                                to="/"
                                className="flex items-center gap-3 text-white text-2xl font-bold hover:text-blue-100 transition-colors group"
                            >
                                <div className="bg-white/20 p-2 rounded-xl group-hover:bg-white/30">
                                    <FaStore className="text-white text-xl" />
                                </div>
                                <span className="bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                                    فروشگاه آنلاین
                                </span>
                            </NavLink>

                            {/* منو */}
                            <div className="flex items-center space-x-4">

                                {/* خانه */}
                                <NavLink
                                    to="/"
                                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${location.pathname === '/'
                                        ? 'bg-white text-blue-600 shadow-lg'
                                        : 'text-blue-100 hover:bg-white/20 hover:text-white'
                                        }`}
                                >
                                    <FaHome className="text-lg" />
                                    خانه
                                </NavLink>

                                <div className="relative group">
                                    {/* دکمه فروشگاه */}
                                    <NavLink
                                        to="/shop"
                                        className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium cursor-pointer transition-all ${location.pathname.startsWith("/shop")
                                            ? "bg-white text-blue-600 shadow-lg"
                                            : "text-blue-100 hover:bg-white/20 hover:text-white"
                                            }`}
                                    >
                                        <FaStore className="text-lg" />
                                        فروشگاه
                                    </NavLink>

                                    {/* مگا منو با انیمیشن */}
                                    <div className="absolute top-7 right-0 mt-2 w-max min-w-[300px] bg-white shadow-2xl rounded-xl p-6
                    opacity-0 scale-95 pointer-events-none
                    group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto
                    transition-all duration-300 ease-out grid grid-cols-3 gap-6 z-50">
                                        {categories?.length > 0 ? (
                                            categories.map((cat, index) => (
                                                <div key={index} className="flex flex-col">
                                                    <Link
                                                        to={`/shop/${cat}`}
                                                        className="text-blue-700 font-bold text-sm hover:underline"
                                                    >
                                                        {cat}
                                                    </Link>
                                                </div>
                                            ))
                                        ) : (
                                            <p className="text-gray-400 col-span-2">در حال بارگذاری...</p>
                                        )}
                                    </div>
                                </div>


                            </div>
                        </div>

                        {/* 🔧 Cart + Profile */}
                        <div className="flex items-center space-x-4">

                            {/* --- سبد خرید --- */}
                            <NavLink
                                to="/cart"
                                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all relative ${location.pathname === '/cart'
                                    ? 'bg-white text-blue-600 shadow-lg'
                                    : 'text-blue-100 hover:bg-white/20 hover:text-white'
                                    }`}
                            >
                                <FaShoppingCart className="text-lg" />
                                سبد خرید

                                {totalQuantity > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-white text-blue-600 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold shadow animate-pulse">
                                        {totalQuantity}
                                    </span>
                                )}
                            </NavLink>

                            {/* --- پروفایل --- */}
                            <NavLink
                                to={isAuthenticated ? "/profile" : "/login_register"}
                                className="group relative"
                            >
                                <div className={`p-2 rounded-xl transition-all ${location.pathname === '/login_register' || location.pathname === '/profile'
                                    ? 'bg-white text-blue-600 shadow-lg'
                                    : 'bg-white/10 text-white hover:bg-white hover:text-blue-600'
                                    }`}>
                                    <FaUserCircle className="text-2xl" />
                                </div>

                                <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                    {isAuthenticated ? "پروفایل من" : "ورود / ثبت نام"}
                                </div>

                                {isAuthenticated && (
                                    <span className="absolute -top-1 -right-1 bg-green-500 border-2 border-blue-700 rounded-full w-3 h-3"></span>
                                )}
                            </NavLink>

                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
}
