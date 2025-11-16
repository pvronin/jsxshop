import { Link, NavLink, useLocation } from "react-router-dom";


export default function Header() {
    const location = useLocation(); // این خط اضافه شد

    return (
        <header className="bg-amber-300 font-Vazir">
            <nav className="bg-blue-600 shadow-lg">
                <div className="container mx-auto px-4">
                    <div className="flex justify-between items-center h-16">
                        {/* لوگو */}
                        <NavLink
                            to="/"
                            className="text-white text-xl font-bold hover:text-blue-200 transition-colors"
                        >

                            فروشگاه آنلاین
                        </NavLink>

                        {/* منوی اصلی */}
                        <div className="flex space-x-8">
                            <NavLink
                                to="/"
                                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${location.pathname === '/'
                                    ? 'bg-blue-700 text-white'
                                    : 'text-blue-100 hover:bg-blue-500 hover:text-white'
                                    }`}
                            >

                                🏠 خانه
                            </NavLink>

                            <NavLink

                                to="/shop"
                                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${location.pathname === '/shop'
                                    ? 'bg-blue-700 text-white'
                                    : 'text-blue-100 hover:bg-blue-500 hover:text-white'
                                    }`}
                                    >
                                🛍️ فروشگاه

                            </NavLink>

                            <NavLink


to="/cart"
className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${location.pathname === '/cart'
                                    ? 'bg-blue-700 text-white'
                                    : 'text-blue-100 hover:bg-blue-500 hover:text-white'
                                    }`}
                                    >
                                🛒 سبد خرید
                            </NavLink>


                        </div>
                    </div>
                </div>
            </nav>
        </header >
    )
}
