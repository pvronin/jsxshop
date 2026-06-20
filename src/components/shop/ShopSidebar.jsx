// components/shop/ShopSidebar.jsx
import { FaStar, FaStarHalfAlt, FaRegStar, FaCheck } from "react-icons/fa";
import { MdFilterAlt, MdClear, MdPriceCheck, MdInventory } from "react-icons/md";
import { motion } from "framer-motion";

export default function ShopSidebar({ filters, updateFilter, clearFilters, topSpace = 20 }) {
    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className={`bg-white rounded-3xl shadow-2xl border border-gray-100/80 p-6 md:p-8 sticky top-${topSpace} backdrop-blur-sm`}
        >
            {/* هدر */}
            <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-100">
                <div className="flex items-center gap-2.5">
                    <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-2 rounded-xl shadow-lg shadow-blue-500/20">
                        <MdFilterAlt className="text-white text-lg" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-800">فیلترها</h2>
                    <span className="bg-gray-100 text-gray-500 text-xs font-bold px-2.5 py-1 rounded-full">
                        {Object.values(filters).filter(v => v !== "" && v !== 0 && v !== "all").length}
                    </span>
                </div>
                <button
                    onClick={clearFilters}
                    className="flex items-center gap-1.5 text-xs font-semibold text-gray-400 hover:text-red-500 transition-all duration-200 hover:bg-red-50 px-3 py-1.5 rounded-lg"
                >
                    <MdClear className="text-sm" />
                    پاک کردن همه
                </button>
            </div>

            {/* محدوده قیمت */}
            <div className="mb-8">
                <div className="flex items-center gap-2.5 mb-4">
                    <div className="bg-emerald-100 p-1.5 rounded-lg">
                        <MdPriceCheck className="text-emerald-600 text-lg" />
                    </div>
                    <label className="text-sm font-bold text-gray-700">محدوده قیمت</label>
                </div>
                <div className="grid grid-cols-2 gap-3">
                    <div className="relative">
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs font-bold">$</span>
                        <input
                            min="0"
                            type="number"
                            placeholder="حداقل"
                            value={filters.minPrice || ""}
                            onChange={(e) => updateFilter("minPrice", e.target.value)}
                            className="w-full border border-gray-200 bg-gray-50/50 p-3 pr-7 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all outline-none text-sm placeholder:text-gray-400"
                        />
                    </div>
                    <div className="relative">
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs font-bold">$</span>
                        <input
                            min="0"
                            type="number"
                            placeholder="حداکثر"
                            value={filters.maxPrice || ""}
                            onChange={(e) => updateFilter("maxPrice", e.target.value)}
                            className="w-full border border-gray-200 bg-gray-50/50 p-3 pr-7 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all outline-none text-sm placeholder:text-gray-400"
                        />
                    </div>
                </div>
            </div>

            {/* امتیاز */}
            <div className="mb-8">
                <div className="flex items-center gap-2.5 mb-4">
                    <div className="bg-amber-100 p-1.5 rounded-lg">
                        <FaStar className="text-amber-500 text-lg" />
                    </div>
                    <label className="text-sm font-bold text-gray-700">حداقل امتیاز</label>
                </div>
                <div className="space-y-1.5">
                    {[4, 3, 2, 1].map((r) => (
                        <label
                            key={r}
                            className={`flex items-center gap-3 px-3 py-2 rounded-xl cursor-pointer transition-all duration-200 ${filters.rating === r
                                    ? 'bg-amber-50 border border-amber-200 shadow-sm'
                                    : 'hover:bg-gray-50 border border-transparent'
                                }`}
                        >
                            <input
                                type="radio"
                                name="rating"
                                value={r}
                                checked={filters.rating === r}
                                onChange={() => updateFilter("rating", r)}
                                className="form-radio text-amber-500 focus:ring-amber-400 w-4 h-4"
                            />
                            <div className="flex items-center gap-1.5">
                                {[...Array(4)].map((_, i) => (
                                    <FaStar
                                        key={i}
                                        className={`${i < r ? 'text-amber-400' : 'text-gray-200'} text-sm`}
                                    />
                                ))}
                                <span className="text-sm font-medium text-gray-700 mr-1">{r}+</span>
                            </div>
                        </label>
                    ))}
                    <label
                        className={`flex items-center gap-3 px-3 py-2 rounded-xl cursor-pointer transition-all duration-200 ${filters.rating === 0
                                ? 'bg-gray-100 border border-gray-200 shadow-sm'
                                : 'hover:bg-gray-50 border border-transparent'
                            }`}
                    >
                        <input
                            type="radio"
                            name="rating"
                            value={0}
                            checked={filters.rating === 0}
                            onChange={() => updateFilter("rating", 0)}
                            className="form-radio text-gray-500 focus:ring-gray-400 w-4 h-4"
                        />
                        <span className="text-sm font-medium text-gray-500">همه</span>
                    </label>
                </div>
            </div>

            {/* وضعیت موجودی */}
            <div>
                <div className="flex items-center gap-2.5 mb-4">
                    <div className="bg-blue-100 p-1.5 rounded-lg">
                        <MdInventory className="text-blue-600 text-lg" />
                    </div>
                    <label className="text-sm font-bold text-gray-700">وضعیت موجودی</label>
                </div>

                {/* سوییچ */}
                <div className="flex items-center justify-between bg-gray-50 p-2 rounded-2xl border border-gray-200">
                    <div className="flex items-center gap-3">
                        <span className={`text-sm font-medium transition-colors duration-300 flex items-center gap-2 ${filters.stock === 'inStock' ? 'text-emerald-600' : 'text-gray-400'}`}>
                            <FaCheck color="white" className="bg-green-600 rounded-lg p-1 w-6 h-6" />فقط موجود
                        </span>
                    </div>

                    {/* سوییچ */}
                    <button
                        onClick={() => {
                            const newValue = filters.stock === 'inStock' ? 'all' : 'inStock';
                            updateFilter('stock', newValue);
                        }}
                        className={`relative w-14 h-8 rounded-full transition-all duration-300 shadow-inner ${filters.stock === 'inStock' ? 'bg-emerald-500' : 'bg-gray-300'
                            }`}
                    >
                        {/* دکمه گرد */}
                        <div
                            className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-md transition-all duration-300 ${filters.stock === 'inStock' ? 'left-1' : 'left-7'
                                }`}
                        />
                    </button>
                </div>
            </div>

            {/* دکمه اعمال فیلتر */}
            <button
                onClick={() => { }}
                className="w-full mt-8 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-3.5 rounded-2xl transition-all duration-300 shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/30 text-sm"
            >
                اعمال فیلترها
            </button>
        </motion.div>
    );
}
