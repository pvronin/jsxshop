// components/shop/ShopHeader.jsx
export default function ShopHeader({ totalProducts, shownCount, sortBy, updateSort, currentPage, totalPages }) {
    return (
        <div className="bg-white rounded-2xl shadow-md border p-4 mb-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <span className="text-lg font-bold text-gray-700">
                        نمایش <span className='text-emerald-600'>{shownCount}</span> از <span className='text-emerald-600'>{totalProducts}</span> محصول
                    </span>
                    {totalPages > 1 && (
                        <span className="text-sm text-gray-500 mr-4">
                            (صفحه {currentPage} از {totalPages})
                        </span>
                    )}
                </div>
                <div className="flex items-center gap-3">
                    <span className="text-md font-semibold text-gray-600">مرتب‌سازی:</span>
                    <select
                        value={sortBy}
                        onChange={(e) => updateSort(e.target.value)}
                        className="border border-gray-300 p-2 rounded-xl bg-gray-50 focus:ring-emerald-500 focus:border-emerald-500 cursor-pointer"
                    >
                        <option value="">پیش‌فرض</option>
                        <option value="price-asc">ارزان‌ترین (صعودی)</option>
                        <option value="price-desc">گران‌ترین (نزولی)</option>
                        <option value="rating-desc">محبوب‌ترین (امتیاز بالا)</option>
                    </select>
                </div>
            </div>
        </div>
    );
}
