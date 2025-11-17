import { useSelector } from "react-redux";
import { Link, NavLink, useLocation } from "react-router-dom";
import { FaUserCircle, FaShoppingCart, FaHome, FaStore } from 'react-icons/fa';

export default function Header() {
    const location = useLocation();
    const cart = useSelector((state) => state.cart.cart);
    const { user, isAuthenticated } = useSelector((state) => state.user); // ✅ درست شده

    const totalQuantity = cart.reduce((total, item) => total + item.qty, 0);

    return (
        <header className="bg-gradient-to-r from-blue-600 to-blue-700 shadow-xl sticky top-0 z-50">
            {/* نمایش نام کاربر - فقط وقتی لاگین کرده */}
            {isAuthenticated && user && (
                <div className="bg-blue-500 text-white text-sm py-1 px-4 text-center">
                    👋 سلام {user.firstName} {user.lastName}!
                </div>
            )}

            <nav className="border-b border-blue-500">
                <div className="container mx-auto px-4">
                    <div className="flex justify-between items-center h-16">
                        {/* سمت راست - لوگو و منو */}
                        <div className="flex items-center space-x-8">
                            {/* لوگو */}
                            <NavLink
                                to="/"
                                className="flex items-center gap-3 text-white text-2xl font-bold hover:text-blue-100 transition-colors group"
                            >
                                <div className="bg-white/20 p-2 rounded-xl group-hover:bg-white/30 transition-colors">
                                    <FaStore className="text-white text-xl" />
                                </div>
                                <span className="bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                                    فروشگاه آنلاین
                                </span>
                            </NavLink>

                            {/* منوی اصلی */}
                            <div className="flex items-center space-x-4">
                                <NavLink
                                    to="/"
                                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${location.pathname === '/'
                                            ? 'bg-white text-blue-600 shadow-lg'
                                            : 'text-blue-100 hover:bg-white/20 hover:text-white hover:shadow-md'
                                        }`}
                                >
                                    <FaHome className="text-lg" />
                                    خانه
                                </NavLink>

                                <NavLink
                                    to="/shop"
                                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${location.pathname === '/shop'
                                            ? 'bg-white text-blue-600 shadow-lg'
                                            : 'text-blue-100 hover:bg-white/20 hover:text-white hover:shadow-md'
                                        }`}
                                >
                                    <FaStore className="text-lg" />
                                    فروشگاه
                                </NavLink>
                            </div>
                        </div>

                        {/* سمت چپ - آیکون‌های کاربر */}
                        <div className="flex items-center space-x-4">
                            {/* سبد خرید */}
                            <NavLink
                                to="/cart"
                                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 relative group ${location.pathname === '/cart'
                                        ? 'bg-white text-blue-600 shadow-lg'
                                        : 'text-blue-100 hover:bg-white/20 hover:text-white hover:shadow-md'
                                    }`}
                            >
                                <FaShoppingCart className="text-lg group-hover:scale-110 transition-transform" />
                                سبد خرید
                                {totalQuantity > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-white text-blue-600 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold shadow-lg animate-pulse">
                                        {totalQuantity}
                                    </span>
                                )}
                            </NavLink>

                            {/* پروفایل کاربر */}
                            <NavLink
                                to={isAuthenticated ? "/profile" : "/login_register"} // ✅ اگر لاگین کرده به پروفایل، اگر نه به لاگین
                                className="group relative"
                            >
                                <div className={`
                                    p-2 rounded-xl transition-all duration-300
                                    ${location.pathname === '/login_register' || location.pathname === '/profile'
                                        ? 'bg-white text-blue-600 shadow-lg'
                                        : 'bg-white/10 text-white hover:bg-white hover:text-blue-600 hover:shadow-lg'
                                    }
                                `}>
                                    <FaUserCircle className="text-2xl group-hover:scale-110 transition-transform" />
                                </div>
                                {/* Tooltip */}
                                <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                                    {isAuthenticated ? "پروفایل من" : "ورود / ثبت نام"}
                                </div>

                                {/* نشانگر لاگین بودن */}
                                {isAuthenticated && (
                                    <span className="absolute -top-1 -right-1 bg-green-500 border-2 border-blue-600 rounded-full w-3 h-3"></span>
                                )}
                            </NavLink>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
}
