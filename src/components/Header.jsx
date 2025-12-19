import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useLocation } from "react-router-dom";
import { FaUserCircle, FaShoppingCart, FaHome, FaStore, FaCircle } from 'react-icons/fa';
import { useEffect, useState } from "react";
import { fetchCategories } from "../store/slices/CategorySlice";

export default function Header() {
    const dispatch = useDispatch();
    const categories = useSelector((state) => state.category.categories);
    const [showWelcome, setShowWelcome] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        if (categories.length === 0) {
            dispatch(fetchCategories());
        }
        const controlNavbar = () => {
            if (window.scrollY > lastScrollY && window.scrollY > 50) {
                // اگر به پایین اسکرول کرد
                setShowWelcome(false);
            } else {
                // اگر به بالا اسکرول کرد
                setShowWelcome(true);
            }
            setLastScrollY(window.scrollY);
        };

        window.addEventListener('scroll', controlNavbar);

        // پاکسازی ایونت برای جلوگیری از نشت حافظه
        return () => {
            window.removeEventListener('scroll', controlNavbar);
        };
    }, [dispatch, categories.length, lastScrollY]);
    const location = useLocation();
    const cart = useSelector((state) => state.cart.cart);
    const { user, isAuthenticated } = useSelector((state) => state.user);

    const totalQuantity = cart.reduce((total, item) => total + item.qty, 0);

    return (
        <header className="bg-gradient-to-r from-blue-600 to-blue-700 shadow-xl sticky top-0 z-50">

            {/* 👤 نوار سلام کاربر - هنگام اسکرول ناپدید می‌شود */}
            {isAuthenticated && user && (
                <div className={`bg-blue-500 text-white text-xs md:text-sm px-4 text-center overflow-hidden transition-all duration-500 ease-in-out ${showWelcome ? "max-h-10 py-1 opacity-100" : "max-h-0 py-0 opacity-0"
                    }`}>
                    👋 سلام {user.firstName} {user.lastName}!
                </div>
            )}

            {/* 🔧 بخش اصلی هدر - هنگام اسکرول ثابت می‌ماند */}
            <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-blue-700 shadow-lg">
                <nav className="border-b border-blue-500">
                    <div className="container mx-auto px-4">
                        <div className="flex justify-between items-center h-16">

                            {/* Logo + Menu */}
                            <div className="flex items-center space-x-4 md:space-x-8">

                                {/* لوگو */}
                                <NavLink
                                    to="/"
                                    className="flex items-center gap-2 md:gap-3 text-white text-xl md:text-2xl font-bold hover:text-blue-100 transition-colors group"
                                >
                                    <div className="bg-white/20 p-1.5 md:p-2 rounded-xl group-hover:bg-white/30">
                                        <FaStore className="text-white text-lg md:text-xl" />
                                    </div>
                                    <span className="hidden md:inline text-sm md:text-base lg:text-lg bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                                        فروشگاه آنلاین
                                    </span>
                                </NavLink>

                                {/* منو */}
                                <div className="flex items-center space-x-2 md:space-x-4">

                                    {/* خانه */}
                                    <NavLink
                                        to="/"
                                        className={`flex items-center gap-1 md:gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-xl text-xs md:text-sm font-medium transition-all duration-300 ${location.pathname === '/'
                                            ? 'bg-white text-blue-600 shadow-lg'
                                            : 'text-blue-100 hover:bg-white/20 hover:text-white'
                                            }`}
                                    >
                                        <FaHome className="text-base md:text-lg" />
                                        <span className="hidden xs:inline">خانه</span>
                                    </NavLink>

                                    <div className="relative group">
                                        {/* دکمه فروشگاه */}
                                        <NavLink
                                            to="/shop"
                                            className={`flex items-center gap-1 md:gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-xl text-xs md:text-sm font-medium cursor-pointer transition-all ${location.pathname.startsWith("/shop")
                                                ? "bg-white text-blue-600 shadow-lg"
                                                : "text-blue-100 hover:bg-white/20 hover:text-white"
                                                }`}
                                        >
                                            <FaStore className="text-base md:text-lg" />
                                            <span className="hidden xs:inline">فروشگاه</span>
                                        </NavLink>

                                        {/* مگا منو با انیمیشن */}
                                        <div className="absolute top-7 md:right-0 mt-2 w-max min-w-[300px] bg-white shadow-2xl rounded-xl p-4 md:p-6
                                            opacity-0 scale-95 pointer-events-none
                                            group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto
                                            transition-all duration-300 ease-out grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5 z-50">
                                            {categories?.length > 0 ? (
                                                categories.map((cat, index) => (
                                                    <div key={index}>
                                                        <Link
                                                            to={`/shop/${cat}`}
                                                            className="flex items-center gap-2 text-blue-700 text-xs md:text-sm hover:underline hover:text-blue-900 transition-colors"
                                                        >
                                                            <FaCircle className="text-[4px] md:text-[6px] text-blue-500 flex-shrink-0" />
                                                            {cat}
                                                        </Link>
                                                    </div>
                                                ))
                                            ) : (
                                                <p className="text-gray-400 col-span-2 md:col-span-3 text-center text-xs md:text-sm">در حال بارگذاری...</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* 🔧 Cart + Profile */}
                            <div className="flex items-center space-x-2 md:space-x-4">

                                {/* --- سبد خرید --- */}
                                <NavLink
                                    to="/cart"
                                    className={`flex items-center gap-1 md:gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-xl text-xs md:text-sm font-medium transition-all relative ${location.pathname === '/cart'
                                        ? 'bg-white text-blue-600 shadow-lg'
                                        : 'text-blue-100 hover:bg-white/20 hover:text-white'
                                        }`}
                                >
                                    <FaShoppingCart className="text-base md:text-lg" />
                                    <span className="hidden xs:inline">سبد خرید</span>

                                    {totalQuantity > 0 && (
                                        <span className="absolute -top-1 -right-1 bg-white text-blue-600 rounded-full w-4 h-4 md:w-5 md:h-5 flex items-center justify-center text-[10px] md:text-xs font-bold shadow animate-pulse">
                                            {totalQuantity}
                                        </span>
                                    )}
                                </NavLink>

                                {/* --- پروفایل --- */}
                                <NavLink
                                    to={isAuthenticated ? "/profile" : "/login_register"}
                                    className="group relative"
                                >
                                    <div className={`p-1.5 md:p-2 rounded-xl transition-all ${location.pathname === '/login_register' || location.pathname === '/profile'
                                        ? 'bg-white text-blue-600 shadow-lg'
                                        : 'bg-white/10 text-white hover:bg-white hover:text-blue-600'
                                        }`}>
                                        <FaUserCircle className="text-xl md:text-2xl" />
                                    </div>

                                    <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] md:text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                        {isAuthenticated ? "پروفایل من" : "ورود / ثبت نام"}
                                    </div>

                                    {isAuthenticated && (
                                        <span className="absolute -top-0.5 -right-0.5 md:-top-1 md:-right-1 bg-green-500 border-2 border-blue-700 rounded-full w-2 h-2 md:w-3 md:h-3"></span>
                                    )}
                                </NavLink>

                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        </header>
    );
}
