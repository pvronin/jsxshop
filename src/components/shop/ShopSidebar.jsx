// components/shop/ShopSidebar.jsx
export default function ShopSidebar({ filters, updateFilter, clearFilters }) {
    return (
        <div className="bg-white rounded-3xl shadow-xl border border-gray-200 p-8 sticky top-30">
            <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-gray-800">تصفیه نتایج</h2>
                <button onClick={clearFilters} className="text-sm font-semibold text-red-500 hover:text-red-700 transition duration-150">
                    پاک کردن همه 🗑️
                </button>
            </div>

            {/* محدوده قیمت */}
            <div className="mb-8">
                <label className="block text-base font-bold text-gray-700 mb-3">💰 محدوده قیمت</label>
                <div className="grid grid-cols-2 gap-4">
                    <input min="0" type="number" placeholder="حداقل" value={filters.minPrice || ""} onChange={(e) => updateFilter("minPrice", e.target.value)} className="border border-gray-300 p-3 rounded-xl focus:ring-emerald-500 focus:border-emerald-500" />
                    <input min="0" type="number" placeholder="حداکثر" value={filters.maxPrice || ""} onChange={(e) => updateFilter("maxPrice", e.target.value)} className="border border-gray-300 p-3 rounded-xl focus:ring-emerald-500 focus:border-emerald-500" />
                </div>
            </div>

            {/* امتیاز */}
            <div className="mb-8">
                <label className="block text-base font-bold text-gray-700 mb-3">⭐ حداقل امتیاز</label>
                <div className='space-y-2'>
                    {[4, 3, 2, 1].map((r) => (
                        <label key={r} className="flex items-center gap-2 text-gray-600 cursor-pointer hover:text-gray-900 transition duration-150">
                            <input type="radio" name="rating" value={r} checked={filters.rating === r} onChange={() => updateFilter("rating", r)} className="form-radio text-emerald-600 focus:ring-emerald-500" />
                            <span>{r}+ ستاره</span>
                        </label>
                    ))}
                    <label className="flex items-center gap-2 text-gray-600 cursor-pointer hover:text-gray-900 transition duration-150">
                        <input type="radio" name="rating" value={0} checked={filters.rating === 0} onChange={() => updateFilter("rating", 0)} className="form-radio text-emerald-600 focus:ring-emerald-500" />
                        <span>همه</span>
                    </label>
                </div>
            </div>

            {/* وضعیت موجودی */}
            <div>
                <label className="block text-base font-bold text-gray-700 mb-3">📦 وضعیت موجودی</label>
                <div className="space-y-2">
                    {[{ val: "inStock", label: "موجود" }, { val: "outOfStock", label: "ناموجود" }, { val: "all", label: "همه" }].map((opt) => (
                        <label key={opt.val} className="flex items-center gap-2 text-gray-600 cursor-pointer hover:text-gray-900 transition duration-150">
                            <input type="radio" name="stock" value={opt.val} checked={filters.stock === opt.val} onChange={(e) => updateFilter("stock", opt.val)} className="form-radio text-emerald-600 focus:ring-emerald-500" />
                            <span>{opt.label}</span>
                        </label>
                    ))}
                </div>
            </div>
        </div>
    );
}
