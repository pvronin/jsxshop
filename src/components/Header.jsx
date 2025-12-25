import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useLocation } from "react-router-dom";
import { FaUserCircle, FaShoppingCart, FaHome, FaStore, FaCircle, FaSearch } from 'react-icons/fa';
import { useEffect, useState, useRef } from "react"; // اضافه شدن useRef
import { fetchCategories } from "../store/slices/CategorySlice";

export default function Header() {
    const dispatch = useDispatch();
    const categories = useSelector((state) => state.category.categories);
    const [showWelcome, setShowWelcome] = useState(true);

    // --- استیت‌های مربوط به جستجو ---
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const searchRef = useRef(null);

    // ۱. استفاده از Ref برای جلوگیری از رندرهای بی مورد
    const lastScrollY = useRef(0);

    // بستن نتایج جستجو وقتی کاربر جای دیگری کلیک می‌کند
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setSearchResults([]);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // لاجیک سرچ از API DummyJSON
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
        }, 500); // ۵۰۰ میلی‌ثانیه صبر می‌کند بعد از آخرین تایپ

        return () => clearTimeout(delayDebounceFn);
    }, [searchTerm]);

    useEffect(() => {
        if (categories.length === 0) {
            dispatch(fetchCategories());
        }

        const controlNavbar = () => {
            const currentScrollY = window.scrollY;

            // ۲. منطق حساس‌تر: اگر اسکرول بیشتر از ۵ پیکسل تغییر کرد
            if (Math.abs(currentScrollY - lastScrollY.current) > 1) {
                if (currentScrollY > lastScrollY.current && currentScrollY > 2) {
                    setShowWelcome(false);
                } else {
                    setShowWelcome(true);
                }
                lastScrollY.current = currentScrollY;
            }
        };

        window.addEventListener('scroll', controlNavbar);
        return () => window.removeEventListener('scroll', controlNavbar);
    }, [dispatch, categories.length]); // lastScrollY حذف شد چون Ref است

    const location = useLocation();
    const cart = useSelector((state) => state.cart.cart);
    const { user, isAuthenticated } = useSelector((state) => state.user);
    const totalQuantity = cart.reduce((total, item) => total + item.qty, 0);

    return (
        // ۳. فقط هدر اصلی چسبنده باشد
        <header className="sticky top-0 z-50 shadow-xl">

            {/* 👋 نوار سلام کاربر */}
            {isAuthenticated && user && (
                <div className={`bg-blue-500 text-white text-xs md:text-sm px-4 text-center overflow-hidden transition-all duration-300 ease-in-out ${showWelcome ? "max-h-12 py-2 opacity-100" : "max-h-0 py-0 opacity-0"
                    }`}>
                    👋 سلام {user.firstName} {user.lastName}!
                </div>
            )}

            {/* 🔧 بخش اصلی هدر - دیگر نیازی به sticky داخلی ندارد */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700">
                <nav className="border-b border-blue-500">
                    <div className="container mx-auto px-4">
                        <div className="flex justify-between items-center h-16 gap-2">

                            {/* Logo + Menu */}
                            <div className="flex items-center space-x-4 md:space-x-8">
                                <NavLink to="/" className="flex items-center gap-2 md:gap-3 text-white text-xl md:text-2xl font-bold hover:text-blue-100 transition-colors group">
                                    <div className="bg-white/20 p-1.5 md:p-2 rounded-xl group-hover:bg-white/30">
                                        <FaStore className="text-white text-lg md:text-xl" />
                                    </div>
                                    <span className="hidden md:inline text-sm md:text-base lg:text-lg bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                                        فروشگاه آنلاین
                                    </span>
                                </NavLink>

                                {/* منوی خانه و فروشگاه */}
                                <div className="flex items-center space-x-2 md:space-x-4">
                                    <NavLink to="/" className={({ isActive }) => `flex items-center gap-1 md:gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-xl text-xs md:text-sm font-medium transition-all ${isActive ? 'bg-white text-blue-600 shadow-lg' : 'text-blue-100 hover:bg-white/20'}`}>
                                        <FaHome className="text-base md:text-lg" />
                                        <span className="hidden xs:inline">خانه</span>
                                    </NavLink>

                                    <div className="relative group">
                                        <NavLink to="/shop" className={({ isActive }) => `flex items-center gap-1 md:gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-xl text-xs md:text-sm font-medium transition-all ${isActive ? 'bg-white text-blue-600 shadow-lg' : 'text-blue-100 hover:bg-white/20'}`}>
                                            <FaStore className="text-base md:text-lg" />
                                            <span className="hidden xs:inline">فروشگاه</span>
                                        </NavLink>

                                        {/* مگا منو */}
                                        <div className="absolute top-full right-0 mt-0.5 w-max min-w-[300px] bg-white shadow-2xl rounded-xl p-4 md:p-6 opacity-0 scale-95 pointer-events-none group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto transition-all duration-400 grid grid-cols-2 md:grid-cols-3 gap-3 z-50">
                                            {categories?.map((cat, index) => (
                                                <Link key={index} to={`/shop/${cat}`} className="flex items-center gap-2 text-blue-700 text-xs md:text-sm hover:underline">
                                                    <FaCircle className="text-[4px] text-blue-500" />
                                                    {cat}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* بخش دوم: سرچ بار هوشمند (بخش جدید) */}
                            <div className="flex-1 max-w-md relative" ref={searchRef}>
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="جستجوی محصول..."
                                        className="w-full bg-white/10 border border-blue-400/30 text-white placeholder-blue-200 text-[10px] md:text-sm rounded-xl py-2 px-10 focus:bg-white focus:text-blue-900 focus:outline-none transition-all"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                    <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-200" />
                                    {isSearching && <div className="absolute right-3 top-1/2 -translate-y-1/2 animate-spin h-4 w-4 border-2 border-blue-500 border-t-transparent rounded-full"></div>}
                                </div>

                                {/* نتایج زنده جستجو */}
                                {searchResults.length > 0 && (
                                    <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border overflow-hidden z-[60]">
                                        {searchResults.map(product => (
                                            <Link
                                                key={product.id}
                                                to={`/product/${product.id}`}
                                                onClick={() => { setSearchTerm(""); setSearchResults([]); }}
                                                className="flex items-center gap-3 p-3 hover:bg-blue-50 border-b last:border-0 transition-colors"
                                            >
                                                <img src={product.thumbnail} alt={product.title} className="w-10 h-10 object-cover rounded" />
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-medium text-gray-800 line-clamp-1">{product.title}</span>
                                                    <span className="text-xs text-blue-600 font-bold">${product.price}</span>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Cart + Profile */}
                            <div className="flex items-center space-x-2 md:space-x-4">
                                <NavLink to="/cart" className={({ isActive }) => `flex items-center gap-1 md:gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-xl text-xs md:text-sm font-medium relative transition-all ${isActive ? 'bg-white text-blue-600' : 'text-blue-100 hover:bg-white/20'}`}>
                                    <FaShoppingCart className="text-base md:text-lg" />
                                    <span className="hidden xs:inline">سبد خرید</span>
                                    {totalQuantity > 0 && (
                                        <span className="absolute -top-1 -right-1 bg-white text-blue-600 rounded-full w-4 h-4 flex items-center justify-center text-[10px] font-bold shadow animate-pulse">
                                            {totalQuantity}
                                        </span>
                                    )}
                                </NavLink>

                                <NavLink to={isAuthenticated ? "/profile" : "/login_register"} className="group relative">
                                    <div className={`p-1.5 md:p-2 rounded-xl transition-all ${location.pathname.includes('profile') ? 'bg-white text-blue-600' : 'bg-white/10 text-white hover:bg-white hover:text-blue-600'}`}>
                                        <FaUserCircle className="text-xl md:text-2xl" />
                                    </div>
                                    {isAuthenticated && <span className="absolute -top-0.5 -right-0.5 bg-green-500 border-2 border-blue-700 rounded-full w-3 h-3"></span>}
                                </NavLink>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        </header>
    );
}
