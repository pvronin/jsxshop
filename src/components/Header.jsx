import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useLocation } from "react-router-dom";
import { FaUserCircle, FaShoppingCart, FaHome, FaStore, FaCircle, FaSearch } from 'react-icons/fa';
import { useEffect, useState, useRef } from "react";
import { fetchCategories } from "../store/slices/CategorySlice";

export default function Header() {
    const dispatch = useDispatch();
    const categories = useSelector((state) => state.category.categories);
    const [showWelcome, setShowWelcome] = useState(true);
    const [showMegamenu, setShowMegamenu] = useState(false); // استیت برای کلیک موبایل

    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const searchRef = useRef(null);
    const lastScrollY = useRef(0);

    // بستن نتایج با کلیک بیرون
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setSearchResults([]);
                setShowMegamenu(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // لاجیک جستجو
    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (searchTerm.length > 2) {
                setIsSearching(true);
                fetch(`https://dummyjson.com/products/search?q=${searchTerm}&limit=5`)
                    .then(res => res.json())
                    .then(data => {
                        setSearchResults(data.products);
                        setIsSearching(false);
                    });
            } else {
                setSearchResults([]);
            }
        }, 500);
        return () => clearTimeout(delayDebounceFn);
    }, [searchTerm]);

    useEffect(() => {
        if (categories.length === 0) dispatch(fetchCategories());
        const controlNavbar = () => {
            const currentScrollY = window.scrollY;
            if (Math.abs(currentScrollY - lastScrollY.current) > 1) {
                setShowWelcome(currentScrollY <= lastScrollY.current || currentScrollY <= 2);
                lastScrollY.current = currentScrollY;
            }
        };
        window.addEventListener('scroll', controlNavbar);
        return () => window.removeEventListener('scroll', controlNavbar);
    }, [dispatch, categories.length]);

    const location = useLocation();
    const cart = useSelector((state) => state.cart.cart);
    const { user, isAuthenticated } = useSelector((state) => state.user);
    const totalQuantity = cart.reduce((total, item) => total + item.qty, 0);

    return (
        <header className="sticky top-0 z-50 shadow-xl">
            {/* 👋 نوار سلام */}
            {isAuthenticated && user && (
                <div className={`bg-blue-500 text-white text-[10px] md:text-sm px-4 text-center overflow-hidden transition-all duration-300 ${showWelcome ? "max-h-12 py-1.5 md:py-2 opacity-100" : "max-h-0 py-0 opacity-0"
                    }`}>
                    👋 سلام {user.firstName} {user.lastName}!
                </div>
            )}

            <div className="bg-gradient-to-r from-blue-600 to-blue-700 border-b border-blue-500">
                <nav className="container mx-auto px-2 md:px-4">
                    <div className="flex justify-between items-center h-14 md:h-16 gap-2">

                        {/* Logo & Shop Nav */}
                        <div className="flex items-center gap-2 md:gap-5">
                            <NavLink to="/" className="flex items-center gap-2 text-white font-bold shrink-0">
                                <div className="bg-white/20 p-1.5 rounded-lg">
                                    <FaStore className="text-sm md:text-lg" />
                                </div>
                                <span className="hidden lg:inline-block text-sm">فروشگاه آنلاین</span>
                            </NavLink>

                            {/* منوی فروشگاه با کلیک و هاور */}
                            <div className="relative group ml-1 md:ml-2">
                                <button
                                    onClick={() => setShowMegamenu(!showMegamenu)}
                                    className={`flex items-center gap-1 px-2 py-1.5 rounded-lg text-[11px] md:text-sm font-medium transition-all ${location.pathname.includes('shop') ? 'bg-white text-blue-600' : 'text-blue-100 hover:bg-white/20'
                                        }`}
                                >
                                    <FaStore className="md:text-lg" />
                                    <span>فروشگاه</span>
                                </button>

                                {/* مگامنو اصلاح شده */}
                                <div className={`
                                    absolute top-full right-0 mt-1 w-48 md:w-100 bg-white shadow-2xl rounded-xl p-2 md:p-3 transition-all duration-300 grid grid-cols-2 md:grid-cols-3 gap-1 md:gap-2 z-50
                                    md:group-hover:opacity-100 md:group-hover:visible md:group-hover:translate-y-0
                                    ${showMegamenu ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2"}
                                `}>
                                    {categories?.map((cat, index) => (
                                        <Link
                                            key={index}
                                            to={`/shop/${cat}`}
                                            onClick={() => setShowMegamenu(false)}
                                            className="flex items-center gap-2 text-blue-700 text-[10px] md:text-xs hover:bg-blue-50 p-2 rounded-lg"
                                        >
                                            <FaCircle className="text-[4px] text-blue-400" />
                                            {cat}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* بخش جستجو - بهینه برای موبایل */}
                        <div className="flex-1 max-w-36 xs:max-w-none md:max-w-md relative mx-1" ref={searchRef}>
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="جستجو ..."
                                    className="w-full bg-white/10 border border-blue-400/20 text-white placeholder-blue-200 text-[10px] md:text-sm rounded-lg py-1.5 px-7 md:px-10 focus:bg-white focus:text-blue-900 focus:outline-none transition-all"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                                <FaSearch className="absolute left-2 md:left-3 top-1/2 -translate-y-1/2 text-blue-200 text-[10px] md:text-sm" />
                            </div>

                            {/* نتایج زنده */}
                            {searchResults.length > 0 && (
                                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-2xl border overflow-hidden z-[60] min-w-[220px]">
                                    {searchResults.map(product => (
                                        <Link
                                            key={product.id}
                                            to={`shop/products/${product.id}`}
                                            onClick={() => { setSearchTerm(""); setSearchResults([]); }}
                                            className="flex items-center gap-4 p-3 hover:bg-blue-50 border-b border-blue-100 last:border-0"
                                        >
                                            <img src={product.thumbnail} alt="" className="w-8 h-8 object-cover rounded" />
                                            <div className="flex flex-col gap-2">
                                                <span className="text-xs md:text-xs font-medium text-gray-800 line-clamp-1">{product.title}</span>
                                                <span className="text-[9px] md:text-xs text-blue-600 font-bold">${product.price}</span>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Cart & Profile */}
                        <div className="flex items-center gap-1 md:gap-3 shrink-0">
                            <NavLink to="/cart" className="relative p-2 text-blue-100 hover:bg-white/20 rounded-lg">
                                <FaShoppingCart className="text-lg md:text-xl" />
                                {totalQuantity > 0 && (
                                    <span className="absolute top-0 right-0 bg-red-500 text-white text-[8px] md:text-[10px] w-3.5 h-3.5 md:w-4 md:h-4 rounded-full flex items-center justify-center font-bold">
                                        {totalQuantity}
                                    </span>
                                )}
                            </NavLink>

                            <NavLink
                                to={isAuthenticated ? "/profile" : "/login_register"}
                                className="relative p-1.5 md:p-2 text-blue-100 hover:bg-white/20 rounded-lg"
                            >
                                <FaUserCircle className="text-xl md:text-2xl" />
                                {isAuthenticated && (
                                    <span className="absolute top-1 right-1 w-2 h-2 md:top-1.5 md:right-1.5 bg-green-500 border-2 border-blue-600 rounded-full"></span>
                                )}
                            </NavLink>
                        </div>
                    </div>
                </nav>
            </div>
        </header>
    );
}
